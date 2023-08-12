import { constants } from "./constants";
import { File } from '@google-cloud/storage';

const test_structure = {
    "content": [
        {"section" :"Tech", "articles": ["Simple_Website_with_Typescript", "Simple_Website_with_Typescript"]},
        {"section" :"Other", "articles": []},
        {"section" :"Languages", "articles": ["dasf", "gDS", "sf", "etre", "sef"]},
    ]
}

interface SectionInterface{
    section: string;
    articles: string[];
}

interface Structure{
    content: SectionInterface[];
}

class BlogStructure{
    private sections: SectionStructure[];
    private del: string;
     
    constructor(){
        this.sections = [];
        this.del = "/";
    }

    getLength(): number{
        return this.sections.length;
    }

    getSections(): SectionStructure[]{
        
        let _sections = this.sections.map(x => x);
        return _sections;
    }

    load(fls: File[]){
        
        fls.forEach(f =>{
            
            if (f.name.split(this.del).length==2){
                let sectionName = f.name.substring(0, f.name.length-1);
                let structure = new SectionStructure(sectionName);
                this.sections.push(structure);
            }
            else if (f.name.split(this.del).length==3 && f.name.endsWith(this.del)){
                let sectionName = f.name.substring(0, f.name.indexOf(this.del));
                let articleName = f.name.substring(f.name.indexOf(this.del)+1, f.name.length-1);
                if (articleName!="article.m"){
                    this.sections.filter(v => v.name==sectionName)[0].add(articleName);
                }
                
            }
        });
        
        return this.sections;
        };

    load_test(){
        let res = test_structure["content"] as SectionInterface[];
        res.forEach(r => {
            let structure = new SectionStructure(r.section);
            r.articles.forEach(article => structure.add(article));
            this.sections.push(structure);
        });
        return res;
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
