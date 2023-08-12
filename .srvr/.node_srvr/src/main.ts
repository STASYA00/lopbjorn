import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { marked } from 'marked';
import cors from "cors";
import { readFile } from 'fs';
import { EmojiConvertor } from 'emoji-js';

import { Storage, File } from '@google-cloud/storage';
import parse from 'node-html-parser';

import { Page } from './pageConstructor';
import { constants } from './constants';
import { BlogStructure } from './structure';

const storage = new Storage({ "keyFilename": "../../.assets/key.json" });

const BUCKET_NAME = "lopbjorn";
//const FNAME = "Other/30_dagar_av_poke/article.md";


marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	breaks: false,
  });

dotenv.config();
const em = new EmojiConvertor();
em.replace_mode = "unified";
em.allow_native = true;

const app: Express = express();
app.use(cors());
const port = 3001; //process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send(({"content":`## Express + TypeScript Server :smile:`}));
});

app.get("/main", (req, res) => {
    //let name = req.params.name.substring(1);
    //console.log(name);
    //storage.bucket(BUCKET_NAME).getFiles().then(r => {

    readFile("../template.html", function (error, html) {
        if (error) {
            throw error;
        }

        Page.load(html, "").then(r => {
                console.log(r.toString());
                res.send({ "content": r.toString() });

        });

    });
});

app.get('/structure', (req: Request, res: Response) => {
  
  
	let fls: string[];
	fls = [];
	let delimiter = "/";
	storage.bucket(BUCKET_NAME).getFiles().then(r=>{
		let b = new BlogStructure();
		
		res.send({ "content":JSON.stringify(b.load(r[0]))});		
	});

});

app.post("/article", (req, res) => {
	let params = req.body;
	res.send('Data Received: ' + JSON.stringify(params.data));
	console.log(params.data);
	storage.bucket(BUCKET_NAME).file(`${params.data["section"]}/${params.data["article"]}/article.md`).download().then(
		(contents) => {

			res.send({
				"content": em.replace_colons(marked.parse(contents.toString()))});
		}
	);
});

app.get("/get/:name", (req, res) => {
	let name = req.params.name.substring(1);
	console.log(name);
	storage.bucket(BUCKET_NAME).getFiles().then(r=>{
		
		let r1 = r[0].filter(f => f.name.endsWith(`${name}/article.md`));

		readFile("../template.html", function (error, html) {
			if (error) {
			  throw error;
			}
			//let root = parser.parseFromString(html.toString(), "text/html");
			let root = parse(html.toString());
      if (r1.length>0){
        let content: File = r1[0];
		 
        Page.load(html, content).then(r => {
			res.send({"content": r.toString()});
		});
        
      }
      else{
        console.log("Files not found in the bucket");
        throw new Error;
      }
      

			// if (r1.length>0){
			// 	let section = r1[0].name.substring(0, r1[0].name.lastIndexOf("article.md")-1);
			// 	section = section.substring(0, section.lastIndexOf("/"));

			// 	r1[0].getMetadata().then(
			// 		(meta) => {
			// 			let meta1 = meta[0];
			// 			console.log(meta1.updated);
			// 			return r1[0].download().then(

			// 				(contents) => {
								
			// 					res.send({"content":{
			// 								"article": name,
			// 								"section": section,
			// 								"updated": meta1.updated,
			// 								"created": meta1.timeCreated,
			// 								"text": em.replace_colons(marked.parse(contents.toString()))
			// 								}
			// 							});
			// 							}
			// 						);

			// 					});
	
	
			// 				}
			// else {
			// 	console.log(234);
			// 	return res.send({
			// 		"article": "", "text": "", "section":""
			// 	});

			// }
		
	});
});

});

app.listen(port, () => {
  console.log(em.replace_colons(`⚡️[server]: Server is running at http://localhost:${port} :smile:`));
});