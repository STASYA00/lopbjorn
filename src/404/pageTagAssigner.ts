import { constants, PANEL_ID_START } from "../constants";
import { PageTagger } from "./pageTagger";
import { TagIterator, TagManager, TAGS } from "./tagManager";


class PageTagAssigner{
    private tagger: PageTagger;
    private manager: TagManager;
    constructor(){
        this.tagger = new PageTagger();
        this.manager = new TagManager();
    }

    make(id: string=PANEL_ID_START, article: string=constants.SITE_NAME){
        this.tagger.make(id, article);
        let result = this.tagger.getContent();
        for (let tag of TagIterator.run()){
            this.manager.updateTag(tag, result[tag]);
        }
    }
}

export {PageTagAssigner};