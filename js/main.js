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
                ROOT_CLASSNAME: "root",
                SERVERURL: "https://get-uuklxqul3q-uc.a.run.app/",
                PANEL_ID_START: uuid.v4()
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
                }
                ServerRequest.prototype.call = function () {
                    return this.request();
                };
                ServerRequest.prototype.getBaseUrl = function () {
                    return constants_1.constants.SERVERURL;
                };
                ServerRequest.prototype.getUrl = function () {
                    var query = this.getQuery();
                    if (query == "") {
                        return this.getBaseUrl();
                    }
                    return "".concat(this.getBaseUrl(), "?").concat(query);
                };
                ServerRequest.prototype.getQuery = function () {
                    return "name=".concat(this.params);
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
System.register("article", ["marked", "request"], function (exports_3, context_3) {
    "use strict";
    var marked_1, request_1, ArticleRenderer;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (marked_1_1) {
                marked_1 = marked_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            }
        ],
        execute: function () {
            ArticleRenderer = /** @class */ (function () {
                function ArticleRenderer() {
                }
                ArticleRenderer.make = function (content) {
                    if (localStorage.getItem(content) != null) {
                        console.log("cached");
                        return new Promise(function (res) { return res(localStorage.getItem(content)); });
                    }
                    var s = new request_1.ServerRequest(content);
                    return s.call().then(function (r) {
                        var res = marked_1.marked.parse(r["content"]);
                        localStorage.setItem(content, res);
                        console.log("set local storage element");
                        return res;
                    });
                };
                return ArticleRenderer;
            }());
            exports_3("ArticleRenderer", ArticleRenderer);
        }
    };
});
System.register("panel", ["constants", "uiElements", "section", "article"], function (exports_4, context_4) {
    "use strict";
    var constants_2, uiElements_1, section_1, article_1, PanelStart;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (constants_2_1) {
                constants_2 = constants_2_1;
            },
            function (uiElements_1_1) {
                uiElements_1 = uiElements_1_1;
            },
            function (section_1_1) {
                section_1 = section_1_1;
            },
            function (article_1_1) {
                article_1 = article_1_1;
            }
        ],
        execute: function () {
            PanelStart = /** @class */ (function (_super) {
                __extends(PanelStart, _super);
                function PanelStart(parent) {
                    var _this = this;
                    var id = constants_2.constants.PANEL_ID_START;
                    _this = _super.call(this, id, parent) || this;
                    return _this;
                }
                PanelStart.prototype.getElements = function () {
                    var _this = this;
                    return article_1.ArticleRenderer.make("gcp_resources").then(function (r) { return [
                        new section_1.Article(_this.id, "article"),
                        new uiElements_1.PanelText(r, "articletext")
                    ]; });
                };
                return PanelStart;
            }(uiElements_1.Panel));
            exports_4("PanelStart", PanelStart);
        }
    };
});
System.register("canvas", ["panel"], function (exports_5, context_5) {
    "use strict";
    var panel_1, Canvas;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (panel_1_1) {
                panel_1 = panel_1_1;
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function () {
                function Canvas() {
                    this.currentDisplayedPanelId = "";
                    this.panelIds = [];
                }
                Canvas.prototype.make = function () {
                    //this.switchToPanel(this.panelIds[0]);
                    var p = new panel_1.PanelStart(this);
                    p.add();
                    this.panelIds.push(p.id);
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
                        el.style.display = "flex";
                    }
                    this.currentDisplayedPanelId = id;
                };
                return Canvas;
            }());
            exports_5("Canvas", Canvas);
        }
    };
});
System.register("uiElements", ["uuid", "constants"], function (exports_6, context_6) {
    "use strict";
    var uuid, constants_3, PanelElement, PanelText, Pane, PanelButton, Panel, PanelImage;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (uuid_2) {
                uuid = uuid_2;
            },
            function (constants_3_1) {
                constants_3 = constants_3_1;
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
            exports_6("PanelElement", PanelElement);
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
            exports_6("PanelText", PanelText);
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
            exports_6("Pane", Pane);
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
            exports_6("PanelButton", PanelButton);
            Panel = /** @class */ (function () {
                function Panel(id, parent) {
                    if (id === void 0) { id = null; }
                    this.id = id ? id : uuid.v4();
                    this.classname = "panel";
                    this.parent = parent;
                    this.parentId = constants_3.constants.ROOT_CLASSNAME;
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
            exports_6("Panel", Panel);
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
            exports_6("PanelImage", PanelImage);
        }
    };
});
System.register("section", ["uiElements"], function (exports_7, context_7) {
    "use strict";
    var uiElements_2, SECTIONS, ARTICLES, Section, Article;
    var __moduleName = context_7 && context_7.id;
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
            Section = /** @class */ (function () {
                function Section(id, name) {
                    this.id = id;
                    this.name = name;
                }
                Section.prototype.run = function () {
                    console.log("section " + this.name);
                };
                return Section;
            }());
            exports_7("Section", Section);
            Article = /** @class */ (function (_super) {
                __extends(Article, _super);
                function Article() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Article;
            }(uiElements_2.Pane));
            exports_7("Article", Article);
        }
    };
});
System.register("main", ["section", "canvas"], function (exports_8, context_8) {
    "use strict";
    var section_2, canvas_1, s, c;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (section_2_1) {
                section_2 = section_2_1;
            },
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            }
        ],
        execute: function () {
            console.log("Hey");
            s = new section_2.Section("123", "newsection");
            c = new canvas_1.Canvas();
            c.make();
            s.run();
        }
    };
});
