import express from 'express';
import cors from "cors";

import { constants } from './constants';
// import {Plot, Record_t} from "./plot_";
import { PANELS } from './panel';
import {Timer} from './timer';
import { loadPage, Result } from "./request"


const app = express();
app.use(cors());
app.use(express.static(__dirname + '/static/'));


app.get('/', (req, res) => {
    let key = constants.KEY;
    loadPage(PANELS.HOME).then(content =>{
        
            res.send(content.content)});
});


app.get('/article/:name', (req, res)=>{
    console.log("article endpoint");
    let name = req.params.name;
    let key = constants.KEY;
    console.log(name);
    loadPage(PANELS.ARTICLE)
    .then(content =>{
        
        res.send(content.content)});
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
const localhost = "localhost" as string;

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server listening on port ... ${PORT}...`);
});