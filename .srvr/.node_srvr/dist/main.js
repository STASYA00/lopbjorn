"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const marked_1 = require("marked");
const emoji_js_1 = require("emoji-js");
dotenv_1.default.config();
const em = new emoji_js_1.EmojiConvertor();
em.replace_mode = "unified";
em.allow_native = true;
const app = (0, express_1.default)();
const port = 3001; //process.env.PORT;
app.get('/', (req, res) => {
    res.send(em.replace_colons(marked_1.marked.parse('##Express + TypeScript Server :cherry:')));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
