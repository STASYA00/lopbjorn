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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
System.register("constants", ["uuid"], function (exports_1, context_1) {
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
                SERVERURL: "https://get-uuklxqul3q-uc1.a.run.app/",
                STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/",
                ARTICLEEXISTS_URL: "https://article-exists-uuklxqul3q-uc.a.run.app/",
                RESPONSE_PARSE_KEY: "content",
                NOTFOUND: uuid.v4(),
                CACHE_KEY_STRUCTURE: "Blog_Structure",
                LOCAL_STORAGE: true
            });
        }
    };
});
System.register("urlManager", ["constants"], function (exports_2, context_2) {
    "use strict";
    var constants_1, HTMLFilesEnum, urlManager;
    var __moduleName = context_2 && context_2.id;
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
            exports_2("HTMLFilesEnum", HTMLFilesEnum);
            urlManager = /** @class */ (function () {
                function urlManager() {
                }
                urlManager.getCurrentURL = function () {
                    return window.location.href;
                };
                urlManager.redirectURL = function (url) {
                    if (url === void 0) { url = constants_1.constants.HOME_URL; }
                    console.log("redirecting from ".concat(urlManager.getCurrentURL(), " to ").concat(url));
                    if (urlManager.getCurrentURL() != url && urlManager.getCurrentURL() != url + "/"
                        && urlManager.getCurrentURL() + "/" != url) {
                        console.log("executing redirect");
                        return window.location.replace(url);
                    }
                };
                urlManager.redirectLocalURL = function (toHome, article) {
                    if (toHome === void 0) { toHome = true; }
                    var new_url = toHome ? this.getCurrentURL().replace(HTMLFilesEnum.ERROR, HTMLFilesEnum.HOME) :
                        "".concat(this.getCurrentURL().replace(HTMLFilesEnum.HOME, HTMLFilesEnum.ERROR), "/").concat(article);
                    console.log(new_url);
                    if (new_url == this.getCurrentURL()) {
                        return;
                    }
                    return this.redirectURL(new_url);
                };
                urlManager.rewriteURL = function (endpoint) {
                    if (endpoint === void 0) { endpoint = ""; }
                    if (!this.runsLocally()) {
                        history.pushState({ "name": "lopbjorn" }, "", endpoint);
                    }
                    return "".concat(constants_1.constants.HOME_URL, "/").concat(endpoint) == this.getCurrentURL();
                };
                urlManager.runsLocally = function () {
                    return window.location.protocol == 'file:';
                };
                return urlManager;
            }());
            exports_2("urlManager", urlManager);
        }
    };
});
System.register("404/tagManager", [], function (exports_3, context_3) {
    "use strict";
    var _a, TagManager, TagFactory, TAGTYPES, TAGS, TagIterator, LANGUAGES, PAGETYPES, tagDict;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            TagManager = /** @class */ (function () {
                function TagManager() {
                    this.attr = "content";
                    this.collection = {};
                    this.load();
                }
                TagManager.prototype.load = function () {
                    for (var _i = 0, _a = TagIterator.run(); _i < _a.length; _i++) {
                        var tag = _a[_i];
                        this.collection[tag] = TagFactory.make(tag);
                    }
                };
                TagManager.prototype.updateTag = function (tagT, content) {
                    var tag = this.collection[tagT];
                    var query = document.querySelector("meta[".concat(tag.property, "=\"").concat(tag.name, "\"]"));
                    if (query) {
                        query.setAttribute(this.attr, content);
                        return true;
                    }
                    var t = document.createElement("meta");
                    t.setAttribute(tag.property, tag.name);
                    t.setAttribute(this.attr, content);
                    document.getElementsByTagName("head")[0].appendChild(t);
                    return true;
                };
                return TagManager;
            }());
            exports_3("TagManager", TagManager);
            TagFactory = /** @class */ (function () {
                function TagFactory() {
                }
                TagFactory.make = function (tag) {
                    return { "name": tag, "property": tagDict[tag] };
                };
                return TagFactory;
            }());
            TAGTYPES = {
                NAME: "name",
                PROPERTY: "property"
            };
            (function (TAGS) {
                TAGS["DESCR"] = "description";
                TAGS["KEYWORDS"] = "keywords";
                TAGS["TITLE"] = "og:title";
                TAGS["TYPE"] = "og:type";
                TAGS["IMAGE"] = "og:image";
                TAGS["URL"] = "og:url";
                TAGS["SITE_NAME"] = "og:site_name";
                TAGS["LOCALE"] = "og:locale";
            })(TAGS || (TAGS = {}));
            exports_3("TAGS", TAGS);
            TagIterator = /** @class */ (function () {
                function TagIterator() {
                }
                TagIterator.run = function () {
                    // embarassing piece of code
                    return [TAGS.DESCR, TAGS.KEYWORDS, TAGS.LOCALE,
                        TAGS.IMAGE, TAGS.SITE_NAME, TAGS.TITLE, TAGS.TYPE, TAGS.URL];
                };
                return TagIterator;
            }());
            exports_3("TagIterator", TagIterator);
            (function (LANGUAGES) {
                LANGUAGES["ENG"] = "en_GB";
                LANGUAGES["IT"] = "it_IT";
                LANGUAGES["SE"] = "sv_SE";
                LANGUAGES["RU"] = "ru_RU";
            })(LANGUAGES || (LANGUAGES = {}));
            exports_3("LANGUAGES", LANGUAGES);
            (function (PAGETYPES) {
                PAGETYPES["ARTICLE"] = "article";
                PAGETYPES["WEBSITE"] = "website";
                PAGETYPES["PROFILE"] = "profile";
            })(PAGETYPES || (PAGETYPES = {}));
            exports_3("PAGETYPES", PAGETYPES);
            tagDict = (_a = {},
                _a[TAGS.DESCR] = TAGTYPES.NAME,
                _a[TAGS.KEYWORDS] = TAGTYPES.NAME,
                _a[TAGS.LOCALE] = TAGTYPES.NAME,
                _a[TAGS.SITE_NAME] = TAGTYPES.NAME,
                _a[TAGS.TITLE] = TAGTYPES.PROPERTY,
                _a[TAGS.TYPE] = TAGTYPES.PROPERTY,
                _a[TAGS.IMAGE] = TAGTYPES.PROPERTY,
                _a[TAGS.URL] = TAGTYPES.PROPERTY,
                _a);
        }
    };
});
System.register("404/tagsetter", ["404/tagManager", "urlManager", "constants"], function (exports_4, context_4) {
    "use strict";
    var _a, tagManager_1, urlManager_1, constants_2, TagSetterFactory, TagSetter, TagSetterLang, TagSetterKwrds, TagSetterDescr, TagSetterImage, TagSetterTitle, TagSetterURL, TagSetterType, TagSetterSitename, tagsettersdict;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (tagManager_1_1) {
                tagManager_1 = tagManager_1_1;
            },
            function (urlManager_1_1) {
                urlManager_1 = urlManager_1_1;
            },
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }
        ],
        execute: function () {
            TagSetterFactory = /** @class */ (function () {
                function TagSetterFactory() {
                    var _a;
                    this.content = (_a = {},
                        _a[tagManager_1.TAGS.URL] = TagSetterURL,
                        _a[tagManager_1.TAGS.DESCR] = TagSetterDescr,
                        _a[tagManager_1.TAGS.IMAGE] = TagSetterImage,
                        _a[tagManager_1.TAGS.KEYWORDS] = TagSetterKwrds,
                        _a[tagManager_1.TAGS.LOCALE] = TagSetterLang,
                        _a[tagManager_1.TAGS.SITE_NAME] = TagSetterSitename,
                        _a[tagManager_1.TAGS.TITLE] = TagSetterTitle,
                        _a[tagManager_1.TAGS.TYPE] = TagSetterType,
                        _a);
                }
                TagSetterFactory.prototype.make = function (tag) {
                    return new this.content[tag](tag);
                };
                return TagSetterFactory;
            }());
            exports_4("TagSetterFactory", TagSetterFactory);
            TagSetter = /** @class */ (function () {
                function TagSetter(tag) {
                    this.tag = tag;
                }
                TagSetter.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return "";
                };
                return TagSetter;
            }());
            exports_4("TagSetter", TagSetter);
            TagSetterLang = /** @class */ (function (_super) {
                __extends(TagSetterLang, _super);
                function TagSetterLang(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.LOCALE; }
                    return _super.call(this, tag) || this;
                }
                TagSetterLang.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return tagManager_1.LANGUAGES.SE;
                };
                return TagSetterLang;
            }(TagSetter));
            TagSetterKwrds = /** @class */ (function (_super) {
                __extends(TagSetterKwrds, _super);
                function TagSetterKwrds(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.KEYWORDS; }
                    return _super.call(this, tag) || this;
                }
                TagSetterKwrds.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return "tech, article, ifc, parsing";
                };
                return TagSetterKwrds;
            }(TagSetter));
            TagSetterDescr = /** @class */ (function (_super) {
                __extends(TagSetterDescr, _super);
                // IDEA: take intro from each article's readme - first stycke
                function TagSetterDescr(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.KEYWORDS; }
                    return _super.call(this, tag) || this;
                }
                TagSetterDescr.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return "test description";
                };
                return TagSetterDescr;
            }(TagSetter));
            TagSetterImage = /** @class */ (function (_super) {
                __extends(TagSetterImage, _super);
                function TagSetterImage(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.IMAGE; }
                    return _super.call(this, tag) || this;
                }
                TagSetterImage.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return "image.png";
                };
                return TagSetterImage;
            }(TagSetter));
            TagSetterTitle = /** @class */ (function (_super) {
                __extends(TagSetterTitle, _super);
                function TagSetterTitle(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.TITLE; }
                    return _super.call(this, tag) || this;
                }
                TagSetterTitle.prototype.get = function (id, article) {
                    return article;
                };
                return TagSetterTitle;
            }(TagSetter));
            TagSetterURL = /** @class */ (function (_super) {
                __extends(TagSetterURL, _super);
                function TagSetterURL(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.URL; }
                    return _super.call(this, tag) || this;
                }
                TagSetterURL.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return urlManager_1.urlManager.getCurrentURL();
                };
                return TagSetterURL;
            }(TagSetter));
            TagSetterType = /** @class */ (function (_super) {
                __extends(TagSetterType, _super);
                function TagSetterType(tag) {
                    var _a;
                    if (tag === void 0) { tag = tagManager_1.TAGS.TYPE; }
                    var _this = _super.call(this, tag) || this;
                    _this.pagetypes = (_a = {},
                        _a[constants_2.PANEL_ID_START] = tagManager_1.PAGETYPES.WEBSITE,
                        _a[constants_2.PANEL_ID_ARTICLE] = tagManager_1.PAGETYPES.ARTICLE,
                        _a[constants_2.PANEL_ID_NOTFOUND] = tagManager_1.PAGETYPES.ARTICLE,
                        _a);
                    return _this;
                }
                TagSetterType.prototype.get = function (id, article) {
                    if (article === void 0) { article = ""; }
                    return this.pagetypes[id];
                };
                return TagSetterType;
            }(TagSetter));
            TagSetterSitename = /** @class */ (function (_super) {
                __extends(TagSetterSitename, _super);
                function TagSetterSitename(tag) {
                    if (tag === void 0) { tag = tagManager_1.TAGS.SITE_NAME; }
                    return _super.call(this, tag) || this;
                }
                TagSetterSitename.prototype.get = function (id, article) {
                    if (id === void 0) { id = ""; }
                    if (article === void 0) { article = ""; }
                    return constants_2.constants.SITE_NAME;
                };
                return TagSetterSitename;
            }(TagSetter));
            tagsettersdict = (_a = {},
                _a[tagManager_1.TAGS.URL] = TagSetterURL,
                _a[tagManager_1.TAGS.DESCR] = TagSetterDescr,
                _a[tagManager_1.TAGS.IMAGE] = TagSetterImage,
                _a[tagManager_1.TAGS.KEYWORDS] = TagSetterKwrds,
                _a[tagManager_1.TAGS.LOCALE] = TagSetterLang,
                _a[tagManager_1.TAGS.SITE_NAME] = TagSetterSitename,
                _a[tagManager_1.TAGS.TITLE] = TagSetterTitle,
                _a[tagManager_1.TAGS.TYPE] = TagSetterType,
                _a);
            exports_4("tagsettersdict", tagsettersdict);
        }
    };
});
System.register("404/pageTagger", ["constants", "404/tagManager", "404/tagsetter"], function (exports_5, context_5) {
    "use strict";
    var constants_3, tagManager_2, tagsetter_1, PageTagger;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (tagManager_2_1) {
                tagManager_2 = tagManager_2_1;
            },
            function (tagsetter_1_1) {
                tagsetter_1 = tagsetter_1_1;
            }
        ],
        execute: function () {
            PageTagger = /** @class */ (function () {
                function PageTagger(panelId, name) {
                    if (panelId === void 0) { panelId = constants_3.PANEL_ID_START; }
                    if (name === void 0) { name = ""; }
                    this.id = panelId;
                    this.name = name;
                    this.factory = new tagsetter_1.TagSetterFactory();
                    this.tags = {};
                    this.tagsetters = {};
                    this.init();
                }
                PageTagger.prototype.init = function () {
                    var a = Object.getOwnPropertyDescriptors(tagManager_2.TAGS);
                    for (var _i = 0, _a = tagManager_2.TagIterator.run(); _i < _a.length; _i++) {
                        var tag = _a[_i];
                        this.tagsetters[tag] = this.factory.make(tag);
                    }
                };
                PageTagger.prototype.make = function (id, article) {
                    if (article === void 0) { article = ""; }
                    this.setData(id, article);
                    for (var _i = 0, _a = tagManager_2.TagIterator.run(); _i < _a.length; _i++) {
                        var tag = _a[_i];
                        this.tags[tag] = this.tagsetters[tag].get(this.id, this.name);
                    }
                };
                PageTagger.prototype.getContent = function () {
                    var _tags = __assign({}, this.tags);
                    return _tags;
                };
                PageTagger.prototype.setName = function (article) {
                    this.name = article;
                };
                PageTagger.prototype.setPage = function (id) {
                    this.id = id;
                };
                PageTagger.prototype.setData = function (id, article) {
                    this.name = article;
                    this.id = id;
                };
                return PageTagger;
            }());
            exports_5("PageTagger", PageTagger);
        }
    };
});
System.register("404/pageTagAssigner", ["constants", "404/pageTagger", "404/tagManager"], function (exports_6, context_6) {
    "use strict";
    var constants_4, pageTagger_1, tagManager_3, PageTagAssigner;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (pageTagger_1_1) {
                pageTagger_1 = pageTagger_1_1;
            },
            function (tagManager_3_1) {
                tagManager_3 = tagManager_3_1;
            }
        ],
        execute: function () {
            PageTagAssigner = /** @class */ (function () {
                function PageTagAssigner() {
                    this.tagger = new pageTagger_1.PageTagger();
                    this.manager = new tagManager_3.TagManager();
                }
                PageTagAssigner.prototype.make = function (id, article) {
                    if (id === void 0) { id = constants_4.PANEL_ID_START; }
                    if (article === void 0) { article = constants_4.constants.SITE_NAME; }
                    this.tagger.make(id, article);
                    var result = this.tagger.getContent();
                    for (var _i = 0, _a = tagManager_3.TagIterator.run(); _i < _a.length; _i++) {
                        var tag = _a[_i];
                        this.manager.updateTag(tag, result[tag]);
                    }
                };
                return PageTagAssigner;
            }());
            exports_6("PageTagAssigner", PageTagAssigner);
        }
    };
});
System.register("uiElements", ["uuid", "constants"], function (exports_7, context_7) {
    "use strict";
    var uuid, constants_5, PanelElement, PanelText, Pane, PanelButton, Panel, PanelImage;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (uuid_2) {
                uuid = uuid_2;
            },
            function (constants_5_1) {
                constants_5 = constants_5_1;
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
            exports_7("PanelElement", PanelElement);
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
            exports_7("PanelText", PanelText);
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
            exports_7("Pane", Pane);
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
            exports_7("PanelButton", PanelButton);
            Panel = /** @class */ (function () {
                function Panel(id, parent) {
                    if (id === void 0) { id = null; }
                    this.id = id ? id : uuid.v4();
                    this.classname = "panel";
                    this.parent = parent;
                    this.parentId = constants_5.constants.ROOT_CLASSNAME;
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
            exports_7("Panel", Panel);
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
            exports_7("PanelImage", PanelImage);
        }
    };
});
System.register("section", ["uiElements"], function (exports_8, context_8) {
    "use strict";
    var uiElements_1, SECTIONS, ARTICLES, Section, Article;
    var __moduleName = context_8 && context_8.id;
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
            }(uiElements_1.Pane));
            exports_8("Section", Section);
            Article = /** @class */ (function (_super) {
                __extends(Article, _super);
                function Article() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Article;
            }(Section));
            exports_8("Article", Article);
        }
    };
});
System.register("request", ["constants"], function (exports_9, context_9) {
    "use strict";
    var constants_6, ServerRequest;
    var __moduleName = context_9 && context_9.id;
    function sleep(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    return {
        setters: [
            function (constants_6_1) {
                constants_6 = constants_6_1;
            }
        ],
        execute: function () {
            ServerRequest = /** @class */ (function () {
                function ServerRequest(params, url) {
                    this.params = params;
                    this.method = "POST";
                    this.url = url ? url : constants_6.constants.SERVERURL;
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
            exports_9("ServerRequest", ServerRequest);
        }
    };
});
System.register("structure", ["constants", "request"], function (exports_10, context_10) {
    "use strict";
    var constants_7, request_1, test_structure, BlogStructure, SectionStructure;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (constants_7_1) {
                constants_7 = constants_7_1;
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
                    var _this = this;
                    var s = new request_1.ServerRequest("");
                    s.url = constants_7.constants.STRUCTURE_URL;
                    return s.call().then(function (r) {
                        var res = r[constants_7.constants.RESPONSE_PARSE_KEY];
                        for (var r_1 in res) {
                            var structure = new SectionStructure(r_1);
                            structure.add(res[r_1]);
                            _this.sections.push(structure);
                        }
                        // make sections
                        localStorage.setItem(constants_7.constants.CACHE_KEY_STRUCTURE, res);
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
            exports_10("BlogStructure", BlogStructure);
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
System.register("articleRenderer", ["marked", "constants", "request"], function (exports_11, context_11) {
    "use strict";
    var marked_1, constants_8, request_2, ArticleRenderer;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (marked_1_1) {
                marked_1 = marked_1_1;
            },
            function (constants_8_1) {
                constants_8 = constants_8_1;
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
                        var res = marked_1.marked.parse(r[constants_8.constants.RESPONSE_PARSE_KEY]);
                        localStorage.setItem(content, res);
                        return res;
                    });
                };
                ArticleRenderer.makeArticleInterface = function (section, name) {
                    return { "section": section, "name": name };
                };
                ArticleRenderer.make = function (section, name) {
                    if (constants_8.constants.LOCAL_STORAGE) {
                        if (localStorage.getItem(name) != null) {
                            return new Promise(function (res) { return res(localStorage.getItem(name)); });
                        }
                    }
                    var s = new request_2.ServerRequest(ArticleRenderer.makeArticleInterface(section, name));
                    return s.call().then(function (r) {
                        var res = marked_1.marked.parse(r[constants_8.constants.RESPONSE_PARSE_KEY]);
                        localStorage.setItem(name, res);
                        return res;
                    });
                };
                return ArticleRenderer;
            }());
            exports_11("ArticleRenderer", ArticleRenderer);
        }
    };
});
System.register("panel", ["constants", "uiElements", "section", "structure", "articleRenderer"], function (exports_12, context_12) {
    "use strict";
    var constants_9, uiElements_2, section_1, structure_1, articleRenderer_1, PanelStart, PanelArticle, PanelNotFound;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (constants_9_1) {
                constants_9 = constants_9_1;
            },
            function (uiElements_2_1) {
                uiElements_2 = uiElements_2_1;
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
                    return _super.call(this, constants_9.PANEL_ID_START, parent) || this;
                }
                PanelStart.prototype.getElements = function () {
                    var _this = this;
                    // return ArticleRenderer.make("gcp_resources").then(r => [
                    //   new Article(this.id, "article"),
                    //   new PanelText(r, "articletext")
                    // ]);
                    var structure = new structure_1.BlogStructure();
                    //structure.load_test();
                    return structure.load().then(function (r) {
                        var _sections = structure.getSections();
                        var _elements = [];
                        var _loop_2 = function (s) {
                            var _articles = _sections[s].getContent()[0];
                            _elements.push(new section_1.Section(_this.id, constants_9.constants.SECTION_CLASSNAME, _sections[s].name, function () {
                                console.log("Section", _sections[s].name, _sections[s].getContent());
                                _this.parent.switchToPanel(constants_9.PANEL_ID_ARTICLE);
                            }));
                            var _loop_3 = function (a) {
                                _elements.push(new section_1.Article(_this.id, constants_9.constants.ARTICLE_CLASSNAME, _articles[a], function () {
                                    _this.parent.switchToPanel(constants_9.PANEL_ID_ARTICLE, _sections[s].name, _articles[a]);
                                    console.log("Article", _articles[a]);
                                }));
                            };
                            for (var a = 0; a < _articles.length; a++) {
                                _loop_3(a);
                            }
                        };
                        for (var s = 0; s < _sections.length; s++) {
                            _loop_2(s);
                        }
                        return new Promise(function (res) { return res(_elements); });
                    });
                };
                return PanelStart;
            }(uiElements_2.Panel));
            exports_12("PanelStart", PanelStart);
            PanelArticle = /** @class */ (function (_super) {
                __extends(PanelArticle, _super);
                function PanelArticle(parent, section, article) {
                    var _this = _super.call(this, constants_9.PANEL_ID_ARTICLE, parent) || this;
                    _this.section = section;
                    _this.article = article;
                    _this.classname = "panelarticle";
                    return _this;
                }
                PanelArticle.prototype.getElements = function () {
                    console.log("Getting elements", this.section, this.article);
                    throw new Error();
                    return articleRenderer_1.ArticleRenderer.make(this.section, this.article).then(function (r) { return [
                        new uiElements_2.PanelText(r, "articletext")
                    ]; });
                };
                return PanelArticle;
            }(uiElements_2.Panel));
            exports_12("PanelArticle", PanelArticle);
            PanelNotFound = /** @class */ (function (_super) {
                __extends(PanelNotFound, _super);
                function PanelNotFound(parent) {
                    var _this = _super.call(this, constants_9.PANEL_ID_NOTFOUND, parent) || this;
                    _this.classname = "panelnotfound";
                    return _this;
                }
                PanelNotFound.prototype.getElements = function () {
                    return new Promise(function (res) { return res([
                        new uiElements_2.PanelText("ERROR 404")
                    ]); });
                };
                return PanelNotFound;
            }(uiElements_2.Panel));
            exports_12("PanelNotFound", PanelNotFound);
        }
    };
});
System.register("404/pageManager", ["marked", "constants", "urlManager", "404/pageTagAssigner", "panel", "request"], function (exports_13, context_13) {
    "use strict";
    var marked_2, constants_10, urlManager_2, pageTagAssigner_1, panel_1, request_3, PageManager;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (marked_2_1) {
                marked_2 = marked_2_1;
            },
            function (constants_10_1) {
                constants_10 = constants_10_1;
            },
            function (urlManager_2_1) {
                urlManager_2 = urlManager_2_1;
            },
            function (pageTagAssigner_1_1) {
                pageTagAssigner_1 = pageTagAssigner_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (request_3_1) {
                request_3 = request_3_1;
            }
        ],
        execute: function () {
            PageManager = /** @class */ (function () {
                function PageManager() {
                    this.assigner = new pageTagAssigner_1.PageTagAssigner();
                }
                PageManager.prototype.getArticle = function () {
                    var url = urlManager_2.urlManager.getCurrentURL();
                    url = url.endsWith("/") ? url.substring(0, url.length) : url;
                    return url.substring(url.lastIndexOf("/") + 1, url.length);
                };
                PageManager.prototype.isHome = function () {
                    console.log("Current url: ".concat(urlManager_2.urlManager.getCurrentURL()));
                    if (!urlManager_2.urlManager.runsLocally()) {
                        return (urlManager_2.urlManager.getCurrentURL() == constants_10.constants.HOME_URL) || (urlManager_2.urlManager.getCurrentURL() == constants_10.constants.HOME_URL + "/");
                    }
                    // check locally
                    return urlManager_2.urlManager.getCurrentURL().includes(urlManager_2.HTMLFilesEnum.HOME);
                };
                PageManager.prototype.articleExists = function (article) {
                    var s = new request_3.ServerRequest({ "name": article }, constants_10.constants.ARTICLEEXISTS_URL);
                    return s.call().then(function (r) {
                        console.log("RESPONSE:", r);
                        console.log(r[constants_10.constants.RESPONSE_PARSE_KEY]);
                        var res = marked_2.marked.parse(r[constants_10.constants.RESPONSE_PARSE_KEY]);
                        localStorage.setItem(article, res);
                        return res;
                    });
                };
                PageManager.prototype.start = function (canvas) {
                    var _this = this;
                    if (this.isHome()) {
                        console.log("Home panel");
                        this.assigner.make(constants_10.PANEL_ID_START, constants_10.constants.SITE_NAME);
                        return new Promise(function (res) { return res(new panel_1.PanelStart(canvas)); });
                    }
                    var article = this.getArticle();
                    return this.articleExists(article).then(function (res) {
                        console.log("result", res);
                        var section = "Tech";
                        try {
                            urlManager_2.urlManager.rewriteURL(article);
                        }
                        catch (e) {
                            console.log(e);
                            console.log("Local dev environment, no URL rewriting possible");
                        }
                        _this.assigner.make(constants_10.PANEL_ID_ARTICLE, article);
                        return new panel_1.PanelArticle(canvas, section, article);
                    });
                    // if (this.articleExists(article)){
                    //     let section = "Tech";
                    //     let article1 = "Parsing_ifc_file";
                    //     try{
                    //         urlManager.rewriteURL(article1);
                    //     }
                    //     catch (e){
                    //         console.log(e as Error);
                    //         console.log("Local dev environment, no URL rewriting possible");
                    //     }
                    //     this.assigner.make(PANEL_ID_ARTICLE, article);
                    //     return new PanelArticle(canvas, section, article);
                    // }
                    // this.assigner.make(PANEL_ID_ARTICLE, article);
                    // return new PanelNotFound(canvas);
                };
                PageManager.prototype["switch"] = function (canvas, section, article) {
                    if (urlManager_2.urlManager.runsLocally()) {
                        console.log(section == undefined);
                        return urlManager_2.urlManager.redirectLocalURL(section == undefined, article);
                    }
                    var new_url = constants_10.constants.HOME_URL;
                    if (article) {
                        new_url = "".concat(constants_10.constants.HOME_URL, "/").concat(article);
                    }
                    return urlManager_2.urlManager.redirectURL(new_url);
                };
                return PageManager;
            }());
            exports_13("PageManager", PageManager);
        }
    };
});
System.register("canvas", ["404/pageManager"], function (exports_14, context_14) {
    "use strict";
    var pageManager_1, PanelEnum, Canvas;
    var __moduleName = context_14 && context_14.id;
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
            exports_14("PanelEnum", PanelEnum);
            Canvas = /** @class */ (function () {
                function Canvas() {
                    this.currentDisplayedPanelId = "";
                    this.panelIds = [];
                    this.manager = new pageManager_1.PageManager();
                    console.log("canvas initiated");
                }
                Canvas.prototype.make = function () {
                    var _this = this;
                    //this.switchToPanel(this.panelIds[0]);
                    console.log("new canvas!");
                    this.manager.start(this).then(function (p) {
                        p.add();
                        _this.panelIds.push(p.id);
                        _this.switchToPanel(_this.panelIds[0]);
                    });
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
                Canvas.prototype.switchToPanel = function (id, section, article) {
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
                    this.manager["switch"](this, section, article);
                };
                return Canvas;
            }());
            exports_14("Canvas", Canvas);
        }
    };
});
System.register("main", ["canvas"], function (exports_15, context_15) {
    "use strict";
    var canvas_1, c;
    var __moduleName = context_15 && context_15.id;
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
