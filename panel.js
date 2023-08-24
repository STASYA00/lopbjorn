"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelMap = exports.PANELS = void 0;
const constants_1 = require("./constants");
var PANELS;
(function (PANELS) {
    PANELS[PANELS["HOME"] = 0] = "HOME";
    PANELS[PANELS["SECTION"] = 1] = "SECTION";
    PANELS[PANELS["ARTICLE"] = 2] = "ARTICLE";
})(PANELS || (exports.PANELS = PANELS = {}));
const PanelMap = new Map([
    [PANELS.HOME, `${constants_1.constants.SERVERURL}/${constants_1.constants.HOME_PAGE_END}`],
    [PANELS.ARTICLE, `${constants_1.constants.SERVERURL}/${constants_1.constants.ARTICLE_PAGE_END}`],
    [PANELS.SECTION, `${constants_1.constants.SERVERURL}/${constants_1.constants.SECTION_PAGE_END}`]
]);
exports.PanelMap = PanelMap;
