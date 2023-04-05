import * as uuid from "uuid"
import {Pane, PanelButton} from "./uiElements"

enum SECTIONS {TECH, LINGUISTICS, SPORT, BOOKS, OTHER}
enum ARTICLES {GCPRESOURCES}

class Section extends Pane{
    name: string;
    onChangefn: any;
    constructor(
        parentId: string,
        classname: string | null = null,
        name: string,
        onChangefn: any = ()=>{}
  ) {
    super(parentId, classname, null);
    this.name = name;
    this.onChangefn = onChangefn;
  }
  postprocess(el: HTMLElement): void {
    el.onclick = this.onChangefn;
  }

}

class Article extends Section{

}

interface ArticleInterface{
    id: string;
    name: string;
    address: string;
}



export {Section, Article};