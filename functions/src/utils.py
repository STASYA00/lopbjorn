from flask import make_response, Request
import os
import requests
from http import HTTPStatus

def get_env(var_name):
    return os.environ.get(var_name, 'Specified environment variable is not set.')

def build_response(content, status_code:HTTPStatus= HTTPStatus.OK):
    response = make_response({"content": content}, status_code.value)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    # response.headers.add("Content-Type", "image/png") # multipart/form-data
    return response


def get_request_input(request: Request, key="content", default=""):
    print("external IP:", requests.get('https://ident.me').content)
    if request.method=="OPTIONS":
        return build_response({})
    status_code = HTTPStatus.OK
    request_json = request.get_json()
    print(request.get_json())
    
    if request.args and key in request.args:
        return request.args.get(key), status_code
    elif request_json and key in request_json:
        return request_json[key], status_code
    else:
        print("params not defined, defaulting to {}".format(
            default))
        status_code = HTTPStatus.NO_CONTENT
        
        return default, status_code