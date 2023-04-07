import { constants } from "../constants";
// import { getCurrentURL, redirectURL } from "../utils";
import { urlManager } from "../urlManager";
import { PanelArticle, PanelNotFound, PanelStart } from "../panel";
import { Canvas } from "../canvas";
import { Panel } from "../uiElements";

class PageManager{

    constructor(){

    }

    private getArticle(): string{
        let url = urlManager.getCurrentURL();
        url = url.substring(0, url.length-1);
        return url.substring(url.lastIndexOf("/"), url.length);
    }

    start(canvas: Canvas): Panel{
        console.log(`get current ${urlManager.getCurrentURL()}`);
        console.log(`home ${constants.HOME_URL}`);
        if (urlManager.getCurrentURL() == constants.HOME_URL){
            return new PanelStart(canvas);
        }
        let article = this.getArticle();
        // check that article is on GCP
        let result = true;
        if (result){
            let section = "Tech";
            article = "Parsing_ifc_file";
            urlManager.redirectURL();
            urlManager.rewriteURL(article);
            // redirect to article page - no need
            //redirectURL(`${constants.HOME_URL}`);
            
            return new PanelArticle(canvas, section, article);
        }
        return new PanelNotFound(canvas);
    }
}

export {PageManager};