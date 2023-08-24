"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.loadPage = void 0;
const constants_1 = require("./constants");
const panel_1 = require("./panel");
class Result {
    static get(value) {
        return { content: value };
    }
}
exports.Result = Result;
function loadPage(panel, params = "") {
    let r = panel_1.PanelMap.get(panel);
    if (r != undefined) {
        return SubmitRequest(r, params);
        // .then(r=>{
        //     document.getElementsByTagName("html")[0].innerHTML = r.content})
    }
    return new Promise((res) => res(Result.get("")));
}
exports.loadPage = loadPage;
function SubmitRequest(url, params = "") {
    console.log(url);
    let req = new ServerRequest(params == "" ? {} : Result.get(params), url, "POST");
    return req.call().then(x => { console.log(x); return x; });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class ServerRequest {
    constructor(params, url, method = "POST") {
        this.params = params;
        this.method = method;
        this.url = url ? url : constants_1.constants.SERVERURL;
    }
    call() {
        try {
            return this.request();
        }
        catch (e) {
            console.log(e);
            return new Promise((res) => res(Result.get("")));
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
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(this.params),
            mode: 'cors'
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
