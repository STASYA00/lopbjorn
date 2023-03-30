import { constants } from "./constants";
import { Canvas } from "./canvas";
import {
  Panel, PanelText,
} from "./uiElements";
import {Article} from "./section"
import { ArticleRenderer } from "./article";

class PanelStart extends Panel {
    constructor(parent: Canvas) {
      let id = constants.PANEL_ID_START;
      super(id, parent);
    }
    getElements() {
      
      return ArticleRenderer.make("gcp_resources").then(r => [
        new Article(this.id, "article"),
        new PanelText(r, "articletext")
      ]);
    }
  }
  export {PanelStart};