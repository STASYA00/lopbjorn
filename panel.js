"use strict";
exports.__esModule = true;
exports.PanelMap = exports.PANELS = void 0;
var constants_1 = require("./constants");
var PANELS;
(function (PANELS) {
    PANELS[PANELS["HOME"] = 0] = "HOME";
    PANELS[PANELS["SECTION"] = 1] = "SECTION";
    PANELS[PANELS["ARTICLE"] = 2] = "ARTICLE";
})(PANELS || (PANELS = {}));
exports.PANELS = PANELS;
var PanelMap = new Map([
    [PANELS.HOME, "".concat(constants_1.constants.SERVERURL, "/").concat(constants_1.constants.HOME_PAGE_END)],
    [PANELS.ARTICLE, "".concat(constants_1.constants.SERVERURL, "/").concat(constants_1.constants.ARTICLE_PAGE_END)],
    [PANELS.SECTION, "".concat(constants_1.constants.SERVERURL, "/").concat(constants_1.constants.SECTION_PAGE_END)]
]);
exports.PanelMap = PanelMap;
