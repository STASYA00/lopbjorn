import { File } from '@google-cloud/storage';

import { PANEL_ID_START } from "./constants";
import { TAGS, EnumDictionary, TagIterator} from "./tagManager";
import { TagSetterFactory, TagSetter } from "./tagsetter";


class PageTagger{
    id: string;
    name: string;
    private factory: TagSetterFactory;
    private tags: EnumDictionary<string, string>;
    private tagsetters: EnumDictionary<string, TagSetter>;
    
    constructor(panelId: string=PANEL_ID_START, name:string=""){
        this.id = panelId;
        this.name = name;
        this.factory = new TagSetterFactory();
        this.tags = {};
        this.tagsetters = {};
        this.init();
    }
    private init(){
        let a = Object.getOwnPropertyDescriptors(TAGS);
        for (let tag of TagIterator.run()){
            this.tagsetters[tag] = this.factory.make(tag);
        }
    }
    async make(id: string, content: File | null = null){
        //this.setData(id, article);
        for (let tag of TagIterator.run()){
            this.tags[tag] =  await this.tagsetters[tag].get(this.id, content);
        }
    }   

    getContent():EnumDictionary<string, string>{
        let _tags = {...this.tags};
        return _tags;
    }

    setName(article:string){
        this.name = article;
    }
    setPage(id:string){
        this.id = id;
    }
    setData(id: string, article: string){
        this.name = article;
        this.id = id;
    }
}

export {PageTagger};

