type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

class TagManager{
    readonly attr: string;
    collection: EnumDictionary<string, Tag>;
    constructor(){
        this.attr = "content";
        this.collection = { };
        this.load();
    }

    private load(){
        
        for (let tag of TagIterator.run()){
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
        let t = document.createElement("meta") as HTMLMetaElement;
        t.setAttribute(tag.property, tag.name);
        t.setAttribute(this.attr, content);
        document.getElementsByTagName("head")[0].appendChild(t);
        return true;        
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

class TagIterator{
    static run(){
        // embarassing piece of code
        return [TAGS.DESCR, TAGS.KEYWORDS, TAGS.LOCALE, 
            TAGS.IMAGE, TAGS.SITE_NAME, TAGS.TITLE, TAGS.TYPE, TAGS.URL]
    }
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
    [TAGS.LOCALE]: TAGTYPES.NAME,
    [TAGS.SITE_NAME]: TAGTYPES.NAME,
    [TAGS.TITLE]: TAGTYPES.PROPERTY,
    [TAGS.TYPE]: TAGTYPES.PROPERTY,
    [TAGS.IMAGE]: TAGTYPES.PROPERTY,
    [TAGS.URL]: TAGTYPES.PROPERTY,
}

export {TAGS, LANGUAGES, TagManager, EnumDictionary, PAGETYPES, TagIterator};
