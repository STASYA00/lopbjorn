from google.cloud import storage


from functions.src.constants import ENVVAR
from functions.src.utils import get_env
from copy import deepcopy

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


class BlogStructure:
    logo_key="logo"
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


class BucketManager:
    # _client = storage.Client()
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
    
    @staticmethod
    def is_article(title, current_section)->bool:
        return (title.startswith(current_section) and current_section!="" and title[-1]!="/" and "article.md" in title)


    @classmethod
    def get_article(cls, article, section=None):
        if section:
            return cls.get_element("{}/{}/{}.md".format(section, article,
                                                     ENVVAR.ARTICLE_PREFIX.value ))
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
        content = BlogStructure()
        current_section = ""

        try:
            blobs = cls._bucket.list_blobs()
        except Exception as e:
            print(e)
            return content

        
        for blob in blobs: 
            try:
                if ( cls.is_section(blob.name) ):
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