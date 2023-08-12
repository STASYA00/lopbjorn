import {constants} from "./constants";
import { urlManager } from './urlManager';

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

class TagManager{
    readonly attr: string;
    collection: EnumDictionary<string, Tag>;
    root: Document | HTMLElement | null;
    constructor(){
        this.attr = "content";
        this.collection = { };
        this.root = null;
        this.load();
    }

    private load(){
        
        for (let tag of TagIterator.run()){
            this.collection[tag] = TagFactory.make(tag);
            
        }
    }

    updateTag( tagT:string, content:string){
        let tag = this.collection[tagT];
        if (this.root){
            let query = this.root.querySelector(this.getQuery(tagT));
            if (query){
                tagT==TAGS.CONTENT ?
                    query.innerHTML = content : query.setAttribute(this.attr, content);
                tagT==TAGS.CONTENT ? query.className=constants.ARTICLE_CLASSNAME : ()=>{};
                return true;
            }
            if (!urlManager.is_server() && this.root instanceof Document && tagT!=TAGS.CONTENT){
                let t = this.root.createElement("meta") as HTMLMetaElement;
                t.setAttribute(tag.property, tag.name);
                t.setAttribute(this.attr, content);
                document.getElementsByTagName("head")[0].appendChild(t);
                return true;  

            }
        }
              
    }
    private getQuery(tagT:string){
        let tag = this.collection[tagT];
        return tagT==TAGS.CONTENT ? "#root": `meta[${tag.property}="${tag.name}"]`;

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
    PROPERTY: "property",
    NONE: ""
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
    // UPDATED="article:modified",
    // SECTION="article:section",
    // CREATED="article:published_time",
    CONTENT = "",

}

class TagIterator{
    static run(){
        // embarassing piece of code
        return [TAGS.DESCR, TAGS.KEYWORDS, TAGS.LOCALE, 
            TAGS.IMAGE, TAGS.SITE_NAME, TAGS.TITLE, TAGS.TYPE, TAGS.URL, 
            // TAGS.UPDATED, TAGS.SECTION, TAGS.CREATED, 
            TAGS.CONTENT]
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
    // [TAGS.UPDATED]: TAGTYPES.PROPERTY,
    // [TAGS.SECTION]: TAGTYPES.PROPERTY,
    // [TAGS.CREATED]: TAGTYPES.PROPERTY,
    [TAGS.CONTENT]: TAGTYPES.NONE,
}

export {TAGS, LANGUAGES, TagManager, EnumDictionary, PAGETYPES, TagIterator};
