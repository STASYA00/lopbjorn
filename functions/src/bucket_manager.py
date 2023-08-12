
from constants import ENVVAR
from utils import get_env

from google.cloud import storage

class BlogStructure:
    def __init__(self) -> None:
        self._content = {}

    @property
    def content(self)->dict:
        return {key:value for key, value in self._content.items()}
    
    def __call__(self, section, article=None)->None:
        if not section in self._content.keys():
            self._content[section] = []
        if article:
            if not article in self._content[section]:
                self._content[section].append(article)


class BucketManager:
    def __init__(self) -> None:
        
        self._client = storage.Client()
        self._bucket = self._client.bucket(get_env(ENVVAR.BUCKET.value))

    @staticmethod
    def is_section(title)->bool:
        return title.index("/")==len(title)-1
    
    @staticmethod
    def is_article(title, current_section)->bool:
        return (title.startswith(current_section) and current_section!="" and title[-1]=="/")
    
    def get_article(self, section, article):
        return self.get_element("{}/{}/{}.md".format(section, article,
                                                     ENVVAR.ARTICLE_PREFIX.value ))

    def get_element(self, name):
        blob = self._bucket.blob(name)
        return blob.open("r").read()

    def get_structure(self)->BlogStructure:
        content = BlogStructure()
        current_section = ""

        try:
            blobs = self._bucket.list_blobs()
        except Exception as e:
            print(e)
            return content

        
        for blob in blobs: 
            try:
                if ( BucketManager.is_section(blob.name) ):
                    content(blob.name[:-1])
                    current_section = blob.name[:-1]
                else:
                    if BucketManager.is_article(blob.name, current_section):
                        content(current_section, blob.name[len(current_section)+1:-1])

            except Exception as e:
                print(e)
                print("Failed on section {}, element {}".format(current_section, blob.name) )
        return content