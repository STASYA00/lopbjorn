
from flask import make_response
import os

import functions_framework
from google.cloud import storage



def env_vars(var_name):
    return os.environ.get(var_name, 'Specified environment variable is not set.')

@functions_framework.http
def article(request):
    """HTTP Cloud Function. 

    This function gets an article asset from the blog bucket.
    The bucket is specified as BUCKET_NAME in the runtime variables.
    Other environment variables:
    ARTICLE_PREFIX - prefix to the article folder and filename (without extension)
    DEFAULT - name of the default article that we get from storage
    SECTION_KEY - name of the section
    ARTICLE_KEY - name of the article

    From terminal: curl -m 70 -X POST https://get-uuklxqul3q-uc.a.run.app -H "Content-Type: application/json" -d '{"section": "Tech", "name": "Simple_Website_with_Typescript"}'

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
    section_key = env_vars('SECTION_KEY')
    article_key = env_vars('ARTICLE_KEY')

    if request_json and section_key in request_json and article_key in request_json:
        section_name = str(request_json[section_key])
        article_name = str(request_json[article_key])
    elif request_args and section_key in request_args and article_key in request_args:
        section_name = str(request_args[section_key])
        article_name = str(request_args[article_key])
    else:
        section_name = env_vars('DEFAULT')
        article_name = env_vars('DEFAULT')

    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(env_vars('BUCKET_NAME'))

        blob = bucket.blob("{}/{}/{}.md".format(section_name, 
                                                article_name,
                                                 env_vars('ARTICLE_PREFIX') ))
        content = blob.open("r").read()
    
    except Exception as e:
        content = "Fail {}".format(e)

    response = make_response({"content": content}, 200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")

    return response


