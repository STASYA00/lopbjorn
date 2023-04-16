import { constants } from "./constants";
import { ServerRequest } from "./request";

const test_structure = {
    "content": {
        "Tech": ["Simple_Website_with_Typescript", "Simple_Website_with_Typescript"],
        "Other": [],
        "Languages": ["dasf", "gDS", "sf", "etre", "sef"]

    }
    
}

class BlogStructure{
    private sections: SectionStructure[];
     
    constructor(){
        this.sections = [];
    }

    getLength(): number{
        return this.sections.length;
    }

    getSections(): SectionStructure[]{
        
        let _sections = this.sections.map(x => x);
        return _sections;
    }

    load(){
        let s = new ServerRequest("");
        s.url = constants.STRUCTURE_URL;
        
        return s.call().then( r => {
            let res = r[constants.RESPONSE_PARSE_KEY];
            for (let r in res){
                let structure = new SectionStructure(r);
                structure.add(res[r]);
                this.sections.push(structure);
            }
            // make sections
            localStorage.setItem(constants.CACHE_KEY_STRUCTURE, res);
            return res;
        });
    }

    load_test(){
        let res = test_structure["content"];
        for (let key in res){
            let s = new SectionStructure(key);
            this.sections.push(s)
            res[key].forEach(val => {
                s.add(val);
            });
        }
    }
}

class SectionStructure{
    private content: string[];
    readonly name: string;
    constructor(name:string){
        this.name = name;
        this.content = [];
    }

    add(article:string){
        this.content.push(article);
    }
    

    getContent(): string[]{
        let _content = this.content.map(x => x);
        return _content;
    }

    getLength(): number{
        return this.content.length;
    }
}

export {BlogStructure};
