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
                LOCAL_STORAGE: true,
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
                static get(local = false) {
                    return UrlHolder.construct(local, UrlHolder.article_endpoint);
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
System.register("src/uiElements", ["uuid", "src/constants"], function (exports_4, context_4) {
    "use strict";
    var uuid, constants_2, PanelElement, PanelText, Pane, PanelButton, Panel, PanelImage;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (uuid_3) {
                uuid = uuid_3;
            },
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }
        ],
        execute: function () {
            PanelElement = class PanelElement {
                constructor(id = null, css = [], classname = null) {
                    this.id = id ? id : uuid.v4();
                    this.css = css;
                    this.elementType = "div";
                    this.className = classname;
                }
                createElement() {
                    const el = document.createElement(this.elementType);
                    return el;
                }
                add(parentId = "") {
                    const el = this.createElement();
                    if (el != null) {
                        el.id = this.id;
                        if (this.className) {
                            el.className = this.className;
                        }
                        this.css.forEach((x) => {
                            el.style.setProperty(x.tag, x.value);
                        });
                        this.appendElement(parentId, el);
                        this.postprocess(el);
                    }
                }
                appendElement(parentId, child) {
                    let parent = document.getElementById(parentId);
                    if (parent) {
                        parent.appendChild(child);
                    }
                }
                postprocess(el) { }
            };
            exports_4("PanelElement", PanelElement);
            PanelText = class PanelText extends PanelElement {
                constructor(text, classname = null, id = null) {
                    super(id, [], classname);
                    this.text = text;
                    this.elementType = "p";
                }
                createElement() {
                    const el = document.createElement(this.elementType);
                    el.innerHTML = this.text;
                    el.id = this.id;
                    return el;
                }
            };
            exports_4("PanelText", PanelText);
            Pane = class Pane extends PanelElement {
                constructor(parentId, classname = null, parent = null) {
                    super(null, [], classname);
                    this.parent = parent;
                    this.parentId = parentId;
                }
                getElements() {
                    return [];
                }
                add() {
                    const pane = document.createElement("div");
                    pane.id = this.id;
                    if (this.className) {
                        pane.className = this.className;
                    }
                    const rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(pane);
                    }
                    else {
                        console.log(`Could not create ${"pane"}`);
                        return;
                    }
                    let elements = this.getElements();
                    elements.forEach((el) => {
                        el.add(this.id);
                    });
                    this.postprocess(pane);
                }
            };
            exports_4("Pane", Pane);
            PanelButton = class PanelButton extends PanelElement {
                constructor(label, onclickFn, classname = null, css = [], disabled = false) {
                    super(null, css, classname);
                    this.label = label;
                    this.onclickFn = onclickFn;
                    this.elementType = "button";
                    this.disabled = disabled;
                    if (!this.className) {
                        this.className = "button";
                    }
                }
                createElement() {
                    const el = document.createElement("button");
                    el.innerHTML = this.label;
                    el.onclick = this.onclickFn;
                    if (this.disabled) {
                        el.disabled = true;
                    }
                    return el;
                }
            };
            exports_4("PanelButton", PanelButton);
            Panel = class Panel {
                constructor(id = null, parent) {
                    this.id = id ? id : uuid.v4();
                    this.classname = "panel";
                    this.parent = parent;
                    this.parentId = constants_2.constants.ROOT_CLASSNAME;
                }
                getElements() {
                    return new Promise((res) => res([]));
                    ;
                }
                add() {
                    const panel = document.createElement("div");
                    panel.id = this.id;
                    panel.className = this.classname;
                    const rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(panel);
                    }
                    else {
                        console.log(`Could not create ${this.classname}`);
                        return;
                    }
                    panel.style.display = "none";
                    this.getElements().then(elements => elements.forEach((el) => {
                        el.add(this.id);
                    }));
                    this.postActions();
                }
                postActions() { }
            };
            exports_4("Panel", Panel);
            PanelImage = class PanelImage extends PanelElement {
                constructor(id, src, css = [], classname = null, onchangeFn = null) {
                    super(id, css, classname);
                    this.src = src;
                    this.elementType = "img";
                    this.onchangeFn = onchangeFn;
                }
                createElement() {
                    const img = document.createElement("img");
                    img.id = this.id;
                    img.src = this.src;
                    img.onclick = this.onchangeFn;
                    return img;
                }
            };
            exports_4("PanelImage", PanelImage);
        }
    };
});
System.register("src/section", ["src/uiElements"], function (exports_5, context_5) {
    "use strict";
    var uiElements_1, SECTIONS, ARTICLES, Section, Article;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (uiElements_1_1) {
                uiElements_1 = uiElements_1_1;
            }
        ],
        execute: function () {
            (function (SECTIONS) {
                SECTIONS[SECTIONS["TECH"] = 0] = "TECH";
                SECTIONS[SECTIONS["LINGUISTICS"] = 1] = "LINGUISTICS";
                SECTIONS[SECTIONS["SPORT"] = 2] = "SPORT";
                SECTIONS[SECTIONS["BOOKS"] = 3] = "BOOKS";
                SECTIONS[SECTIONS["OTHER"] = 4] = "OTHER";
            })(SECTIONS || (SECTIONS = {}));
            (function (ARTICLES) {
                ARTICLES[ARTICLES["GCPRESOURCES"] = 0] = "GCPRESOURCES";
            })(ARTICLES || (ARTICLES = {}));
            Section = class Section extends uiElements_1.Pane {
                constructor(parentId, classname = null, name, onChangefn = () => { }) {
                    super(parentId, classname, null);
                    this.name = name;
                    this.onChangefn = onChangefn;
                }
                postprocess(el) {
                    el.onclick = this.onChangefn;
                }
            };
            exports_5("Section", Section);
            Article = class Article extends Section {
            };
            exports_5("Article", Article);
        }
    };
});
System.register("src/request", ["src/constants"], function (exports_6, context_6) {
    "use strict";
    var constants_3, ServerRequest, LocalServerRequest;
    var __moduleName = context_6 && context_6.id;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            }
        ],
        execute: function () {
            ServerRequest = class ServerRequest {
                constructor(params, url) {
                    this.params = params;
                    this.method = "POST";
                    this.url = url ? url : constants_3.constants.SERVERURL;
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
            exports_6("ServerRequest", ServerRequest);
            LocalServerRequest = class LocalServerRequest extends ServerRequest {
                constructor(params, url) {
                    super(params, url ? url : constants_3.constants.LOCALHOST_URL);
                    this.method = "GET";
                }
            };
            exports_6("LocalServerRequest", LocalServerRequest);
        }
    };
});
System.register("src/structure", ["src/constants", "src/request"], function (exports_7, context_7) {
    "use strict";
    var constants_4, request_1, test_structure, BlogStructure, SectionStructure;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            }
        ],
        execute: function () {
            test_structure = {
                "content": {
                    "Tech": ["Simple_Website_with_Typescript", "Simple_Website_with_Typescript"],
                    "Other": [],
                    "Languages": ["dasf", "gDS", "sf", "etre", "sef"]
                }
            };
            BlogStructure = class BlogStructure {
                constructor() {
                    this.sections = [];
                }
                getLength() {
                    return this.sections.length;
                }
                getSections() {
                    let _sections = this.sections.map(x => x);
                    return _sections;
                }
                load() {
                    let s = new request_1.ServerRequest("");
                    s.url = constants_4.constants.STRUCTURE_URL;
                    return s.call().then(r => {
                        let res = r[constants_4.constants.RESPONSE_PARSE_KEY];
                        for (let r in res) {
                            let structure = new SectionStructure(r);
                            structure.add(res[r]);
                            this.sections.push(structure);
                        }
                        // make sections
                        localStorage.setItem(constants_4.constants.CACHE_KEY_STRUCTURE, res);
                        return res;
                    });
                }
                load_test() {
                    let res = test_structure["content"];
                    for (let key in res) {
                        let s = new SectionStructure(key);
                        this.sections.push(s);
                        res[key].forEach(val => {
                            s.add(val);
                        });
                    }
                }
            };
            exports_7("BlogStructure", BlogStructure);
            SectionStructure = class SectionStructure {
                constructor(name) {
                    this.name = name;
                    this.content = [];
                }
                add(article) {
                    this.content.push(article);
                }
                getContent() {
                    let _content = this.content.map(x => x);
                    return _content;
                }
                getLength() {
                    return this.content.length;
                }
            };
        }
    };
});
System.register("src/panel", ["src/constants", "src/uiElements", "src/section", "src/structure"], function (exports_8, context_8) {
    "use strict";
    var constants_5, uiElements_2, section_1, structure_1, PanelStart, PanelArticle, PanelNotFound;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (constants_5_1) {
                constants_5 = constants_5_1;
            },
            function (uiElements_2_1) {
                uiElements_2 = uiElements_2_1;
            },
            function (section_1_1) {
                section_1 = section_1_1;
            },
            function (structure_1_1) {
                structure_1 = structure_1_1;
            }
        ],
        execute: function () {
            PanelStart = class PanelStart extends uiElements_2.Panel {
                constructor(parent) {
                    super(constants_5.PANEL_ID_START, parent);
                }
                getElements() {
                    let structure = new structure_1.BlogStructure();
                    return structure.load().then(r => {
                        let _sections = structure.getSections();
                        let _elements = [];
                        for (let s = 0; s < _sections.length; s++) {
                            let _articles = _sections[s].getContent()[0];
                            _elements.push(new section_1.Section(this.id, constants_5.constants.SECTION_CLASSNAME, _sections[s].name, () => {
                                console.log("Section", _sections[s].name, _sections[s].getContent());
                                this.parent.switchToPanel(constants_5.PANEL_ID_ARTICLE);
                            }));
                            for (let a = 0; a < _articles.length; a++) {
                                _elements.push(new section_1.Article(this.id, constants_5.constants.ARTICLE_CLASSNAME, _articles[a], () => {
                                    this.parent.switchToPanel(constants_5.PANEL_ID_ARTICLE, _sections[s].name, _articles[a]);
                                    console.log("Article", _articles[a]);
                                }));
                            }
                        }
                        return new Promise((res) => res(_elements));
                    });
                }
            };
            exports_8("PanelStart", PanelStart);
            PanelArticle = class PanelArticle extends uiElements_2.Panel {
                constructor(parent, section, article, content) {
                    super(constants_5.PANEL_ID_ARTICLE, parent);
                    this.section = section;
                    this.article = article;
                    this.content = content;
                    this.classname = "panelarticle";
                }
                getElements() {
                    return new Promise((res) => res([
                        new uiElements_2.PanelText(this.content, "articletext")
                    ]));
                }
            };
            exports_8("PanelArticle", PanelArticle);
            PanelNotFound = class PanelNotFound extends uiElements_2.Panel {
                constructor(parent) {
                    super(constants_5.PANEL_ID_NOTFOUND, parent);
                    this.classname = "panelnotfound";
                }
                getElements() {
                    return new Promise((res) => res([
                        new uiElements_2.PanelText("ERROR 404")
                    ]));
                }
            };
            exports_8("PanelNotFound", PanelNotFound);
        }
    };
});
System.register("src/404/pageManager", ["src/constants", ".srvr/.node_srvr/src/urlManager", "src/request"], function (exports_9, context_9) {
    "use strict";
    var constants_6, urlManager_1, request_2, PageManager;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (constants_6_1) {
                constants_6 = constants_6_1;
            },
            function (urlManager_1_1) {
                urlManager_1 = urlManager_1_1;
            },
            function (request_2_1) {
                request_2 = request_2_1;
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
                        return (urlManager_1.urlManager.getCurrentURL() == constants_6.constants.HOME_URL) || (urlManager_1.urlManager.getCurrentURL() == constants_6.constants.HOME_URL + "/");
                    }
                    // check locally
                    return urlManager_1.urlManager.getCurrentURL().includes(urlManager_1.HTMLFilesEnum.HOME);
                }
                articleExists(article) {
                    let s = urlManager_1.urlManager.runsLocally() ? new request_2.LocalServerRequest({}, `${urlManager_1.UrlHolder.get(true)}/:${article}`) :
                        new request_2.ServerRequest({ "name": article }, urlManager_1.UrlHolder.get(false));
                    return s.call().then(r => {
                        //r = r as ArticleResponse;
                        console.log("RESPONSE:", r);
                        console.log(r[constants_6.constants.RESPONSE_PARSE_KEY]);
                        if (constants_6.constants.LOCAL_STORAGE) {
                            localStorage.setItem(article, JSON.stringify(r[constants_6.constants.RESPONSE_PARSE_KEY]));
                        }
                        return r[constants_6.constants.RESPONSE_PARSE_KEY];
                    });
                }
                start(canvas) {
                    if (this.isHome()) {
                        console.log("Home panel");
                        //this.assigner.make(PANEL_ID_START, constants.SITE_NAME);
                        //return new Promise((res)=>res(new PanelStart(canvas)));
                    }
                    let article = urlManager_1.urlManager.runsLocally() ? constants_6.constants.TEST_ARTICLE : this.getArticle();
                    console.log("article: ", article);
                    this.articleExists(article).then(res => {
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
                    let new_url = constants_6.constants.HOME_URL;
                    if (article) {
                        new_url = `${constants_6.constants.HOME_URL}/${article}`;
                    }
                    return urlManager_1.urlManager.redirectURL(new_url);
                }
            };
            exports_9("PageManager", PageManager);
        }
    };
});
System.register("src/canvas", ["src/404/pageManager"], function (exports_10, context_10) {
    "use strict";
    var pageManager_1, PanelEnum, Canvas;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (pageManager_1_1) {
                pageManager_1 = pageManager_1_1;
            }
        ],
        execute: function () {
            (function (PanelEnum) {
                PanelEnum[PanelEnum["PANEL_START"] = 0] = "PANEL_START";
                PanelEnum[PanelEnum["PANEL_ARTICLE"] = 1] = "PANEL_ARTICLE";
                PanelEnum[PanelEnum["PANEL_NOTFOUND"] = 2] = "PANEL_NOTFOUND";
            })(PanelEnum || (PanelEnum = {}));
            exports_10("PanelEnum", PanelEnum);
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
            exports_10("Canvas", Canvas);
        }
    };
});
System.register("src/main", ["src/canvas"], function (exports_11, context_11) {
    "use strict";
    var canvas_1, c;
    var __moduleName = context_11 && context_11.id;
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
