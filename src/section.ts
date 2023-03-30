import * as uuid from "uuid"
import {Pane, PanelButton} from "./uiElements"

enum SECTIONS {TECH, LINGUISTICS, SPORT, BOOKS, OTHER}
enum ARTICLES {GCPRESOURCES}

class Section{
    id: string;
    name: string;
    constructor(id:string, name:string){
        this.id = id;
        this.name = name;
    }
    run(){
        console.log("section " + this.name);
    }
}

class Article extends Pane{

}

interface ArticleInterface{
    id: string;
    name: string;
    address: string;
}



export {Section, Article};