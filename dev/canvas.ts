import { PanelElement } from "./uiElements";
import { constants } from "./constants";
import { Header, Footer, PanelStart } from "./panel";

class Canvas {
  currentDisplayedPanelId: string;
  panelIds: string[];

  constructor() {
    console.log("init canvas");
    this.currentDisplayedPanelId = "";
    this.panelIds = [];
  }

  make() {
    this.addHeader();
    this.addPanels();
    this.addFooter();
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
      el.style.display = "flex";
    }
    this.currentDisplayedPanelId = id;
  }

  addHeader() {
    var h = new Header();
    h.add();
  }

  addPanels() {
    let panels = [
      new PanelStart(this)
    ];
    panels.forEach((panel) => {
      panel.add();
      this.panelIds.push(panel.id);
    });
  }

  addFooter() {
    var h = new Footer(constants.FOOTER, this);
    h.add();
  }
}

export { Canvas };
