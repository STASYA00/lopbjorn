var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("constants", ["uuid"], function (exports_1, context_1) {
    "use strict";
    var uuid, constants;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (uuid_1) {
                uuid = uuid_1;
            }
        ],
        execute: function () {
            exports_1("constants", constants = {
                HOME_URL: "https://stasya00.github.io/lopbjorn",
                ARTICLE_HTML: "html/article.html",
                ROOT_CLASSNAME: "root",
                ARTICLE_CLASSNAME: "article",
                SECTION_CLASSNAME: "section",
                SERVERURL: "https://get-uuklxqul3q-uc.a.run.app/",
                STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/",
                RESPONSE_PARSE_KEY: "content",
                PANEL_ID_START: uuid.v4(),
                PANEL_ID_ARTICLE: uuid.v4(),
                PANEL_ID_NOTFOUND: uuid.v4(),
                CACHE_KEY_STRUCTURE: "Blog_Structure",
                LOCAL_STORAGE: true
            });
        }
    };
});
System.register("request", ["constants"], function (exports_2, context_2) {
    "use strict";
    var constants_1, ServerRequest;
    var __moduleName = context_2 && context_2.id;
    function sleep(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            ServerRequest = /** @class */ (function () {
                function ServerRequest(params) {
                    this.params = params;
                    this.method = "POST";
                    this.url = constants_1.constants.SERVERURL;
                }
                ServerRequest.prototype.call = function () {
                    return this.request();
                };
                ServerRequest.prototype.getBaseUrl = function () {
                    return this.url;
                };
                ServerRequest.prototype.getUrl = function () {
                    var query = this.getQuery();
                    if (query == "") {
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
                    return s;
                };
                ServerRequest.prototype.request = function (callback) {
                    var _this = this;
                    if (callback === void 0) { callback = null; }
                    var url = this.getUrl();
                    console.log("URL: ".concat(url));
                    return fetch(url, {
                        method: this.method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST',
                            'Access-Control-Allow-Headers': 'Content-Type'
                        },
                        mode: 'cors'
                    }).then(function (result) {
                        if (result.status == 200) {
                            if (callback != undefined) {
                                result.json().then(function (r) { return callback(r); });
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
                            console.log("CODE: ".concat(result.status));
                        }
                        return result;
                    });
                };
                return ServerRequest;
            }());
            exports_2("ServerRequest", ServerRequest);
        }
    };
});
System.register("structure", ["constants", "request"], function (exports_3, context_3) {
    "use strict";
    var constants_2, request_1, test_structure, BlogStructure, SectionStructure;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_2_1) {
                constants_2 = constants_2_1;
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
            BlogStructure = /** @class */ (function () {
                function BlogStructure() {
                    this.sections = [];
                }
                BlogStructure.prototype.getLength = function () {
                    return this.sections.length;
                };
                BlogStructure.prototype.getSections = function () {
                    var _sections = this.sections.map(function (x) { return x; });
                    return _sections;
                };
                BlogStructure.prototype.load = function () {
                    var s = new request_1.ServerRequest("");
                    s.url = constants_2.constants.STRUCTURE_URL;
                    return s.call().then(function (r) {
                        var res = r[constants_2.constants.RESPONSE_PARSE_KEY];
                        // make sections
                        localStorage.setItem(constants_2.constants.CACHE_KEY_STRUCTURE, res);
                        return res;
                    });
                };
                BlogStructure.prototype.load_test = function () {
                    var res = test_structure["content"];
                    var _loop_1 = function (key) {
                        var s = new SectionStructure(key);
                        this_1.sections.push(s);
                        res[key].forEach(function (val) {
                            s.add(val);
                        });
                    };
                    var this_1 = this;
                    for (var key in res) {
                        _loop_1(key);
                    }
                };
                return BlogStructure;
            }());
            exports_3("BlogStructure", BlogStructure);
            SectionStructure = /** @class */ (function () {
                function SectionStructure(name) {
                    this.name = name;
                    this.content = [];
                }
                SectionStructure.prototype.add = function (article) {
                    this.content.push(article);
                };
                SectionStructure.prototype.getContent = function () {
                    var _content = this.content.map(function (x) { return x; });
                    return _content;
                };
                SectionStructure.prototype.getLength = function () {
                    return this.content.length;
                };
                return SectionStructure;
            }());
        }
    };
});
System.register("articleRenderer", ["marked", "constants", "request"], function (exports_4, context_4) {
    "use strict";
    var marked_1, constants_3, request_2, ArticleRenderer;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (marked_1_1) {
                marked_1 = marked_1_1;
            },
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (request_2_1) {
                request_2 = request_2_1;
            }
        ],
        execute: function () {
            ArticleRenderer = /** @class */ (function () {
                function ArticleRenderer() {
                }
                ArticleRenderer._make = function (content) {
                    if (localStorage.getItem(content) != null) {
                        return new Promise(function (res) { return res(localStorage.getItem(content)); });
                    }
                    var s = new request_2.ServerRequest(content);
                    return s.call().then(function (r) {
                        var res = marked_1.marked.parse(r[constants_3.constants.RESPONSE_PARSE_KEY]);
                        localStorage.setItem(content, res);
                        return res;
                    });
                };
                ArticleRenderer.makeArticleInterface = function (section, name) {
                    return { "section": section, "name": name };
                };
                ArticleRenderer.make = function (section, name) {
                    if (constants_3.constants.LOCAL_STORAGE) {
                        if (localStorage.getItem(name) != null) {
                            return new Promise(function (res) { return res(localStorage.getItem(name)); });
                        }
                    }
                    var s = new request_2.ServerRequest(ArticleRenderer.makeArticleInterface(section, name));
                    return s.call().then(function (r) {
                        var res = marked_1.marked.parse(r[constants_3.constants.RESPONSE_PARSE_KEY]);
                        localStorage.setItem(name, res);
                        return res;
                    });
                };
                return ArticleRenderer;
            }());
            exports_4("ArticleRenderer", ArticleRenderer);
        }
    };
});
System.register("panel", ["constants", "uiElements", "section", "structure", "articleRenderer"], function (exports_5, context_5) {
    "use strict";
    var constants_4, uiElements_1, section_1, structure_1, articleRenderer_1, PanelStart, PanelArticle, PanelNotFound;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (uiElements_1_1) {
                uiElements_1 = uiElements_1_1;
            },
            function (section_1_1) {
                section_1 = section_1_1;
            },
            function (structure_1_1) {
                structure_1 = structure_1_1;
            },
            function (articleRenderer_1_1) {
                articleRenderer_1 = articleRenderer_1_1;
            }
        ],
        execute: function () {
            PanelStart = /** @class */ (function (_super) {
                __extends(PanelStart, _super);
                function PanelStart(parent) {
                    return _super.call(this, constants_4.constants.PANEL_ID_START, parent) || this;
                }
                PanelStart.prototype.getElements = function () {
                    var _this = this;
                    // return ArticleRenderer.make("gcp_resources").then(r => [
                    //   new Article(this.id, "article"),
                    //   new PanelText(r, "articletext")
                    // ]);
                    var structure = new structure_1.BlogStructure();
                    structure.load_test();
                    var _sections = structure.getSections();
                    var _elements = [];
                    var _loop_2 = function (s) {
                        var _articles = _sections[s].getContent();
                        _elements.push(new section_1.Section(this_2.id, constants_4.constants.SECTION_CLASSNAME, _sections[s].name, function () {
                            console.log("Section", _sections[s].name, _sections[s].getContent());
                            _this.parent.switchToPanel(constants_4.constants.PANEL_ID_ARTICLE);
                        }));
                        var _loop_3 = function (a) {
                            _elements.push(new section_1.Article(this_2.id, constants_4.constants.ARTICLE_CLASSNAME, _articles[a], function () {
                                _this.parent.switchToPanel(constants_4.constants.PANEL_ID_ARTICLE);
                                console.log("Article", _articles[a]);
                            }));
                        };
                        for (var a = 0; a < _articles.length; a++) {
                            _loop_3(a);
                        }
                    };
                    var this_2 = this;
                    for (var s = 0; s < _sections.length; s++) {
                        _loop_2(s);
                    }
                    return new Promise(function (res) { return res(_elements); });
                };
                return PanelStart;
            }(uiElements_1.Panel));
            exports_5("PanelStart", PanelStart);
            PanelArticle = /** @class */ (function (_super) {
                __extends(PanelArticle, _super);
                function PanelArticle(parent, section, article) {
                    var _this = _super.call(this, constants_4.constants.PANEL_ID_ARTICLE, parent) || this;
                    _this.section = section;
                    _this.article = article;
                    _this.classname = "panelarticle";
                    return _this;
                }
                PanelArticle.prototype.getElements = function () {
                    console.log("Getting elements", this.section, this.article);
                    return articleRenderer_1.ArticleRenderer.make(this.section, this.article).then(function (r) { return [
                        new uiElements_1.PanelText(r, "articletext")
                    ]; });
                };
                return PanelArticle;
            }(uiElements_1.Panel));
            exports_5("PanelArticle", PanelArticle);
            PanelNotFound = /** @class */ (function (_super) {
                __extends(PanelNotFound, _super);
                function PanelNotFound(parent) {
                    var _this = _super.call(this, constants_4.constants.PANEL_ID_NOTFOUND, parent) || this;
                    _this.classname = "panelnotfound";
                    return _this;
                }
                PanelNotFound.prototype.getElements = function () {
                    return new Promise(function (res) { return res([
                        new uiElements_1.PanelText("ERROR 404")
                    ]); });
                };
                return PanelNotFound;
            }(uiElements_1.Panel));
            exports_5("PanelNotFound", PanelNotFound);
        }
    };
});
System.register("utils", ["constants"], function (exports_6, context_6) {
    "use strict";
    var constants_5;
    var __moduleName = context_6 && context_6.id;
    function getCurrentURL() {
        return window.location.href;
    }
    exports_6("getCurrentURL", getCurrentURL);
    function redirectURL(url) {
        if (url === void 0) { url = constants_5.constants.HOME_URL; }
        return window.location.replace(url);
    }
    exports_6("redirectURL", redirectURL);
    return {
        setters: [
            function (constants_5_1) {
                constants_5 = constants_5_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("404/pageManager", ["constants", "utils", "panel"], function (exports_7, context_7) {
    "use strict";
    var constants_6, utils_1, panel_1, PageManager;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (constants_6_1) {
                constants_6 = constants_6_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            }
        ],
        execute: function () {
            PageManager = /** @class */ (function () {
                function PageManager() {
                }
                PageManager.prototype.getArticle = function () {
                    var url = utils_1.getCurrentURL();
                    url = url.substring(0, url.length - 1);
                    return url.substring(url.lastIndexOf("/"), url.length);
                };
                PageManager.prototype.start = function (canvas) {
                    console.log("get current ".concat(utils_1.getCurrentURL()));
                    console.log("home ".concat(constants_6.constants.HOME_URL));
                    if (utils_1.getCurrentURL() == constants_6.constants.HOME_URL) {
                        return new panel_1.PanelStart(canvas);
                    }
                    var article = this.getArticle();
                    // check that article is on GCP
                    var result = true;
                    if (result) {
                        // redirect to article page - no need
                        //redirectURL(`${constants.HOME_URL}`);
                        var section = "Tech";
                        article = "Parsing_ifc_file";
                        return new panel_1.PanelArticle(canvas, section, article);
                    }
                    return new panel_1.PanelNotFound(canvas);
                };
                return PageManager;
            }());
            exports_7("PageManager", PageManager);
        }
    };
});
System.register("canvas", ["404/pageManager"], function (exports_8, context_8) {
    "use strict";
    var pageManager_1, Canvas;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (pageManager_1_1) {
                pageManager_1 = pageManager_1_1;
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function () {
                function Canvas() {
                    this.currentDisplayedPanelId = "";
                    this.panelIds = [];
                    this.manager = new pageManager_1.PageManager();
                }
                Canvas.prototype.make = function () {
                    //this.switchToPanel(this.panelIds[0]);
                    console.log("new canvas!");
                    var p = this.manager.start(this);
                    // let p = new PanelStart(this);
                    // let p1 = new PanelArticle(this, "Tech", "Parsing_ifc_file");
                    p.add();
                    // p1.add();
                    this.panelIds.push(p.id);
                    // this.panelIds.push(p1.id);
                    console.log("canvas made");
                    this.switchToPanel(this.panelIds[0]);
                };
                Canvas.prototype.nextPage = function () {
                    console.log("clicked next");
                    var ind = this.panelIds.indexOf(this.currentDisplayedPanelId);
                    console.log(ind);
                    if (ind < this.panelIds.length - 1) {
                        ind = ind + 1;
                    }
                    this.switchToPanel(this.panelIds[ind]);
                };
                Canvas.prototype.previousPage = function () {
                    console.log("clicked prev");
                    var ind = this.panelIds.indexOf(this.currentDisplayedPanelId);
                    console.log(ind);
                    if (ind > 0) {
                        ind = ind - 1;
                    }
                    this.switchToPanel(this.panelIds[ind]);
                };
                Canvas.prototype.switchToPanel = function (id) {
                    if (this.currentDisplayedPanelId) {
                        var el_1 = document.getElementById(this.currentDisplayedPanelId);
                        if (el_1) {
                            el_1.style.display = "none";
                        }
                    }
                    var el = document.getElementById(id);
                    if (el) {
                        el.style.display = "grid"; //flex
                    }
                    this.currentDisplayedPanelId = id;
                };
                return Canvas;
            }());
            exports_8("Canvas", Canvas);
        }
    };
});
System.register("uiElements", ["uuid", "constants"], function (exports_9, context_9) {
    "use strict";
    var uuid, constants_7, PanelElement, PanelText, Pane, PanelButton, Panel, PanelImage;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (uuid_2) {
                uuid = uuid_2;
            },
            function (constants_7_1) {
                constants_7 = constants_7_1;
            }
        ],
        execute: function () {
            PanelElement = /** @class */ (function () {
                function PanelElement(id, css, classname) {
                    if (id === void 0) { id = null; }
                    if (css === void 0) { css = []; }
                    if (classname === void 0) { classname = null; }
                    this.id = id ? id : uuid.v4();
                    this.css = css;
                    this.elementType = "div";
                    this.className = classname;
                }
                PanelElement.prototype.createElement = function () {
                    var el = document.createElement(this.elementType);
                    return el;
                };
                PanelElement.prototype.add = function (parentId) {
                    if (parentId === void 0) { parentId = ""; }
                    var el = this.createElement();
                    if (el != null) {
                        el.id = this.id;
                        if (this.className) {
                            el.className = this.className;
                        }
                        this.css.forEach(function (x) {
                            el.style.setProperty(x.tag, x.value);
                        });
                        this.appendElement(parentId, el);
                        this.postprocess(el);
                    }
                };
                PanelElement.prototype.appendElement = function (parentId, child) {
                    var parent = document.getElementById(parentId);
                    if (parent) {
                        parent.appendChild(child);
                    }
                };
                PanelElement.prototype.postprocess = function (el) { };
                return PanelElement;
            }());
            exports_9("PanelElement", PanelElement);
            PanelText = /** @class */ (function (_super) {
                __extends(PanelText, _super);
                function PanelText(text, classname, id) {
                    if (classname === void 0) { classname = null; }
                    if (id === void 0) { id = null; }
                    var _this = _super.call(this, id, [], classname) || this;
                    _this.text = text;
                    _this.elementType = "p";
                    return _this;
                }
                PanelText.prototype.createElement = function () {
                    var el = document.createElement(this.elementType);
                    el.innerHTML = this.text;
                    el.id = this.id;
                    return el;
                };
                return PanelText;
            }(PanelElement));
            exports_9("PanelText", PanelText);
            Pane = /** @class */ (function (_super) {
                __extends(Pane, _super);
                function Pane(parentId, classname, parent) {
                    if (classname === void 0) { classname = null; }
                    if (parent === void 0) { parent = null; }
                    var _this = _super.call(this, null, [], classname) || this;
                    _this.parent = parent;
                    _this.parentId = parentId;
                    return _this;
                }
                Pane.prototype.getElements = function () {
                    return [];
                };
                Pane.prototype.add = function () {
                    var _this = this;
                    var pane = document.createElement("div");
                    pane.id = this.id;
                    if (this.className) {
                        pane.className = this.className;
                    }
                    var rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(pane);
                    }
                    else {
                        console.log("Could not create ".concat("pane"));
                        return;
                    }
                    var elements = this.getElements();
                    elements.forEach(function (el) {
                        el.add(_this.id);
                    });
                    this.postprocess(pane);
                };
                return Pane;
            }(PanelElement));
            exports_9("Pane", Pane);
            PanelButton = /** @class */ (function (_super) {
                __extends(PanelButton, _super);
                function PanelButton(label, onclickFn, classname, css, disabled) {
                    if (classname === void 0) { classname = null; }
                    if (css === void 0) { css = []; }
                    if (disabled === void 0) { disabled = false; }
                    var _this = _super.call(this, null, css, classname) || this;
                    _this.label = label;
                    _this.onclickFn = onclickFn;
                    _this.elementType = "button";
                    _this.disabled = disabled;
                    if (!_this.className) {
                        _this.className = "button";
                    }
                    return _this;
                }
                PanelButton.prototype.createElement = function () {
                    var el = document.createElement("button");
                    el.innerHTML = this.label;
                    el.onclick = this.onclickFn;
                    if (this.disabled) {
                        el.disabled = true;
                    }
                    return el;
                };
                return PanelButton;
            }(PanelElement));
            exports_9("PanelButton", PanelButton);
            Panel = /** @class */ (function () {
                function Panel(id, parent) {
                    if (id === void 0) { id = null; }
                    this.id = id ? id : uuid.v4();
                    this.classname = "panel";
                    this.parent = parent;
                    this.parentId = constants_7.constants.ROOT_CLASSNAME;
                }
                Panel.prototype.getElements = function () {
                    return new Promise(function (res) { return res([]); });
                    ;
                };
                Panel.prototype.add = function () {
                    var _this = this;
                    var panel = document.createElement("div");
                    panel.id = this.id;
                    panel.className = this.classname;
                    var rootElement = document.getElementById(this.parentId);
                    if (rootElement) {
                        rootElement.append(panel);
                    }
                    else {
                        console.log("Could not create ".concat(this.classname));
                        return;
                    }
                    panel.style.display = "none";
                    this.getElements().then(function (elements) { return elements.forEach(function (el) {
                        el.add(_this.id);
                    }); });
                    this.postActions();
                };
                Panel.prototype.postActions = function () { };
                return Panel;
            }());
            exports_9("Panel", Panel);
            PanelImage = /** @class */ (function (_super) {
                __extends(PanelImage, _super);
                function PanelImage(id, src, css, classname, onchangeFn) {
                    if (css === void 0) { css = []; }
                    if (classname === void 0) { classname = null; }
                    if (onchangeFn === void 0) { onchangeFn = null; }
                    var _this = _super.call(this, id, css, classname) || this;
                    _this.src = src;
                    _this.elementType = "img";
                    _this.onchangeFn = onchangeFn;
                    return _this;
                }
                PanelImage.prototype.createElement = function () {
                    var img = document.createElement("img");
                    img.id = this.id;
                    img.src = this.src;
                    img.onclick = this.onchangeFn;
                    return img;
                };
                return PanelImage;
            }(PanelElement));
            exports_9("PanelImage", PanelImage);
        }
    };
});
System.register("section", ["uiElements"], function (exports_10, context_10) {
    "use strict";
    var uiElements_2, SECTIONS, ARTICLES, Section, Article;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (uiElements_2_1) {
                uiElements_2 = uiElements_2_1;
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
            Section = /** @class */ (function (_super) {
                __extends(Section, _super);
                function Section(parentId, classname, name, onChangefn) {
                    if (classname === void 0) { classname = null; }
                    if (onChangefn === void 0) { onChangefn = function () { }; }
                    var _this = _super.call(this, parentId, classname, null) || this;
                    _this.name = name;
                    _this.onChangefn = onChangefn;
                    return _this;
                }
                Section.prototype.postprocess = function (el) {
                    el.onclick = this.onChangefn;
                };
                return Section;
            }(uiElements_2.Pane));
            exports_10("Section", Section);
            Article = /** @class */ (function (_super) {
                __extends(Article, _super);
                function Article() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Article;
            }(Section));
            exports_10("Article", Article);
        }
    };
});
System.register("main", ["canvas"], function (exports_11, context_11) {
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
