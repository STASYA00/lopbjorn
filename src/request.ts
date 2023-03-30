import { constants } from "./constants"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class ServerRequest {
    // https://get-uuklxqul3q-uc.a.run.app/?name=gcp_resources
    method: string;
    params: any;
    constructor(params: any) {
        this.params = params;
        this.method = "POST";
    }

    call(): any {
        return this.request();
    }

    getBaseUrl(): string {
        return constants.SERVERURL;
    }

    getUrl(): string {
        let query = this.getQuery();
        if (query == "") {
            return this.getBaseUrl();
        }
        return `${this.getBaseUrl()}?${query}`;
    }
    getQuery(): any {
        return `name=${this.params}`;
    }

    request(callback: any = null): Promise<Response> {
        const url = this.getUrl();
        console.log(`URL: ${url}`);
        return fetch(url, {
            method: this.method,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
         },
            mode: 'cors',
        }).then(result => {
            if (result.status == 200) {
                if (callback != undefined) {
                    result.json().then(r => callback(r));
                }
                return result.json(); //result.json();
            }
            else if (result.status == 429) {
                return sleep(1000).then(r => { return this.request() });
            }
            else if (result.status == 504) {
                return this.request();
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            
            return result;
        });
    }
}
export {ServerRequest};