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
            meta(name="google-site-verification", content="nQFox3xYHxx1o-9IYoKZeqCV3yE2mgz-E5DXGzAoIx8")
            meta(name="description", content="Stasja Fedorova's personal blog, lopbjorn.")
            meta(name="author", content="Stasya00")
            meta(name="keywords", content="lopbjorn, Stasya00, Blog, Tech, linguistics, svenska, 3D, cuisine, guide, architecture, arkitektur")

            meta(property="og:title", content="Lopbjorn: en helt okritisk blog")
            meta(property="og:type", content="website")
            meta(property="og:image", content="/lopbjorn/assets/homepage_social_card.png")
            meta(property="og:url", content="https://stasya00.github.io/lopbjorn/")

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
                            div(section, cls="title")
                            raw(section_content[BlogStructure.logo_key])
                        for article in section_content[BlogStructure.article_key][0]:
                            div(article, cls="title")
                            cls.article(article)

class ArticlePage(Page):
    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def article(value):
        return raw(mistune.markdown(emoji.emojize(value)))
    
    @classmethod
    def body(cls, doc, value:str):
        with doc:
            with div(id='root'):
                with div(id="article"):
                    cls.article(value)
