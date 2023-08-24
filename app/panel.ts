import { constants } from "./constants";
enum PANELS{
    HOME,
    SECTION,
    ARTICLE
}

const PanelMap = new Map<PANELS, string>([
    [PANELS.HOME, `${constants.SERVERURL}/${constants.HOME_PAGE_END}`],
    [PANELS.ARTICLE, `${constants.SERVERURL}/${constants.ARTICLE_PAGE_END}`],
    [PANELS.SECTION, `${constants.SERVERURL}/${constants.SECTION_PAGE_END}`]
]

);
export{PANELS, PanelMap}