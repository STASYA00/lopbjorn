import * as uuid from "uuid";
import { Canvas } from "./canvas";
import { constants } from "./constants";

interface CssData {
  tag: string;
  value: string;
}

class PanelElement {
  id: string;
  css: CssData[];
  elementType: string;
  className: string | null;

  constructor(
    id: string | null = null,
    css: CssData[] = [],
    classname: string | null = null
  ) {
    this.id = id ? id : uuid.v4();
    this.css = css;
    this.elementType = "div";
    this.className = classname;
  }

  createElement(): HTMLElement | null {
    const el = document.createElement(this.elementType);
    return el;
  }

  add(parentId: string = "") {
    const el = this.createElement();
    if (el != null) {
      el.id = this.id;
      if (this.className) {
        el.className = this.className;
      }
      this.css.forEach((x) => {
        el.style.setProperty(x.tag, x.value);
      });
      this.appendElement(parentId, el);
      this.postprocess(el);

    }

  }

  appendElement(parentId: string, child: Node) {
    let parent = document.getElementById(parentId);

    if (parent) {
      parent.appendChild(child);
    }
  }
  postprocess(el: HTMLElement) { }
}

class PanelText extends PanelElement {
  text: string;

  constructor(
    text: string,
    classname: string | null = null,
    id: string | null = null
  ) {
    super(id, [], classname);
    this.text = text;
    this.elementType = "p";
  }
  createElement() {
    const el = document.createElement(this.elementType);
    el.innerHTML = this.text;
    el.id = this.id;
    return el;
  }
}

class Pane extends PanelElement {
  parentId: string;
  parent: Canvas | null;
  constructor(
    parentId: string,
    classname: string | null = null,
    parent: Canvas | null = null
  ) {
    super(null, [], classname);
    this.parent = parent;
    this.parentId = parentId;
  }

  getElements(): PanelElement[] {
    return [];
  }
  add() {
    const pane = document.createElement("div");
    pane.id = this.id;

    if (this.className) {
      pane.className = this.className;
    }

    const rootElement = document.getElementById(this.parentId);
    if (rootElement) {
      rootElement.append(pane);
    } else {
      console.log(`Could not create ${"pane"}`);
      return;
    }

    let elements = this.getElements();

    elements.forEach((el) => {
      el.add(this.id);
    });
    this.postprocess(pane);
  }
}

class PanelButton extends PanelElement {
  label: string;
  onclickFn: any;
  disabled: boolean;

  constructor(
    label: string,
    onclickFn: any,
    classname: string | null = null,
    css: CssData[] = [],
    disabled: boolean = false
  ) {
    super(null, css, classname);
    this.label = label;
    this.onclickFn = onclickFn;
    this.elementType = "button";
    this.disabled = disabled;
    if (!this.className) {
      this.className = "button";
    }
  }

  createElement() {
    const el = document.createElement("button");
    el.innerHTML = this.label;
    el.onclick = this.onclickFn;
    if (this.disabled) {
      el.disabled = true;
    }
    return el;
  }
}

class Panel {
  id: string;
  classname: string;
  parent: Canvas;
  parentId: string;

  constructor(id: string | null = null, parent: Canvas) {
    this.id = id ? id : uuid.v4();
    this.classname = "panel";
    this.parent = parent;
    this.parentId = constants.ROOT_CLASSNAME;
  }
  getElements(): Promise<PanelElement[]> {
    return new Promise((res) => res([]));;
  }

  add() {
    const panel = document.createElement("div");
    panel.id = this.id;
    panel.className = this.classname;

    const rootElement = document.getElementById(this.parentId);
    if (rootElement) {
      rootElement.append(panel);
    } else {
      console.log(`Could not create ${this.classname}`);
      return;
    }
    panel.style.display = "none";

    this.getElements().then(elements => elements.forEach((el) => {
      el.add(this.id);
    }));
    this.postActions();
  }

  postActions() { }
}

class PanelImage extends PanelElement {
  src: string;
  onchangeFn: any;

  constructor(
    id: string | null,
    src: string,
    css: CssData[] = [],
    classname: string | null = null,
    onchangeFn: any = null
  ) {
    super(id, css, classname);
    this.src = src;
    this.elementType = "img";
    this.onchangeFn = onchangeFn;
  }

  createElement(): HTMLImageElement {
    const img = document.createElement("img");
    img.id = this.id;
    img.src = this.src;
    img.onclick = this.onchangeFn;
    return img;
  }
}

export {
  CssData,
  PanelElement,
  PanelImage,
  Pane,
  PanelButton,
  Panel,
  PanelText,
};
