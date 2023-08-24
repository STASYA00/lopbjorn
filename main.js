"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
// import {Plot, Record_t} from "./plot_";
const panel_1 = require("./panel");
const request_1 = require("./request");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname + '/static/'));
app.get('/', (req, res) => {
    let key = constants_1.constants.KEY;
    (0, request_1.loadPage)(panel_1.PANELS.HOME).then(content => {
        res.send(content.content);
    });
});
app.get('/article/:name', (req, res) => {
    console.log("article endpoint");
    let name = req.params.name;
    let key = constants_1.constants.KEY;
    console.log(name);
    (0, request_1.loadPage)(panel_1.PANELS.ARTICLE)
        .then(content => {
        res.send(content.content);
    });
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
const localhost = "localhost";
app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Server listening on port ... ${PORT}...`);
});
