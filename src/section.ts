import * as uuid from "uuid"
import {Pane, PanelButton} from "./uiElements"

enum SECTIONS {TECH, LINGUISTICS, SPORT, BOOKS, OTHER}
enum ARTICLES {GCPRESOURCES}

class Section extends Pane{
    name: string;
    constructor(
        parentId: string,
        classname: string | null = null,
        name: string
  ) {
    super(parentId, classname, null);
    this.name = name;
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