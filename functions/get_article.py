
import functions_framework
from http import HTTPStatus
from functions.src.utils import get_request_input, build_response, get_env
from functions.src.constants import ENVVAR
from functions.src.bucket_manager import BucketManager


@functions_framework.http
def get_article(request):
    """HTTP Cloud Function. 

    This function gets an article asset from the blog bucket.
    The bucket is specified as BUCKET_NAME in the runtime variables.
    Other environment variables:
    ARTICLE_PREFIX - prefix to the article folder and filename (without extension)
    DEFAULT - name of the default article that we get from storage
    KEY - key to parse the request

    From terminal: curl -m 70 -X POST https://get-uuklxqul3q-uc.a.run.app -H "Content-Type: application/json" 
    -d '{"content": "Symbolism_i_en_Familjemiddag_av_Kazuo_Ishiguro"}
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
    
    
    article_name, status_code = get_request_input(request, ENVVAR.KEY.value)
    if status_code==HTTPStatus.OK:
        try:
            content = BucketManager.get_article("Articles/{}".format(article_name))
        
        except Exception as e:
            print(e)
            content = {}
            status_code = HTTPStatus.FAILED_DEPENDENCY

    return build_response(content, status_code)


