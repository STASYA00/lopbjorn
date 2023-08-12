// import { constants, PANEL_ID_ARTICLE, PANEL_ID_NOTFOUND, PANEL_ID_START } from "./constants";
// import { Canvas } from "./canvas";
// import {
//   Panel, PanelText, PanelElement
// } from "./uiElements";
// import {Article, Section} from "../.srvr/.node_srvr/src/section"
// import { BlogStructure } from "../.srvr/.node_srvr/src/structure";

// class PanelStart extends Panel {
//     constructor(parent: Canvas) {
//       super(PANEL_ID_START, parent);
//     }
//     getElements(): Promise<PanelElement[]> {
//       let structure = new BlogStructure();
//       return structure.load().then(
//         r=>{
//           let _sections = structure.getSections();
//           let _elements:PanelElement[] = [];
//           for (let s=0; s< _sections.length; s++){
//             let _articles = _sections[s].getContent()[0];
//             _elements.push(new Section(this.id, 
//                                       constants.SECTION_CLASSNAME, 
//                                       _sections[s].name,
//                                       ()=>{console.log("Section", _sections[s].name, _sections[s].getContent());
//                                       this.parent.switchToPanel(PANEL_ID_ARTICLE);
//                                       }
//                                       ));
//             for (let a=0; a<_articles.length; a++){
//               _elements.push(new Article(this.id, constants.ARTICLE_CLASSNAME, _articles[a],

//                 ()=>{
//                   this.parent.switchToPanel(PANEL_ID_ARTICLE, _sections[s].name, _articles[a]);
//                   console.log("Article", _articles[a]);
//                 }
//                 ));
//             }
//           }
//           return new Promise((res)=>res(
//             _elements
//           ));
//         }
//       );
//     }
//   }

// class PanelArticle extends Panel{
//   section: string;
//   article: string;
//   content: string;
//   constructor(parent: Canvas, section:string, article:string, content: string) {
//     super(PANEL_ID_ARTICLE, parent);
//     this.section = section;
//     this.article = article;
//     this.content = content;
//     this.classname = "panelarticle";
//   }

//   getElements(): Promise<PanelElement[]> {
    
//     return new Promise((res)=>res([
//       new PanelText(this.content, "articletext")
//     ]));
//   }
// }

// class PanelNotFound extends Panel{
  
//   constructor(parent: Canvas) {
//     super(PANEL_ID_NOTFOUND, parent);
//     this.classname = "panelnotfound";
//   }

//   getElements(): Promise<PanelElement[]> {
    
//     return new Promise((res) => res([
//       new PanelText("ERROR 404")
//     ]));
    
//   }
// }

//   export {PanelStart, PanelArticle, PanelNotFound};