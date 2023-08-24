"use strict";
exports.__esModule = true;
exports.Result = exports.loadPage = void 0;
var constants_1 = require("./constants");
var panel_1 = require("./panel");
var Result = /** @class */ (function () {
    function Result() {
    }
    Result.get = function (value) {
        return { content: value };
    };
    return Result;
}());
exports.Result = Result;
function loadPage(panel, params) {
    if (params === void 0) { params = ""; }
    var r = panel_1.PanelMap.get(panel);
    if (r != undefined) {
        return SubmitRequest(r, params);
        // .then(r=>{
        //     document.getElementsByTagName("html")[0].innerHTML = r.content})
    }
    return new Promise(function (res) { return res(Result.get("")); });
}
exports.loadPage = loadPage;
function SubmitRequest(url, params) {
    if (params === void 0) { params = ""; }
    console.log(url);
    var req = new ServerRequest(params == "" ? {} : Result.get(params), url, "POST");
    return req.call().then(function (x) { console.log(x); return x; });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
var ServerRequest = /** @class */ (function () {
    function ServerRequest(params, url, method) {
        if (method === void 0) { method = "POST"; }
        this.params = params;
        this.method = method;
        this.url = url ? url : constants_1.constants.SERVERURL;
    }
    ServerRequest.prototype.call = function () {
        try {
            return this.request();
        }
        catch (e) {
            console.log(e);
            return new Promise(function (res) { return res(Result.get("")); });
        }
    };
    ServerRequest.prototype.getBaseUrl = function () {
        return this.url;
    };
    ServerRequest.prototype.getUrl = function () {
        var query = this.getQuery();
        if (this.method == "POST" || query == "") {
            return this.getBaseUrl();
        }
        return "".concat(this.getBaseUrl(), "?").concat(query);
    };
    ServerRequest.prototype.getQuery = function () {
        var s = "";
        for (var key in this.params) {
            s += "".concat(key, "=").concat(this.params[key], "&");
        }
        console.log("query: ".concat(s));
        return this.method == "POST" ? "" : s;
    };
    ServerRequest.prototype.request = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var url = this.getUrl();
        console.log("URL: ".concat(url));
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
        }).then(function (result) {
            console.log("RESULT", result);
            if (result.status == 200) {
                if (callback != undefined) {
                    result.json().then(function (r) { callback(r); return r; });
                }
                return result.json(); //result.json();
            }
            else if (result.status == 429) {
                return sleep(1000).then(function (r) { return _this.request(); });
            }
            else if (result.status == 504) {
                return _this.request();
            }
            else {
                console.log(result);
                console.log("CODE: ".concat(result.status));
            }
            return result.json();
        });
    };
    return ServerRequest;
}());
