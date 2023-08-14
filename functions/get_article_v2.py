

import functions_framework
from http import HTTPStatus

from functions.src.utils import build_response, get_env, get_request_input
from functions.src.bucket_manager import BucketManager


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
    content = {}
    article_name, status_code = get_request_input(request, get_env('KEY'))
    if status_code==HTTPStatus.OK:

        try:
            content = BucketManager.get_article(article_name)
        
        except Exception as e:
            print(e)
            content = {}
            status_code = HTTPStatus.FAILED_DEPENDENCY

    return build_response(content, status_code)


