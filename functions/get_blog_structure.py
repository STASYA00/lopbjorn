

import functions_framework
from http import HTTPStatus
from google.cloud import storage
from src.utils import env_vars, get_request_input, build_response
from src.bucket_manager import BucketManager


@functions_framework.http
def get_structure(request):
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
    status_code = HTTPStatus.OK

    try:

        manager = BucketManager()
        content = manager.get_structure().content

    except Exception as e:
        print(e)
        content = {}
        status_code = HTTPStatus.FAILED_DEPENDENCY

    return build_response(content, status_code)


