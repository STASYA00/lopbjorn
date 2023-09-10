from enum import Enum

class ENVVAR(Enum):
    BUCKET = "lopbjorn"
    ARTICLE_PREFIX = "article"
    LOGO_PREFIX = "logo"
    DEFAULT_LOGO_PREFIX = "Books/logo"
    TITLE = "Lopbjorn"

    SECTION_CLS = "section"
    AD_CLS = "ad"
    ARTICLE_CLS = "article"
    TITLE_CLS="title"
    MAIN_CLS = "main"
    KEY = "content"

    SECTION_TITLE = "section_title"
    SECTION_ARTICLE = "section_article"
    SECTION_ARTICLE_TITLE = "section_article_title"
    SECTION_ARTICLE_TWEET = "section_article_tweet"
    SECTION_OTHER = "section_other"
    OTHER = "other"
    

class ENDPOINTS(Enum):
    STRUCTURE = "https://us-central1-website-382116.cloudfunctions.net/get_structure"
    SECTION   = "https://us-central1-website-382116.cloudfunctions.net/get_section"
    ARTICLE   = "https://us-central1-website-382116.cloudfunctions.net/get_article"