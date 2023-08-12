
import functions_framework
from google.cloud import storage

from utils import build_response, env_vars, get_request_input



@functions_framework.http
def article_exists(request):
    """HTTP Cloud Function. 

    This function gets the blog structure from the blog bucket.
    The result is returned as a dictionary: {"content": {"section": ["article1", "article2"]}}

    The bucket is specified as BUCKET_NAME in the runtime variables.
    Other environment variables:
    ARTICLE_PREFIX - prefix to the article folder and filename (without extension)
    DEFAULT - name of the default article that we get from storage
    KEY - key to parse the request

    From terminal: curl -m 70 -X POST https://get-uuklxqul3q-uc.a.run.app -H "Content-Type: application/json" -d 

    Cloud function requires following IAM roles:
    - Storage Object Viewer
    - Storage Legacy Object Reader
    - Storage Legacy Bucket Reader

    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args
    article_key = env_vars('ARTICLE_KEY')

    if request_json and article_key in request_json:
        article_name = str(request_json[article_key])
    elif request_args and article_key in request_args:
        article_name = str(request_args[article_key])
    else:
        article_name = env_vars('DEFAULT')

    article_name, status_code = get_request_input(request, key=env_vars('ARTICLE_KEY'), 
                                         default="")
    content = {}
    if article_name:
        try:
            storage_client = storage.Client()
            bucket = storage_client.bucket(env_vars('BUCKET_NAME'))
            blobs=bucket.list_blobs()
            
            current_section = ""
            for blob in blobs:  # list blobs in the bucket
                if (blob.name.index("/")==len(blob.name)-1):
                    current_section = blob.name[:-1]
                    pass
                else:
                    if (blob.name.startswith(current_section) and current_section!="" and blob.name[-1]=="/"):
                        if (blob.name[len(current_section)+1:-1].lower()==article_name.lower()):
                            
                            try:
                                
                                content["article"] = blob.name[len(current_section)+1:-1]
                                content["section"] = current_section
                                blob = bucket.blob("{}/{}/{}.md".format(current_section, 
                                                    article_name,
                                                    env_vars('ARTICLE_PREFIX') ))
                                content["text"] = blob.open("r").read()
                                content["meta"] = blob.metadata
                                content["updated"] = str(blob.updated)
                            except Exception as e:
                                print("FAIL", e)
                            break
            
        except Exception as e:
            content = "Fail {}".format(e)

    return build_response(content)


