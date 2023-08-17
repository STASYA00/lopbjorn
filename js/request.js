const constants = {
    ROOT_CLASSNAME: "root",
    DROPDOWN_CLASSNAME: "dropdown",
    DROPDOWNID: "dropdownid",
    DROPDOWN_CONTENT_CLASSNAME: "dropdown-content",
    DROPDOWN_BUTTON_ID: "dropdownbutton",
    SERVERURL: "https://us-central1-website-382116.cloudfunctions.net",
    HOME_ENDPOINT: "get_home_page",
    SECTION_ENDPOINT: "get_section_page",
    ARTICLE_ENDPOINT: "get_article_page",
    LOCAL_STORAGE: false,
    KEY:"content",
};

function loadPage(panel, v, params=""){
    DirectRequest(panel, params).then(r=>{
        document.getElementsByTagName("html")[0].innerHTML = r[constants.KEY]})
}
function DirectRequest(panel, params = ""){
    let SubmitMap = {
        "Home": `${constants.SERVERURL}/${constants.HOME_ENDPOINT}`,
        "Section": `${constants.SERVERURL}/${constants.SECTION_ENDPOINT}`,
        "Article": `${constants.SERVERURL}/${constants.ARTICLE_ENDPOINT}`,
    };
    if (Object.keys(SubmitMap).includes(panel)) {
        let url = SubmitMap[panel];
        // let url = SubmitMap[panel];
        return SubmitRequest(url, params);
    }

}

class Result {
    static get(value) {
        return { content: value };
    }
}


function SubmitRequest(url, params = "") {
    console.log(url);
    let req = new ServerRequest(params==""?{}:Result.get(params), url, "POST");
    return req.call().then(x => { console.log(x); return x; });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class ServerRequest {
    constructor(params, url, method = "POST") {
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
            
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods': 'GET, POST',
                // 'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({}),
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

