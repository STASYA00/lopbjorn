import * as uuid from "uuid";
import { PanelArticle, PanelStart } from "./panel";
import { PageManager } from "./404/pageManager";
import { Pane } from "./uiElements";
import { PANEL_ID_START } from "./constants";


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
  }

  make() {
    //this.switchToPanel(this.panelIds[0]);
    console.log("new canvas!");
    let p = this.manager.start(this);
    // let p = new PanelStart(this);
    // let p1 = new PanelArticle(this, "Tech", "Parsing_ifc_file");
    p.add();
    // p1.add();
    this.panelIds.push(p.id);
    // this.panelIds.push(p1.id);
    console.log("canvas made");
    this.switchToPanel(this.panelIds[0]);
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

  switchToPanel(id: string): void {
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
  } 
}

export { Canvas , PanelEnum};