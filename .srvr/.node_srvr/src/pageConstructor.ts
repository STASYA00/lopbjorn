import { PageTagAssigner } from "./pageTagAssigner";

import {parse, HTMLElement} from 'node-html-parser';
import { File } from '@google-cloud/storage';
import { constants } from './constants';


class Page {

    constructor() {

    }

    make() { }

    static load(html: Buffer, content: File | string): Promise<any> {
        let doc = parse(html.toString());
        let root = doc.querySelector("#root")
        if (typeof (content) == "string" && root != null) {
            root.innerHTML = content;
        }

        return new Promise((res) => res(doc));
    }
}

// class Page{
    
//     constructor(){

//     }

//     make(){}

//     static load(html: Buffer, content: File){
//         let root = parse(html.toString());
//         let assigner = new PageTagAssigner();
//         return assigner.make(content, root).then(
//             r => {
//                 return root;
//             }
//         );
//     }
// }

export {Page};