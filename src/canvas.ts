import { PageManager } from "./404/pageManager";
import { PanelArticle } from "./panel";


  enum PanelEnum{
    PANEL_START,
    PANEL_ARTICLE,
    PANEL_NOTFOUND
  }
class Canvas {
  currentDisplayedPanelId: string;
  panelIds: string[];
  manager: PageManager;

  constructor() {
    this.currentDisplayedPanelId = "";
    this.panelIds = [];
    this.manager = new PageManager();
    console.log("canvas initiated");
    
  }

  make() {
    //this.switchToPanel(this.panelIds[0]);
    console.log("new canvas!");
    this.manager.start(this).then(p => {
      
      p.add();
      this.panelIds.push(p.id);
      let article, section = undefined;
      if (p instanceof PanelArticle){
        section= p.section;
        article =p.article;
      }
      this.switchToPanel(p.id, section, article);     
    });
  }

  nextPage() {
    console.log("clicked next");
    let ind = this.panelIds.indexOf(this.currentDisplayedPanelId)
    console.log(ind);
    if (ind < this.panelIds.length - 1) {
      ind = ind + 1;
    }
    this.switchToPanel(this.panelIds[ind]);
  }

  previousPage() {
    console.log("clicked prev");
    let ind = this.panelIds.indexOf(this.currentDisplayedPanelId)
    console.log(ind);
    if (ind > 0) {
      ind = ind - 1;
    }
    this.switchToPanel(this.panelIds[ind]);
  }

  switchToPanel(id: string, section?: string, article?: string): void {
    if (this.currentDisplayedPanelId) {
      let el = document.getElementById(this.currentDisplayedPanelId);
      if (el) {
        el.style.display = "none";
      }
    }
    let el = document.getElementById(id);
    if (el) {
      el.style.display = "grid"; //flex
    }
    this.currentDisplayedPanelId = id;
    
    this.manager.switch(this, section, article);
    
  } 

}

export { Canvas , PanelEnum};