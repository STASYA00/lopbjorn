type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

class TagManager{
    readonly attr: string;
    collection: EnumDictionary<string, Tag>;
    constructor(){
        this.attr = "content";
        this.collection = {};
        this.load();
    }

    private load(){
        
        for (let tag in TAGS){
            this.collection[tag] = TagFactory.make(tag);
        }
    }

    updateTag(tagT:string, content:string){
        let tag = this.collection[tagT];
        let query = document.querySelector(`meta[${tag.property}="${tag.name}"]`);
        if (query){
            query.setAttribute(this.attr, content);
            return true;
        }
        console.log(`${tag.property} of meta "${tag.name}" was not found in the document.`)
        return false;        
    }
}

interface Tag{
    property: string,
    name: string
}


class TagFactory{
    static make(tag: string): Tag {
        return {"name": tag, "property": tagDict[tag]};
    }
}


const TAGTYPES= {
    NAME: "name",
    PROPERTY: "property"
}

enum TAGS {
    DESCR= "description",
    KEYWORDS= "keywords",
    TITLE= "og:title",
    TYPE="og:type",
    IMAGE= "og:image",
    URL= "og:url",
    SITE_NAME="og:site_name",
    LOCALE="og:locale",
}

enum LANGUAGES{
    ENG= "en_GB",
    IT="it_IT",
    SE="sv_SE",
    RU="ru_RU"

}

enum PAGETYPES {
    ARTICLE= "article",
    WEBSITE= "website",
    PROFILE="profile",
}


const tagDict: EnumDictionary<string, string> = {
    [TAGS.DESCR]: TAGTYPES.NAME,
    [TAGS.KEYWORDS]: TAGTYPES.NAME,
    [TAGS.TITLE]: TAGTYPES.PROPERTY,
    [TAGS.TYPE]: TAGTYPES.PROPERTY,
    [TAGS.IMAGE]: TAGTYPES.PROPERTY,
    [TAGS.URL]: TAGTYPES.PROPERTY,
}

export {TAGS, LANGUAGES, TagManager, EnumDictionary, PAGETYPES};
