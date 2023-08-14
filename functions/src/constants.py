from enum import Enum

class ENVVAR(Enum):
    BUCKET = "lopbjorn"
    ARTICLE_PREFIX = "article"
    LOGO_PREFIX = "logo"
    DEFAULT_LOGO_PREFIX = "Books/logo"
    TITLE = "Lopbjorn"

    SECTION_CLS = "section"
    ARTICLE_CLS = "article"
    KEY = "content"

class ENDPOINTS(Enum):
    STRUCTURE = "https://us-central1-website-382116.cloudfunctions.net/get_structure"
    ARTICLE  = "https://us-central1-website-382116.cloudfunctions.net/get_article"