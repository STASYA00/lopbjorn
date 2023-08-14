var constants = {
    ROOT_CLASSNAME: "root",
    DROPDOWN_CLASSNAME: "dropdown",
    DROPDOWNID: "dropdownid",
    DROPDOWN_CONTENT_CLASSNAME: "dropdown-content",
    DROPDOWN_BUTTON_ID: "dropdownbutton",
    SERVERURL: "https://us-central1-rfid-test-app-d7b8.cloudfunctions.net",
    GET_EPC_END: "get_epc",
    GET_STORES_END: "get_stores",
    EPC_POS_END: "get_positions",
    STORE_ANALYSIS_END: "analyze_store",
    CALC_METRICS_END: "calculate_metrics",
    UNIQUE_END: "article",
    LOG_BQ_END: "log_bq",
    TEST_URL: "result",
    ANALYZE_STORE_URL: "analyze_store",
    RESPONSE_PARSE_KEY: "content",
    LOCALHOST_URL: `http://localhost:3002`,
    LOCAL_STORAGE: false,
};

function DirectRequest(panel, value, params = ""){
    let SubmitMap = {
        "Store Analysis": `${constants.STORE_ANALYSIS_END}`,
        "Aggregation Level": `${constants.UNIQUE_END}`,
    };
    if (Object.keys(SubmitMap).includes(panel)) {
        let url = value == undefined ? SubmitMap[panel] : `${SubmitMap[panel]}/${value}`;
        // let url = SubmitMap[panel];
        return SubmitRequest(url);
    }

}

class Result {
    static get(value) {
        return { content: value };
    }
}


function SubmitRequest(url, params = "") {
    console.log(url);
    let req = new ServerRequest(params==""?{}:Result.get(params), url, "GET");
    return req.call().then(x => { console.log(x); return x; });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class ServerRequest {
    constructor(params, url, method = "GET") {
        this.params = params;
        this.method = method;
        this.url = url ? url : constants.SERVERURL;
    }
    call() {
        try {
            return this.request();
        }
        catch (e) {
            console.log(e);
            return new Promise((res) => res({ content: ["A", "B"] }));
        }
    }
    getBaseUrl() {
        return this.url;
    }
    getUrl() {
        let query = this.getQuery();
        if (this.method == "POST" || query == "") {
            return this.getBaseUrl();
        }
        return `${this.getBaseUrl()}?${query}`;
    }
    getQuery() {
        let s = "";
        for (let key in this.params) {
            s += `${key}=${this.params[key]}\&`;
        }
        console.log(`query: ${s}`);
        return this.method == "POST" ? "" : s;
    }
    request(callback = null) {
        const url = this.getUrl();
        console.log(`URL: ${url}`);
        console.log(JSON.stringify(this.params));
        return fetch(url, {
            method: this.method,
            // body: JSON.stringify(this.params),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            mode: 'cors',
        }).then(result => {
            console.log("RESULT", result);
            if (result.status == 200) {
                if (callback != undefined) {
                    result.json().then(r => { callback(r); return r; });
                }
                return result.json(); //result.json();
            }
            else if (result.status == 429) {
                return sleep(1000).then(r => { return this.request(); });
            }
            else if (result.status == 504) {
                return this.request();
            }
            else {
                console.log(result);
                console.log(`CODE: ${result.status}`);
            }
            return result.json();
        });
    }
}
function a(){
    let r = new ServerRequest({}, "https://us-central1-website-382116.cloudfunctions.net/get_home_page", "POST");
    r.call().then(r=>{console.log(r);})
}
a();