import requests
import json
import google.oauth2.id_token
import google.auth.transport.requests

from functions.src.constants import ENDPOINTS, ENVVAR

class Auth:
    @staticmethod
    def run(endpoint:ENDPOINTS)->str:
        request = google.auth.transport.requests.Request()
        return google.oauth2.id_token.fetch_id_token(request, endpoint.value)
    
class Request:
    @staticmethod
    def send(endpoint:ENDPOINTS, param:dict={}):
        TOKEN = Auth.run(endpoint)

        return requests.post(
            endpoint.value,
            headers={'Authorization': f"Bearer {TOKEN}", "Content-Type": "application/json"},
            data=json.dumps(param)  # possible request parameters
        )