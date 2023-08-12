import * as uuid from "uuid"
import {Pane, PanelButton} from "../../../src/uiElements"
import { constants } from "./constants";
import { BlogStructure } from "./structure";

enum SECTIONS {TECH, LINGUISTICS, SPORT, BOOKS, OTHER}
enum ARTICLES {GCPRESOURCES}

class Section {
    name: string;
    onChangefn: any;
    classname: string;
    constructor(
        classname: string | null = null,
        name: string,
        onChangefn: any = ()=>{}
  ) {
    this.classname = classname ? classname : constants.SECTION_CLASSNAME;
    this.name = name;
    this.onChangefn = onChangefn;
  }
  make(root: any = null, structure: BlogStructure){
    
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