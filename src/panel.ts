import { constants } from "./constants";
import { Canvas } from "./canvas";
import {
  Panel, PanelText, PanelElement
} from "./uiElements";
import {Article, Section} from "./section"
import { BlogStructure } from "./structure";
import { ArticleRenderer } from "./articleRenderer";

class PanelStart extends Panel {
    constructor(parent: Canvas) {
      let id = constants.PANEL_ID_START;
      super(id, parent);
    }
    getElements(): Promise<PanelElement[]> {
      
      // return ArticleRenderer.make("gcp_resources").then(r => [
      //   new Article(this.id, "article"),
      //   new PanelText(r, "articletext")
      // ]);
      let structure = new BlogStructure();
      structure.load_test();
      let _sections = structure.getSections();
      let _elements:PanelElement[] = [];
      for (let s=0; s< _sections.length; s++){
        let _articles = _sections[s].getContent();
        _elements.push(new Section(this.id, constants.SECTION_CLASSNAME, _sections[s].name));
        for (let a=0; a< _articles.length; a++){
          _elements.push(new Article(this.id, constants.ARTICLE_CLASSNAME, _articles[a]));
        }
      }
      return new Promise((res)=>res(
        _elements
      ));
    }
  }
  export {PanelStart};