from enum import Enum

class ENVVAR(Enum):
    BUCKET = "lopbjorn"
    ARTICLE_PREFIX = "article"
    TITLE = "Lopbjorn"

    SECTION_CLS = "section"
    ARTICLE_CLS = "article"
    KEY = "content"

class ENDPOINTS(Enum):
    STRUCTURE = "https://us-central1-website-382116.cloudfunctions.net/get-structure"