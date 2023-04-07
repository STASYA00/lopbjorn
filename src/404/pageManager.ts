import { constants } from "../constants";
import { getCurrentURL, redirectURL } from "../utils";
import { PanelArticle, PanelNotFound, PanelStart } from "../panel";
import { Canvas } from "../canvas";
import { Panel } from "../uiElements";

class PageManager{

    constructor(){

    }

    private getArticle(): string{
        let url = getCurrentURL();
        url = url.substring(0, url.length-1);
        return url.substring(url.lastIndexOf("/"), url.length);
    }

    start(canvas: Canvas): Panel{
        console.log(`get current ${getCurrentURL()}`);
        console.log(`home ${constants.HOME_URL}`);
        if (getCurrentURL() == constants.HOME_URL){
            return new PanelStart(canvas);
        }
        let article = this.getArticle();
        // check that article is on GCP
        let result = true;
        if (result){
            // redirect to article page - no need
            //redirectURL(`${constants.HOME_URL}`);
            let section = "Tech";
            article = "Parsing_ifc_file";
            return new PanelArticle(canvas, section, article);
        }
        return new PanelNotFound(canvas);
    }
}

export {PageManager};