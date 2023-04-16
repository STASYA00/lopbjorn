import { marked } from "marked";

import { PANEL_ID_ARTICLE, PANEL_ID_START, constants } from "../constants";
// import { getCurrentURL, redirectURL } from "../utils";
import { urlManager, HTMLFilesEnum } from "../urlManager";
import { PageTagAssigner } from "./pageTagAssigner";
import { PanelArticle, PanelNotFound, PanelStart } from "../panel";
import { ServerRequest } from "../request";
import { Canvas } from "../canvas";
import { Panel } from "../uiElements";

interface ArticleResponse{
    section: string,
    text: string,
    article: string,
    meta: string, 
    updated: string
}
class PageManager{
    private assigner: PageTagAssigner;
    constructor(){
        this.assigner = new PageTagAssigner();
        
    }

    private getArticle(): string{
        let url = urlManager.getCurrentURL();
        
        url = url.endsWith("/") ? url.substring(0, url.length): url;
        return url.substring(url.lastIndexOf("/") + 1, url.length);
    }

    private isHome(): boolean{
        console.log(`Current url: ${urlManager.getCurrentURL()}`);
        
        if (!urlManager.runsLocally()){
            return (urlManager.getCurrentURL() == constants.HOME_URL) || (urlManager.getCurrentURL() == constants.HOME_URL+"/");
             }
        // check locally
        return urlManager.getCurrentURL().includes(HTMLFilesEnum.HOME);
        }

    private articleExists(article:string):Promise<ArticleResponse>{
        let s = new ServerRequest({"name": article}, constants.ARTICLEEXISTS_URL);
        return s.call().then( r => {
            console.log("RESPONSE:", r);
            console.log(r[constants.RESPONSE_PARSE_KEY]);
            localStorage.setItem(article, r[constants.RESPONSE_PARSE_KEY]);
            return r[constants.RESPONSE_PARSE_KEY];
        });
    }

    start(canvas: Canvas): Promise<Panel>{
        
        if (this.isHome()){
            console.log("Home panel");
            this.assigner.make(PANEL_ID_START, constants.SITE_NAME);
            
            return new Promise((res)=>res(new PanelStart(canvas)));
        }
        
        let article = this.getArticle();
        
        return this.articleExists(article).then(res =>{
            console.log("result", res);
            let section = res["section"];
            try{
                urlManager.rewriteURL(res["article"]);
            }
            catch (e){
                console.log(e as Error);
                console.log("Local dev environment, no URL rewriting possible");
            }
            this.assigner.make(PANEL_ID_ARTICLE, res["article"]);
            return new PanelArticle(canvas, res["section"], res["article"]);

        });
    }

    switch(canvas: Canvas, section?: string, article?: string){
        if (urlManager.runsLocally()){
            console.log(section==undefined);
            return urlManager.redirectLocalURL(section==undefined, article);
        }
        let new_url = constants.HOME_URL;
        if (article){
            new_url = `${constants.HOME_URL}/${article}`;
        }
        return urlManager.redirectURL(new_url);
    }
        
}

export {PageManager};