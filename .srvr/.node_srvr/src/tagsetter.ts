import { marked } from 'marked';
import { EmojiConvertor } from 'emoji-js';

import { File } from '@google-cloud/storage';

import {TAGS, EnumDictionary, LANGUAGES, PAGETYPES} from "./tagManager"
import { constants, PANEL_ID_START } from "./constants";

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	breaks: false,
  });

  
const em = new EmojiConvertor();
em.replace_mode = "unified";
em.allow_native = true;

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
            [TAGS.CONTENT]: TagSetterContent,
        }
    }
    make(tag:TAGS): TagSetter{
        return new this.content[tag](tag);
    }
}


class TagSetter{
    readonly tag: TAGS;
    readonly default_value: string;
    constructor(tag:TAGS){
        this.tag = tag
        this.default_value = "";
    }

    get(id:string="", content: File | null = null):Promise<string>{
        return new Promise((res)=>res(""));
    }
}


class TagSetterLang extends TagSetter{
    constructor(tag:TAGS=TAGS.LOCALE){
        super(tag);
    }
    get(id:string="", content: File | null = null): Promise<string> {
        return new Promise((res)=>res(LANGUAGES.SE));
    }
}
class TagSetterKwrds extends TagSetter{
    constructor(tag:TAGS=TAGS.KEYWORDS){
        super(tag);
    }
    get(id:string="", content: File | null = null): Promise<string> {
        return new Promise((res)=>res("tech, article, ifc, parsing"));
    }
}
class TagSetterDescr extends TagSetter{
    // IDEA: take intro from each article's readme - first stycke
    constructor(tag:TAGS=TAGS.KEYWORDS){
        super(tag);
    }
    get(id:string="", content: File | null = null): Promise<string> {
        return new Promise((res)=>res("test description"));
    }
}
class TagSetterImage extends TagSetter{
    constructor(tag:TAGS=TAGS.IMAGE){
        super(tag);
    }
    get(id:string="", content: File | null = null): Promise<string> {
        return new Promise((res)=>res("image.png"));
    }
}
class TagSetterTitle extends TagSetter{
    constructor(tag:TAGS=TAGS.TITLE){
        super(tag);
    }
    get(id:string, content: File | null = null): Promise<string> {
        let r = this.default_value;
        if (content){
            let section = content.name.substring(0, content.name.lastIndexOf("article.md")-1);
            r = section.substring(section.lastIndexOf("/") + 1);
        }
        return new Promise((res)=>res(r));
    }
}
class TagSetterURL extends TagSetter{
    constructor(tag:TAGS=TAGS.URL){
        super(tag);
    }
    get(id:string="", content: File | null = null): Promise<string> {
        let r = this.default_value;
        if (content){
            let section = content.name.substring(0, content.name.lastIndexOf("article.md")-1);
            r = `${constants.HOME_URL}/${section.substring(section.lastIndexOf("/") + 1)}`;
        }
        return new Promise((res)=>res(r));
    }
}
class TagSetterType extends TagSetter{
    //readonly pagetypes: EnumDictionary<string, string>;
    constructor(tag:TAGS=TAGS.TYPE){
        super(tag);
        // this.pagetypes = {
        //     [PANEL_ID_START]: PAGETYPES.WEBSITE,
        //     [PANEL_ID_ARTICLE]: PAGETYPES.ARTICLE,
        //     [PANEL_ID_NOTFOUND]: PAGETYPES.ARTICLE
        // };
        
    }
    get(id:string, content:File | null = null): Promise<string> {
        return new Promise((res)=>res(id == PANEL_ID_START ? PAGETYPES.WEBSITE: PAGETYPES.ARTICLE));
    }
}
class TagSetterSitename extends TagSetter{
    constructor(tag:TAGS=TAGS.SITE_NAME){
        super(tag);
    }
    get(id:string="", content:File | null = null): Promise<string> {
        return new Promise((res)=>res(constants.SITE_NAME));
    }
}

class TagSetterContent extends TagSetter{
    constructor(tag:TAGS=TAGS.SITE_NAME){
        super(tag);
    }
    get(id:string="", content:File | null = null): Promise<string> {
        if (content){
            return content.download().then(

                (contents) => {return em.replace_colons(marked.parse(contents.toString()))});
            }
            return new Promise((res)=>res(""));

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