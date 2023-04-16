import * as uuid from "uuid";

const PANEL_ID_START =uuid.v4();
const PANEL_ID_ARTICLE =uuid.v4();
const PANEL_ID_NOTFOUND =uuid.v4();

export const constants = {
    HOME_URL: "https://stasya00.github.io/lopbjorn" as string,
    SITE_NAME: "Lopbjorn, Stasja Fedorova's personal blog",
    ARTICLE_HTML: "html/article.html" as string,
    ROOT_CLASSNAME: "root" as string,
    ARTICLE_CLASSNAME: "article" as string,
    SECTION_CLASSNAME: "section" as string,

    SERVERURL: "https://get-uuklxqul3q-uc.a.run.app/" as string,
    STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/" as string,
    ARTICLEEXISTS_URL: "https://article-exists-uuklxqul3q-uc.a.run.app/" as string,
    RESPONSE_PARSE_KEY: "content" as string,
    
    CACHE_KEY_STRUCTURE: "Blog_Structure" as string,

    LOCAL_STORAGE: true as boolean,

}
export {PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND, PANEL_ID_START}