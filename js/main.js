System.register("src/constants", ["uuid"], function (exports_1, context_1) {
    "use strict";
    var uuid, PANEL_ID_START, PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND, constants;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (uuid_1) {
                uuid = uuid_1;
            }
        ],
        execute: function () {
            PANEL_ID_START = uuid.v4();
            exports_1("PANEL_ID_START", PANEL_ID_START);
            PANEL_ID_ARTICLE = uuid.v4();
            exports_1("PANEL_ID_ARTICLE", PANEL_ID_ARTICLE);
            PANEL_ID_NOTFOUND = uuid.v4();
            exports_1("PANEL_ID_NOTFOUND", PANEL_ID_NOTFOUND);
            exports_1("constants", constants = {
                HOME_URL: "https://stasya00.github.io/lopbjorn",
                SITE_NAME: "Lopbjorn, Stasja Fedorova's personal blog",
                ARTICLE_HTML: "html/article.html",
                ROOT_CLASSNAME: "root",
                ARTICLE_CLASSNAME: "article",
                SECTION_CLASSNAME: "section",
                TEST_ARTICLE: "Simple_website_with_Typescript",
                SERVERNAME: `uuklxqul3q-uc1.a.run.app/`,
                SERVERURL: "https://get-uuklxqul3q-uc1.a.run.app/",
                STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/",
                ARTICLEEXISTS_URL: "https://article-exists-uuklxqul3q-uc.a.run.app/",
                RESPONSE_PARSE_KEY: "content",
                NOTFOUND: uuid.v4(),
                LOCALHOST_URL: "http://localhost:3001",
                CACHE_KEY_STRUCTURE: "Blog_Structure",
                LOCAL_STORAGE: true,
            });
        }
    };
});
System.register(".srvr/.node_srvr/src/constants", ["uuid"], function (exports_2, context_2) {
    "use strict";
    var uuid, PANEL_ID_START, PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND, constants;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (uuid_2) {
                uuid = uuid_2;
            }
        ],
        execute: function () {
            PANEL_ID_START = uuid.v4();
            exports_2("PANEL_ID_START", PANEL_ID_START);
            PANEL_ID_ARTICLE = uuid.v4();
            exports_2("PANEL_ID_ARTICLE", PANEL_ID_ARTICLE);
            PANEL_ID_NOTFOUND = uuid.v4();
            exports_2("PANEL_ID_NOTFOUND", PANEL_ID_NOTFOUND);
            exports_2("constants", constants = {
                HOME_URL: "https://stasya00.github.io/lopbjorn",
                SITE_NAME: "Lopbjorn, Stasja Fedorova's personal blog",
                ARTICLE_HTML: "html/article.html",
                ROOT_CLASSNAME: "root",
                ARTICLE_CLASSNAME: "article",
                SECTION_CLASSNAME: "section",
                TEST_ARTICLE: "Simple_website_with_Typescript",
                SERVERNAME: `uuklxqul3q-uc1.a.run.app/`,
                SERVERURL: "https://get-uuklxqul3q-uc1.a.run.app/",
                STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/",
                ARTICLEEXISTS_URL: "https://article-exists-uuklxqul3q-uc.a.run.app/",
                RESPONSE_PARSE_KEY: "content",
                NOTFOUND: uuid.v4(),
                LOCALHOST_URL: "http://localhost:3001",
                CACHE_KEY_STRUCTURE: "Blog_Structure",
                LOCAL_STORAGE: false,
            });
        }
    };
});
System.register(".srvr/.node_srvr/src/urlManager", [".srvr/.node_srvr/src/constants"], function (exports_3, context_3) {
    "use strict";
    var constants_1, HTMLFilesEnum, UrlHolder, urlManager;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            (function (HTMLFilesEnum) {
                HTMLFilesEnum["HOME"] = "index";
                HTMLFilesEnum["ERROR"] = "404";
            })(HTMLFilesEnum || (HTMLFilesEnum = {}));
            exports_3("HTMLFilesEnum", HTMLFilesEnum);
            UrlHolder = class UrlHolder {
                static get(local = false, is_article = false) {
                    let endpoint = is_article ? UrlHolder.article_endpoint : UrlHolder.structure_endpoint;
                    return UrlHolder.construct(local, endpoint);
                }
                static construct(local, endpoint) {
                    console.log(local, endpoint);
                    return local ? UrlHolder.getLocal(endpoint) : UrlHolder.getServer(endpoint);
                }
                static getLocal(endpoint = "") {
                    return `${constants_1.constants.LOCALHOST_URL}/${endpoint}`;
                }
                static getServer(endpoint = "") {
                    return `https://${endpoint}-${constants_1.constants.SERVERNAME}`;
                }
            };
            exports_3("UrlHolder", UrlHolder);
            UrlHolder.article_endpoint = "get";
            UrlHolder.structure_endpoint = "structure";
            urlManager = class urlManager {
                static getCurrentURL() {
                    return urlManager.is_server() ? "" : window.location.href;
                }
                static redirectURL(url = constants_1.constants.HOME_URL) {
                    if (!urlManager.is_server()) {
                        console.log(`redirecting from ${urlManager.getCurrentURL()} to ${url}`);
                        if (urlManager.getCurrentURL() != url && urlManager.getCurrentURL() != url + "/"
                            && urlManager.getCurrentURL() + "/" != url) {
                            console.log("executing redirect");
                            return window.location.replace(url);
                        }
                    }
                }
                static redirectLocalURL(toHome = true, article) {
                    if (!urlManager.is_server()) {
                        let new_url = toHome ? this.getCurrentURL().replace(HTMLFilesEnum.ERROR, HTMLFilesEnum.HOME) :
                            `${this.getCurrentURL().replace(HTMLFilesEnum.HOME, HTMLFilesEnum.ERROR)}`; // /{$article}`;
                        console.log(new_url);
                        if (new_url == this.getCurrentURL()) {
                            return;
                        }
                        return this.redirectURL(new_url);
                    }
                }
                static rewriteURL(endpoint = "") {
                    if (!urlManager.is_server()) {
                        if (!urlManager.runsLocally()) {
                            history.pushState({ "name": "lopbjorn" }, "", endpoint);
                        }
                        return `${constants_1.constants.HOME_URL}/${endpoint}` == this.getCurrentURL();
                    }
                    return false;
                }
                static runsLocally() {
                    return window.location.protocol == 'file:';
                }
                static is_server() {
                    return !(typeof window != 'undefined' && window.document);
                }
            };
            exports_3("urlManager", urlManager);
        }
    };
});
System.register("src/request", ["src/constants"], function (exports_4, context_4) {
    "use strict";
    var constants_2, ServerRequest, LocalServerRequest;
    var __moduleName = context_4 && context_4.id;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return {
        setters: [
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }
        ],
        execute: function () {
            ServerRequest = class ServerRequest {
                constructor(params, url) {
                    this.params = params;
                    this.method = "POST";
                    this.url = url ? url : constants_2.constants.SERVERURL;
                }
                call() {
                    return this.request();
                }
                getBaseUrl() {
                    return this.url;
                }
                getUrl() {
                    let query = this.getQuery();
                    if (query == "") {
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
                    return s;
                }
                request(callback = null) {
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
                            return sleep(1000).then(r => { return this.request(); });
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
            };
            exports_4("ServerRequest", ServerRequest);
            LocalServerRequest = class LocalServerRequest extends ServerRequest {
                constructor(params, url) {
                    super(params, url ? url : constants_2.constants.LOCALHOST_URL);
                    this.method = "GET";
                }
            };
            exports_4("LocalServerRequest", LocalServerRequest);
        }
    };
});
System.register("src/404/pageManager", ["src/constants", ".srvr/.node_srvr/src/urlManager", "src/request"], function (exports_5, context_5) {
    "use strict";
    var constants_3, urlManager_1, request_1, PageManager;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (urlManager_1_1) {
                urlManager_1 = urlManager_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            }
        ],
        execute: function () {
            PageManager = class PageManager {
                //private assigner: PageTagAssigner;
                constructor() {
                    //this.assigner = new PageTagAssigner();
                }
                getArticle() {
                    let url = urlManager_1.urlManager.getCurrentURL();
                    url = url.endsWith("/") ? url.substring(0, url.length) : url;
                    return url.substring(url.lastIndexOf("/") + 1, url.length);
                }
                isHome() {
                    console.log(`Current url: ${urlManager_1.urlManager.getCurrentURL()}`);
                    if (!urlManager_1.urlManager.runsLocally()) {
                        return (urlManager_1.urlManager.getCurrentURL() == constants_3.constants.HOME_URL) || (urlManager_1.urlManager.getCurrentURL() == constants_3.constants.HOME_URL + "/");
                    }
                    // check locally
                    return urlManager_1.urlManager.getCurrentURL().includes(urlManager_1.HTMLFilesEnum.HOME);
                }
                sendArticleRequest(article = "") {
                    let s = urlManager_1.urlManager.runsLocally() ? new request_1.LocalServerRequest({}, `${urlManager_1.UrlHolder.get(true, true)}/:${article}`) :
                        new request_1.ServerRequest({ "name": article }, urlManager_1.UrlHolder.get(false, true));
                    return s.call().then(r => {
                        //r = r as ArticleResponse;
                        console.log("RESPONSE:", r);
                        console.log(r[constants_3.constants.RESPONSE_PARSE_KEY]);
                        if (constants_3.constants.LOCAL_STORAGE) {
                            localStorage.setItem(article, JSON.stringify(r[constants_3.constants.RESPONSE_PARSE_KEY]));
                        }
                        return r[constants_3.constants.RESPONSE_PARSE_KEY];
                    });
                }
                sendStructureRequest() {
                    let s = urlManager_1.urlManager.runsLocally() ? new request_1.LocalServerRequest({}, `${urlManager_1.UrlHolder.get(true)}`) :
                        new request_1.ServerRequest({}, urlManager_1.UrlHolder.get(false));
                    return s.call().then(r => {
                        //r = r as ArticleResponse;
                        console.log("RESPONSE:", r);
                        console.log(r[constants_3.constants.RESPONSE_PARSE_KEY]);
                        if (constants_3.constants.LOCAL_STORAGE) {
                            localStorage.setItem(constants_3.constants.CACHE_KEY_STRUCTURE, JSON.stringify(r[constants_3.constants.RESPONSE_PARSE_KEY]));
                        }
                        return r[constants_3.constants.RESPONSE_PARSE_KEY];
                    });
                }
                start(canvas) {
                    if (this.isHome()) {
                        console.log("Home panel");
                        this.sendStructureRequest().then(res => {
                            console.log(res);
                        });
                        return;
                        //this.assigner.make(PANEL_ID_START, constants.SITE_NAME);
                        //return new Promise((res)=>res(new PanelStart(canvas)));
                    }
                    let article = urlManager_1.urlManager.runsLocally() ? constants_3.constants.TEST_ARTICLE : this.getArticle();
                    console.log("article: ", article);
                    this.sendArticleRequest(article).then(res => {
                        console.log("result", res);
                        let html = document.querySelector("html");
                        if (html) {
                            console.log("HTML");
                            html.innerHTML = res;
                        }
                        try {
                            urlManager_1.urlManager.rewriteURL(article);
                        }
                        catch (e) {
                            console.log(e);
                            console.log("Local dev environment, no URL rewriting possible");
                        }
                        //this.assigner.make(PANEL_ID_ARTICLE, res.article);
                        //return new Promise((r)=>r(new PanelArticle(canvas, res.section, res.article, res.text)));
                    });
                }
                switch(canvas, section, article) {
                    if (urlManager_1.urlManager.runsLocally()) {
                        console.log(section == undefined);
                        return urlManager_1.urlManager.redirectLocalURL(section == undefined, article);
                    }
                    let new_url = constants_3.constants.HOME_URL;
                    if (article) {
                        new_url = `${constants_3.constants.HOME_URL}/${article}`;
                    }
                    return urlManager_1.urlManager.redirectURL(new_url);
                }
            };
            exports_5("PageManager", PageManager);
        }
    };
});
System.register("src/canvas", ["src/404/pageManager"], function (exports_6, context_6) {
    "use strict";
    var pageManager_1, PanelEnum, Canvas;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (pageManager_1_1) {
                pageManager_1 = pageManager_1_1;
            }
        ],
        execute: function () {
            //import { PanelArticle } from "./panel";
            (function (PanelEnum) {
                PanelEnum[PanelEnum["PANEL_START"] = 0] = "PANEL_START";
                PanelEnum[PanelEnum["PANEL_ARTICLE"] = 1] = "PANEL_ARTICLE";
                PanelEnum[PanelEnum["PANEL_NOTFOUND"] = 2] = "PANEL_NOTFOUND";
            })(PanelEnum || (PanelEnum = {}));
            exports_6("PanelEnum", PanelEnum);
            Canvas = class Canvas {
                constructor() {
                    this.currentDisplayedPanelId = "";
                    this.panelIds = [];
                    this.manager = new pageManager_1.PageManager();
                    console.log("canvas initiated");
                }
                make() {
                    //this.switchToPanel(this.panelIds[0]);
                    console.log("new canvas!");
                    this.manager.start(this);
                    // .then(p => {
                    //   p.add();
                    //   this.panelIds.push(p.id);
                    //   let article, section = undefined;
                    //   if (p instanceof PanelArticle){
                    //     section= p.section;
                    //     article =p.article;
                    //   }
                    //   console.log(p.id, section, article);
                    //   this.switchToPanel(p.id, section, article);  
                    // });
                }
                nextPage() {
                    console.log("clicked next");
                    let ind = this.panelIds.indexOf(this.currentDisplayedPanelId);
                    console.log(ind);
                    if (ind < this.panelIds.length - 1) {
                        ind = ind + 1;
                    }
                    this.switchToPanel(this.panelIds[ind]);
                }
                previousPage() {
                    console.log("clicked prev");
                    let ind = this.panelIds.indexOf(this.currentDisplayedPanelId);
                    console.log(ind);
                    if (ind > 0) {
                        ind = ind - 1;
                    }
                    this.switchToPanel(this.panelIds[ind]);
                }
                switchToPanel(id, section, article) {
                    if (this.currentDisplayedPanelId) {
                        let el = document.getElementById(this.currentDisplayedPanelId);
                        if (el) {
                            el.style.display = "none";
                        }
                    }
                    let el = document.getElementById(id);
                    if (el) {
                        el.style.display = "grid"; //flex
                    }
                    this.currentDisplayedPanelId = id;
                    this.manager.switch(this, section, article);
                }
            };
            exports_6("Canvas", Canvas);
        }
    };
});
System.register("src/main", ["src/canvas"], function (exports_7, context_7) {
    "use strict";
    var canvas_1, c;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            }
        ],
        execute: function () {
            c = new canvas_1.Canvas();
            c.make();
        }
    };
});
