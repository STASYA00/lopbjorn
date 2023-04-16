import { marked } from "marked";

import { PANEL_ID_ARTICLE, PANEL_ID_START, constants } from "../constants";
// import { getCurrentURL, redirectURL } from "../utils";
import { urlManager, HTMLFilesEnum } from "../urlManager";
import { PageTagAssigner } from "./pageTagAssigner";
import { PanelArticle, PanelNotFound, PanelStart } from "../panel";
import { ServerRequest } from "../request";
import { Canvas } from "../canvas";
import { Panel } from "../uiElements";

class PageManager{
    private assigner: PageTagAssigner;
    constructor(){
        this.assigner = new PageTagAssigner();
        
    }

    private getArticle(): string{
        let url = urlManager.getCurrentURL();
        url = url.substring(0, url.length-1);
        return url.substring(url.lastIndexOf("/"), url.length);
    }

    private isHome(): boolean{
        console.log(`Current url: ${urlManager.getCurrentURL()}`);
        
        if (!urlManager.runsLocally()){
            return (urlManager.getCurrentURL() == constants.HOME_URL) || (urlManager.getCurrentURL() == constants.HOME_URL+"/");
             }
        // check locally
        return urlManager.getCurrentURL().includes(HTMLFilesEnum.HOME);
        }

    private articleExists(article:string){
        let s = new ServerRequest(article, constants.ARTICLEEXISTS_URL);
        return s.call().then( r => {
            let res = marked.parse(r[constants.RESPONSE_PARSE_KEY]);
            localStorage.setItem(article, res);
            return res;
        });
    }

    start(canvas: Canvas): Panel{
        
        if (this.isHome()){
            console.log("Home panel");
            this.assigner.make(PANEL_ID_START, constants.SITE_NAME);
            return new PanelStart(canvas);
        }
        console.log("getting article");
        throw new Error();
        let article = this.getArticle();
        // check that article is on GCP
        
        if (this.articleExists(article)){
            let section = "Tech";
            let article1 = "Parsing_ifc_file";
            try{
                urlManager.rewriteURL(article1);
            }
            catch (e){
                console.log(e as Error);
                console.log("Local dev environment, no URL rewriting possible");
            }
            
            this.assigner.make(PANEL_ID_ARTICLE, article);
            return new PanelArticle(canvas, section, article);
        }
        this.assigner.make(PANEL_ID_ARTICLE, article);
        return new PanelNotFound(canvas);
    }

    switch(canvas: Canvas, section?: string, article?: string){
        if (urlManager.runsLocally()){
            console.log(section==undefined);
            throw new Error();
            return urlManager.redirectLocalURL(section==undefined, article);
        }
        let new_url = constants.SITE_NAME;
        console.log(new_url);
        if (article){
            new_url = `${constants.SITE_NAME}/${article}`;
        }
        console.log(new_url);
        throw new Error();
        
        return urlManager.redirectURL(new_url);
    }
        
}

export {PageManager};