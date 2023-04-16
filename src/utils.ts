//import { EmojiConvertor } from "emoji-js";
import * as EmojiConvertor from 'emoji-js/lib/emoji.js';

function emoji(content: string): string{
    let em = new EmojiConvertor();
    return em.replace_colons(content);
}

export {emoji};