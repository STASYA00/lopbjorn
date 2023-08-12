
import functions_framework
from http import HTTPStatus
import requests

from functions.src.constants import ENDPOINTS
from functions.src.page import HomePage
from functions.src.utils import build_response


@functions_framework.http
def get_home_page(request):
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
    content = requests.get(ENDPOINTS.STRUCTURE.value)
    status_code = HTTPStatus.OK
    if content.status_code==status_code.value:
        content = HomePage.make(content.json())
    else:
        
        print(content.status_code)
        print(content.text)
        content = {}

        status_code = HTTPStatus.BAD_REQUEST

    return build_response(content, status_code)


