import { PANEL_ID_ARTICLE, PANEL_ID_START, constants } from "../constants";
// import { getCurrentURL, redirectURL } from "../utils";
import { urlManager } from "../urlManager";
import { PageTagAssigner } from "./pageTagAssigner";
import { PanelArticle, PanelNotFound, PanelStart } from "../panel";
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
        return (urlManager.getCurrentURL() == constants.HOME_URL) || (urlManager.getCurrentURL() == constants.HOME_URL+"/");
    }

    private articleExists(article:string){
        return true;
    }

    start(canvas: Canvas): Panel{
        
        if (this.isHome()){
            this.assigner.make(PANEL_ID_START);
            return new PanelStart(canvas);
        }
        let article = this.getArticle();
        // check that article is on GCP
        
        if (this.articleExists(article)){
            let section = "Tech";
            let article1 = "Parsing_ifc_file";
            urlManager.rewriteURL(article1);
            this.assigner.make(PANEL_ID_ARTICLE, article);
            return new PanelArticle(canvas, section, article);
        }
        this.assigner.make(PANEL_ID_ARTICLE, article);
        return new PanelNotFound(canvas);
    }
}

export {PageManager};