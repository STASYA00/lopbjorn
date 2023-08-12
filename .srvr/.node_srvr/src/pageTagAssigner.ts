import { File } from '@google-cloud/storage';

import { PANEL_ID_ARTICLE, PANEL_ID_START } from "./constants";
import { PageTagger } from "./pageTagger";
import { TagIterator, TagManager, TAGS } from "./tagManager";


class PageTagAssigner{
    private tagger: PageTagger;
    manager: TagManager;
    constructor(){
        this.tagger = new PageTagger();
        this.manager = new TagManager();
    }

    

    make(content: File | null, root: any = null){
        return this.tagger.make(content? PANEL_ID_ARTICLE: PANEL_ID_START, content).then(
            r => {
                if (root){
                    this.manager.root = root;
                }
                let result = this.tagger.getContent();
                
                for (let tag of TagIterator.run()){
                    this.manager.updateTag(tag, result[tag]);                    
                }
            }
        );
        
    }
}

export {PageTagAssigner};