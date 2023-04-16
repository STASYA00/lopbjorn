import { PANEL_ID_START } from "../constants";
import { PageTagger } from "./pageTagger";
import { TagManager, TAGS } from "./tagManager";


class PageTagAssigner{
    private tagger: PageTagger;
    private manager: TagManager;
    constructor(){
        this.tagger = new PageTagger();
        this.manager = new TagManager();
    }

    make(id: string=PANEL_ID_START, article: string=""){
        this.tagger.make(id, article);
        let result = this.tagger.getContent();
        for (let tag in TAGS){
            this.manager.updateTag(tag, result[tag]);
        }
        
    }
}

export {PageTagAssigner};