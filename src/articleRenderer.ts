import { marked } from "marked";
// import { EmojiConvertor } from "emoji-js";
import {constants} from "./constants";
import { ServerRequest } from "./request";


class ArticleRenderer{
    constructor(){

    }
    static make(content:string){
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
}

export {ArticleRenderer};