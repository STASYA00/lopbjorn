import dominate
from dominate.tags import *
from dominate.util import raw

from uuid import uuid4

from functions.src.constants import ENVVAR
from functions.src.bucket_manager import BlogStructure

class Page:
    def __init__(self) -> None:
        self._content = {}

    @staticmethod
    def header(doc):
        with doc.head:
            link(rel='stylesheet', href='./css/style.css')
            script(type='text/javascript', src='./js/request.js')
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
    def section(name=""):
        if name:
            return div(name, id=str(uuid4()), cls=ENVVAR.SECTION_CLS.value)
        return div(id=str(uuid4()), cls=ENVVAR.SECTION_CLS.value)
    
    @staticmethod
    def article(name=""):
        if name:
            return div(name, id=str(uuid4()), cls=ENVVAR.ARTICLE_CLS.value, 
            onclick="loadPage('Article', '', name)")
        return div(id=str(uuid4()), cls=ENVVAR.ARTICLE_CLS.value,
            onclick="loadPage('Article', '', name)")

    @classmethod
    def body(cls, doc, value:BlogStructure):
        with doc:
            with div(id='root'):
                with div(id="panel"):
                    for section in value.content:
                        # cls.section()
                        with cls.section():
                            raw(section.logo)
                        for article in section.articles:
                            cls.article()

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
