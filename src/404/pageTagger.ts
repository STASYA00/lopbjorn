import { PANEL_ID_ARTICLE, PANEL_ID_START } from "../constants";
import { TAGS, PAGETYPES, EnumDictionary, LANGUAGES} from "./tagManager";
import { tagsettersdict, TagSetterFactory, TagSetter } from "./tagsetter";


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
        for (let i=0; i<Object(TAGS).length; i++){
            console.log(a[i]);
            this.tagsetters[a[i].value] = this.factory.make(a[i].value);
        }
    }
    make(id: string, article: string=""){
        this.setData(id, article);
        for (let tag in TAGS){
            this.tags[tag] = this.tagsetters[tag].get(this.id, this.name);
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

