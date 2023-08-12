import { constants } from "./constants";
import { Canvas } from "./canvas";
import {
  Pane,
  PanelButton,
  PanelImage,
  PanelElement,
  Panel,
  PanelText,
} from "./uiElements";
class Header extends Pane {
  constructor() {
    super(constants.ROOT_CLASSNAME, constants.HEADER);
    this.id = constants.HEADER;
  }

  getElements() {
    return [
      //new PanelText("Hatch Print Info"),
    ];
  }
}

class Footer extends Pane {
  parent: Canvas;
  constructor(id: string, parent: Canvas) {
    super(constants.ROOT_CLASSNAME, constants.FOOTER);
    this.id = constants.FOOTER;
    this.parent = parent;
  }

  getElements(): PanelElement[] {
    return [
      new PanelText("footer")
    ];
  }
}





class PanelStart extends Panel {
  constructor(parent: Canvas) {
    let id = constants.PANEL_ID_START;
    super(id, parent);
  }
  getElements() {
    
    let elements = [
      new PanelText("some text"),
    ];
    return elements;
  }
}

// class PanelList extends Panel {

//   constructor(parent: Canvas, id: string | null = null) {
//     super(id, parent);

//   }
//   getElements() {
//     let elements = [new ZoneContainer(this.id)];
//     return elements;
//   }
// }

// class PanelStats extends Panel {
//   constructor(parent: Canvas) {
//     super(null, parent);
//   }
//   getElements() {
//     let elements = [new MapPane(this.id)];
//     return elements;
//   }
// }


export { Footer, Header, PanelStart };
