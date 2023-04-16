import { EmojiConvertor } from "emoji-js";

function emoji(content: string): string{
    let emoji = new EmojiConvertor();
    return emoji.replace_colons(content);
}

export {emoji};