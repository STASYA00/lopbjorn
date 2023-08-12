from enum import Enum

class ENVVAR(Enum):
    BUCKET = "lopbjorn"
    ARTICLE_PREFIX = "article"
    TITLE = "Lopbjorn"

class ENDPOINTS(Enum):
    STRUCTURE = "https://us-central1-website-382116.cloudfunctions.net/get-structure"