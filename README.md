# lopbjorn

### How to develop

```
npm run dev
```

```
 tsc --module system --moduleResolution node --target es2021 --out ../js/main.js main.ts
```

### Developer notes

Idea: have a website on gitpages, html only that would receive content from GCF.

On GCF:

* main page (constructed from the content on cloud bucket -> sections and articles )
* article pages (basic markdown rendering)
* later - section pages

__Frontend functions__
1. get_main_page
1. get_article_page(article_name:str)
1. get_section_page(section_name:str)

__Backend functions__
1. get_structure -> {section1: [article1, article2, article3]}
1. get_article(article) -> "Article Title \n ksdfhalk"
1.  