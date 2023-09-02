from google.cloud import storage


from functions.src.constants import ENVVAR
from functions.src.utils import get_env, flatten
from copy import deepcopy
from enum import Enum

class TagKeys(Enum):
    INTRO = "Intro"
    KWRD = "kwrd"
class Section:
    def __init__(self, name):
        self._name = name
        self._articles = []
        self._logo = ""
    @property
    def name(self):
        return self._name
    @property
    def articles(self):
        return [x for x in self._articles]
    @articles.setter
    def articles(self, value:str):
        self._articles.append(value)
    @property
    def logo(self):
        return self._logo
    @logo.setter
    def logo(self, value):
        self._logo = value

class Article:
    def __init__(self, name:str, intro:str, kwrd:list[str], upd) -> None:
        self._name = name
        self._kwrd = kwrd
        self._intro = intro
        self._upd = upd

    @property
    def name(self):
        return self._name
    
    @property
    def upd(self):
        return self._upd
    
    @property
    def intro(self):
        return self._intro
    
    @property
    def kwrd(self):
        return self._kwrd
    
    @property
    def to_dict(self):
        return {self._name: {
            TagKeys.INTRO: self._intro,
            TagKeys.KWRD: self._kwrd
        }}
    
class Logo:
    def __init__(self, name:str, svg:str) -> None:
        self._name:str = name
        self._content:str = svg

    @property
    def name(self):
        return self._name
    
    @property
    def content(self):
        return self._content
    
    @property
    def to_dict(self):
        return {self._name: self._content}

class BlogStructure:
    logo_key="logo"
    main_logo="main_logo"
    article_key = "articles"

    def __init__(self) -> None:
        self._content = []

    @property
    def content(self)->dict:
        return {s.name: {BlogStructure.logo_key:s.logo, 
                         BlogStructure.article_key: s.articles} for s in self._content}

    @content.setter
    def content(self, value)->None:
        for key, v in value.items():
            self._content.append(Section(key))
            self._content[-1].logo = v[BlogStructure.logo_key]
            self._content[-1].articles = v[BlogStructure.article_key]

    
    def __call__(self, section, article=None)->None:
        if not section in [x.name for x in self._content]:
            self._content.append(Section(section))
            try:
                self._content[-1].logo = BucketManager.get_element(
                    "{}/{}.svg".format(section, ENVVAR.LOGO_PREFIX.value))
            except Exception as e:
                self._content[-1].logo = BucketManager.get_element(
                    "{}.svg".format(ENVVAR.DEFAULT_LOGO_PREFIX.value))

        if article:
            _ind = [x for x in range(len(self._content)) if section==self._content[x].name][0]
            if not article in self._content[_ind].articles:
                self._content[_ind].articles = article

class BlogStructureUpd(BlogStructure):
    logo_folder = "Tags"
    
    def __init__(self) -> None:
        super().__init__()
        self._logos:list[Logo] = []
        self._content:list[Article] = []

    @property
    def logos(self)->list[Logo]:
        return self._logos

    @property
    def content(self)->dict:
        return {
            BlogStructure.logo_key: [x.to_dict for x in self._logos], 
            BlogStructure.article_key: [x.to_dict for x in self._content]
                }
    
    def add_logo(self, kwrd:str, svg:str):
        self._logos.append(Logo(kwrd, svg))

    @staticmethod
    def get_article_name(self, filepath):
        return filepath[len(BucketManager.article_folder)+1: -(len(BucketManager.article_name) + 1)]

    def __call__(self, article_blob) -> None:
        self._content.append(Article(self.get_article_name(article_blob.name), 
                                     article_blob.metadata["Intro"],
                                     article_blob.metadata["kwrd"],
                                     article_blob.updated
                                     ))


class RelevantContent:
    limit = 50
    other = "other"

    @classmethod
    def articles(cls, blog: BlogStructureUpd)->list[Article]:
        return sorted(blog.content, key=lambda s: s.upd)[:cls.limit]
    
    @classmethod
    def tags(cls, blog: BlogStructureUpd)->list[str]:
        return list(set(flatten([x.kwrd for x in cls.articles(blog)])))
    
    @classmethod
    def content(cls, blog:BlogStructureUpd)->dict:
        _kwrds = flatten([x.kwrd for x in cls.articles(blog)])
        _cardinality = sorted(set(_kwrds), key=lambda s: _kwrds.count(s), 
                              reverse=True)
        _content = {k:{
            blog.__class__.logo_key: [x for x in blog.logos if k in x.name],
            blog.__class__.article_key: []} for k in _cardinality}
        _content[cls.other] = []
        for a in cls.articles(blog):
            for k in _content.keys():
                if k in a.kwrd:
                    _content[k][blog.__class__.article_key].append(a)
                    break
            _content[cls.other].append(a)
        return _content
        
    


class BucketManager:
    article_folder = "Articles"
    article_name = "article.md"
    logos_folder = "Tags"
    _bucket = storage.Client().bucket(ENVVAR.BUCKET.value)

    @staticmethod
    def is_section(title)->bool:
        return title.index("/")==len(title)-1

    @staticmethod
    def is_logo(title)->bool:
        return title.endswith(".svg")

    @staticmethod
    def get_section(title)->bool:
        return title[:title.index("/")]
    
    @staticmethod
    def is_article_folder(title, current_section)->bool:
        return (title.startswith(current_section) and current_section!="" and title[-1]=="/")
    
    @classmethod
    def is_article(cls, title, current_section)->bool:
        return (title.startswith(current_section) and current_section!="" and title[-1]!="/" and cls.article_name in title)


    @classmethod
    def get_article(cls, article):
        return cls.get_element("{}/{}".format(article, cls.article_name))
        
                
    @classmethod
    def get_article_legacy(cls, article, section=None):
        if section:
            return cls.get_element("{}/{}/{}".format(section, article, cls.article_name ))
        else:
            structure = cls.get_structure()
            for key, value in structure.content.items():
                
                if article in value[BlogStructure.article_key]:
                    return cls.get_article(article, key)
                
    @classmethod
    def get_element(cls, name):
        blob = cls._bucket.blob(name)
        return blob.open("r").read()
    
    @classmethod
    def get_structure(cls)->BlogStructure:
        content = BlogStructureUpd()
        current_section = ""

        try:
            blobs = cls._bucket.list_blobs()
        except Exception as e:
            print(e)
            return content
        
        for blob in blobs: 
            try:
                if cls.is_article(blob.name, 
                                  cls.article_folder):
                    content(blob)
                elif cls.is_logo(blob.name):
                    content.add_logo(blob.name[len(cls.logos_folder)+1:-4], 
                                     cls.get_element(blob.name))

            except Exception as e:
                print(e)
                print("Failed on section {}, element {}".format(current_section, blob.name) )
        return content
    
    @classmethod
    def get_structure_legacy(cls)->BlogStructure:
        content = BlogStructure()
        current_section = ""

        try:
            blobs = cls._bucket.list_blobs()
        except Exception as e:
            print(e)
            return content

        
        for blob in blobs: 
            try:
                if ( cls.is_section(blob.name)):
                    content(blob.name[:-1])
                    current_section = blob.name[:-1]
                else:
                    if cls.is_article_folder(blob.name, current_section):
                        content(current_section, blob.name[len(current_section)+1:-1])
                    elif cls.is_article(blob.name, current_section):
                        print(blob.name)
                        print("METADATA", blob.metadata["Tag"])
                        print(blob.updated)
                        print(blob.created)

            except Exception as e:
                print(e)
                print("Failed on section {}, element {}".format(current_section, blob.name) )
        return content