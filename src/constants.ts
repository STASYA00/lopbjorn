import * as uuid from "uuid";

export const constants = {
    ROOT_CLASSNAME: "root" as string,
    ARTICLE_CLASSNAME: "article" as string,
    SECTION_CLASSNAME: "section" as string,

    SERVERURL: "https://get-uuklxqul3q-uc.a.run.app/" as string,
    STRUCTURE_URL: "https://get-structure-uuklxqul3q-uc.a.run.app/" as string,
    RESPONSE_PARSE_KEY: "content" as string,
    
    PANEL_ID_START: uuid.v4(),
    PANEL_ID_ARTICLE: uuid.v4(),

    CACHE_KEY_STRUCTURE: "Blog_Structure" as string,

    LOCAL_STORAGE: false as boolean,

}