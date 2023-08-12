const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
var HTMLParser = require('node-html-parser');
app.use(cors());
const port = 3000;

const marked = require("marked");
marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function(code, lang) {
	  const hljs = require('highlight.js');
	  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
	  return hljs.highlight(code, { language }).value;
	},
	gfm: true,
	breaks: false,
  });
const emoji = require("emoji-js");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ "keyFilename": "../.assets/key.json" });
const BUCKET_NAME = "articles_website";
const FNAME = "Other/30_dagar_av_poke/article.md";

var em = new emoji();
em.replace_mode = "unified";
em.allow_native = true;

app.get("/", (req, res) => {
	storage.bucket(BUCKET_NAME).file(FNAME).download().then(
		(contents) => {

			res.send({"section": "Other", "article": "30_dagar_av_poke",
				"content": em.replace_colons(marked.parse(contents.toString()))});
		}
	);
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
		
		r = r[0].filter(f => f.name.endsWith(`${name}/article.md`));
		fs.readFile("template.html", function (error, html) {
			if (error) {
			  throw error;
			}
			
			let root = HTMLParser.parse(html.toString());
			console.log(root);
			
			a = root.querySelectorAll('meta');
			a.forEach(element => {
				console.log(Object.keys(element.attributes)[0]);
				let key = Object.keys(element.attributes)[0];
				console.log(element.getAttribute(key));
			});
			a[2].setAttribute("content", name.replaceAll("_", " "));
			console.log(a[2]);
		
			if (r.length>0){
				let section = r[0].name.substring(0, r[0].name.lastIndexOf("article.md")-1);
				section = section.substring(0, section.lastIndexOf("/"));

				r[0].getMetadata().then(
					(meta) => {
						meta = meta[0];
						console.log(meta.updated);
						return r[0].download().then(

							(contents) => {
								
								res.send({"content":{
											"article": name,
											"section": section,
											"updated": meta.updated,
											"created": meta.timeCreated,
											"text": em.replace_colons(marked.parse(contents.toString()))
											}
										});
										}
									);

								});
	
	
							}
			else {
				console.log(234);
				return res.send({
					"article": "", "text": "", "section":""
				});

			}
		
	});
});
	
});

app.get("/meta", (req, res) => {
	storage.bucket(BUCKET_NAME).file(FNAME).getMetadata().then(
		(meta) => {
			meta = meta[0];
			console.log(meta);

			res.send(`${meta.timeCreated} ${meta.updated}`);
		}
	);
	//res.send(em.replace_colons(marked.parse("## TEST :cherry:")));
});
app.listen(port, () => {
	console.log(em.replace_colons(`:smile: Example app listening on port {$port}`));
});

