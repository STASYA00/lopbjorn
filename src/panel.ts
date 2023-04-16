import { constants, PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND, PANEL_ID_START } from "./constants";
import { Canvas } from "./canvas";
import {
  Panel, PanelText, PanelElement
} from "./uiElements";
import {Article, Section} from "./section"
import { BlogStructure } from "./structure";
import { ArticleRenderer } from "./articleRenderer";

class PanelStart extends Panel {
    constructor(parent: Canvas) {
      super(PANEL_ID_START, parent);
    }
    getElements(): Promise<PanelElement[]> {
      
      // return ArticleRenderer.make("gcp_resources").then(r => [
      //   new Article(this.id, "article"),
      //   new PanelText(r, "articletext")
      // ]);
      let structure = new BlogStructure();
      //structure.load_test();
      return structure.load().then(
        r=>{
          let _sections = structure.getSections();
          let _elements:PanelElement[] = [];
          for (let s=0; s< _sections.length; s++){
            let _articles = _sections[s].getContent()[0];
            _elements.push(new Section(this.id, 
                                      constants.SECTION_CLASSNAME, 
                                      _sections[s].name,

                                      ()=>{console.log("Section", _sections[s].name, _sections[s].getContent());
                                      this.parent.switchToPanel(PANEL_ID_ARTICLE);
                                      }
                                      ));
            for (let a=0; a<_articles.length; a++){
              _elements.push(new Article(this.id, constants.ARTICLE_CLASSNAME, _articles[a],

                ()=>{
                  this.parent.switchToPanel(PANEL_ID_ARTICLE, _sections[s].name, _articles[a]);
                  console.log("Article", _articles[a]);
                }
                ));
            }
          }
          return new Promise((res)=>res(
            _elements
          ));
        }
      );
      
    }
  }

class PanelArticle extends Panel{
  section: string;
  article: string;
  constructor(parent: Canvas, section:string, article:string) {
    super(PANEL_ID_ARTICLE, parent);
    this.section = section;
    this.article = article;
    this.classname = "panelarticle";
  }

  getElements(): Promise<PanelElement[]> {
    console.log("Getting elements", this.section, this.article);
    return ArticleRenderer.make(this.section, this.article).then(r => [
      new PanelText(r, "articletext")
    ]);
    
  }
}

class PanelNotFound extends Panel{
  
  constructor(parent: Canvas) {
    super(PANEL_ID_NOTFOUND, parent);
    this.classname = "panelnotfound";
  }

  getElements(): Promise<PanelElement[]> {
    
    return new Promise((res) => res([
      new PanelText("ERROR 404")
    ]));
    
  }
}

  export {PanelStart, PanelArticle, PanelNotFound};