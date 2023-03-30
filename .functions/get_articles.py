
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
    KEY - key to parse the request

    From terminal: curl -m 70 -X POST https://get-uuklxqul3q-uc.a.run.app -H "Content-Type: application/json" -d '{"name": "gcp_resources"}'

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
    key = env_vars('KEY')

    if request_json and key in request_json:
        article_name = str(request_json[key])
    elif request_args and key in request_args:
        article_name = str(request_args[key])
    else:
        article_name = env_vars('DEFAULT')

    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(env_vars('BUCKET_NAME'))
        
        # blobs=bucket.list_blobs()
        # print("SUM", sum(1 for _ in blobs))  # count blobs in the bucket
        # blobs=bucket.list_blobs(prefix="article_name", delimiter="/")
        # for blob in blobs:  # list blobs in the bucket
        #     print("BLOB", blob.name)

        blob = bucket.blob("{}_{}/{}.md".format(env_vars('ARTICLE_PREFIX'), 
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


