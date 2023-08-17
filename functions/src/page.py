import dominate
from dominate.tags import *
from dominate.util import raw
import mistune
import emoji

from uuid import uuid4

from functions.src.constants import ENVVAR
from functions.src.bucket_manager import BlogStructure

class Page:
    def __init__(self) -> None:
        self._content = {}

    @staticmethod
    def header(doc):
        with doc.head:
            link(rel='stylesheet', href='/lopbjorn/css/style.css')
            script(type='text/javascript', src='/lopbjorn/js/request.js')
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
            return div(id=str(uuid4()), cls=ENVVAR.ARTICLE_CLS.value, 
            onclick="loadPage('Article', '', '{}')".format(name))
        return div(id=str(uuid4()), cls=ENVVAR.ARTICLE_CLS.value,
            onclick="loadPage('Article', '', '{}')".format(name))

    @classmethod
    def body(cls, doc, value:BlogStructure):
        with doc:
            with div(id='root'):
                with div(id="panel"):
                    for section, section_content in value.content.items():
                        with cls.section():
                            raw(section_content[BlogStructure.logo_key])
                        for article in section_content[BlogStructure.article_key][0]:
                            
                            cls.article(article)

class ArticlePage(Page):
    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def article(value):
        return mistune.markdown(emoji.emojize(raw(value)))
    
    @classmethod
    def body(cls, doc, value:str):
        with doc:
            with div(id='root'):
                with div(id="article"):
                    cls.article(value)
