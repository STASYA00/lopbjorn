//import { EmojiConvertor } from "emoji-js";
import EmojiConvertor from '../js/emoji';

function emoji(content: string): string{
    let em = new EmojiConvertor();
    return em.replace_colons(content);
}

export {emoji};