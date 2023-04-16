import {TAGS, EnumDictionary, LANGUAGES, PAGETYPES} from "./tagManager"
import { urlManager } from "../urlManager";
import { constants, PANEL_ID_START, PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND } from "../constants";

class TagSetterFactory{
    private content: EnumDictionary<TAGS, typeof TagSetter>;
    constructor(){
        this.content = {
            [TAGS.URL]: TagSetterURL,
            [TAGS.DESCR]: TagSetterDescr,
            [TAGS.IMAGE]: TagSetterImage,
            [TAGS.KEYWORDS]: TagSetterKwrds,
            [TAGS.LOCALE]: TagSetterLang,
            [TAGS.SITE_NAME]: TagSetterSitename,
            [TAGS.TITLE]: TagSetterTitle,
            [TAGS.TYPE]: TagSetterType,
        }
    }
    make(tag:TAGS): TagSetter{
        return new this.content[tag](tag);
    }
}


class TagSetter{
    readonly tag: TAGS;
    constructor(tag:TAGS){
        this.tag = tag
    }

    get(id:string="", article=""):string{return "" }
}

class TagSetterLang extends TagSetter{
    constructor(tag:TAGS=TAGS.LOCALE){
        super(tag);
    }
    get(id:string="", article=""): string {
        return LANGUAGES.SE;
    }
}
class TagSetterKwrds extends TagSetter{
    constructor(tag:TAGS=TAGS.KEYWORDS){
        super(tag);
    }
    get(id:string="", article=""): string {
        return "tech, article, ifc, parsing";
    }
}
class TagSetterDescr extends TagSetter{
    // IDEA: take intro from each article's readme - first stycke
    constructor(tag:TAGS=TAGS.KEYWORDS){
        super(tag);
    }
    get(id:string="", article=""): string {
        return "test description";
    }
}
class TagSetterImage extends TagSetter{
    constructor(tag:TAGS=TAGS.IMAGE){
        super(tag);
    }
    get(id:string="", article=""): string {
        return "image.png";
    }
}
class TagSetterTitle extends TagSetter{
    constructor(tag:TAGS=TAGS.TITLE){
        super(tag);
    }
    get(id:string, article:string): string {
        return article;
    }
}
class TagSetterURL extends TagSetter{
    constructor(tag:TAGS=TAGS.URL){
        super(tag);
    }
    get(id:string="", article=""): string {
        return urlManager.getCurrentURL();
    }
}
class TagSetterType extends TagSetter{
    readonly pagetypes: EnumDictionary<string, string>;
    constructor(tag:TAGS=TAGS.TYPE){
        super(tag);
        this.pagetypes = {
            PANEL_ID_START : PAGETYPES.WEBSITE, 
            PANEL_ID_ARTICLE : PAGETYPES.ARTICLE,
            PANEL_ID_NOTFOUND: PAGETYPES.ARTICLE
        }
    }
    get(id:string, article:string=""): string {
        return this.pagetypes[id];
    }
}
class TagSetterSitename extends TagSetter{
    constructor(tag:TAGS=TAGS.SITE_NAME){
        super(tag);
    }
    get(id:string="", article=""): string {
        return constants.SITE_NAME;
    }
}



const tagsettersdict = {
    [TAGS.URL]: TagSetterURL,
    [TAGS.DESCR]: TagSetterDescr,
    [TAGS.IMAGE]: TagSetterImage,
    [TAGS.KEYWORDS]: TagSetterKwrds,
    [TAGS.LOCALE]: TagSetterLang,
    [TAGS.SITE_NAME]: TagSetterSitename,
    [TAGS.TITLE]: TagSetterTitle,
    [TAGS.TYPE]: TagSetterType,
}

export {tagsettersdict, TagSetterFactory, TagSetter}