import { marked } from "marked";
import {EmojiConvertor} from "emoji-js";
import {constants} from "./constants";
import { ServerRequest } from "./request";


interface ArticleReqInterface{
    section: string,
    name: string
}
class ArticleRenderer{
    constructor(){

    }
    static _make(content:string){
        if (localStorage.getItem(content)!=null){
            return new Promise((res)=>res(localStorage.getItem(content)))
        }
        let s = new ServerRequest(content);
        return s.call().then( r => {
            let res = marked.parse(r[constants.RESPONSE_PARSE_KEY]);
            localStorage.setItem(content, res);
            return res;
        });
    }
    static makeArticleInterface(section:string, name:string):ArticleReqInterface{
        return {"section": section, "name": name};
    }
    static make(section:string, name:string){
        let e = new EmojiConvertor();
        if (constants.LOCAL_STORAGE){
            if (localStorage.getItem(name)!=null){
                return new Promise((res)=>res(marked.parse(JSON.parse(localStorage.getItem(name))["text"])));
            }
        }
        
        let s = new ServerRequest(ArticleRenderer.makeArticleInterface(section, name));
        return s.call().then( r => {
            let res = marked.parse(r[constants.RESPONSE_PARSE_KEY]);
            localStorage.setItem(name, res);
            return res;
        });
    }
}

export {ArticleRenderer};