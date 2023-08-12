import dominate
from dominate.tags import *
from dominate.util import raw

from uuid import uuid4

from src.constants import ENVVAR
from src.bucket_manager import BlogStructure

class Page:
    def __init__(self) -> None:
        self._content = {}

    @staticmethod
    def header(doc):
        with doc.head:
            link(rel='stylesheet', href='style.css')
            script(type='text/javascript', src='script.js')
            meta(name="description", content="test description")

    @classmethod
    def body(cls, doc, value):
        with doc:
            with div(id='root'):
                with div(id="panel"):
                    for i in value:
                        div(id=i, cls=ENVVAR.SECTION_CLS.value)

    @classmethod
    def make(cls, value=None):
        doc = dominate.document(title=ENVVAR.TITLE.value)
        Page.header(doc)
        cls.body(doc, value)
        return str(doc)

class HomePage(Page):
    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def section(name):
        return div(name, id=str(uuid4()), cls=ENVVAR.SECTION_CLS.value)
    
    @staticmethod
    def article(name):
        return div(name, id=str(uuid4()), cls=ENVVAR.ARTICLE_CLS.value)

    @classmethod
    def body(cls, doc, value:BlogStructure):
        with doc:
            with div(id='root'):
                with div(id="panel"):
                    for section in value.content.keys():
                        cls.section(section)
                        for article in value.content[section]:
                            cls.article(article)

class ArticlePage(Page):
    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def article(value):
        return raw(value)
    
    @classmethod
    def body(cls, doc, value:str):
        with doc:
            with div(id='root'):
                cls.article(value)
