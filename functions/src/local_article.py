import re
from enum import Enum

class KWRD(Enum):
    BOCKER = "Bocker"
    SAMHALLET = "Samhallet"
    SPRAK = "Sprak"
    SVERIGE = "Sverige"
    TECH = "Tech"
    ARCH = "Architecture"
    DESIGN = "Design"
    AUTOMATION = "Automation"
    DDD = "3D"
    SPORT = "Sport"

    @classmethod
    def find(cls, value:str):
        for m in [cls[x] for x in cls.__members__]:
            if m.value.lower() == value.lower() or m.value.lower() in value.lower() \
                or value.lower() in m.value.lower():
                return m
            
class TAGS(Enum):
    INTRO = "Intro"
    KWRD = "kwrd"

class LocalArticle:
    main_sep = "\n\n\n"
    sec_sep = "\n"
    kwrd_re = "div>(\w*?)</div"
    repl_d = {
        "å": "a",
        "ö": "o",
        "ä": "a",
        " ": "_"
    }

    def __init__(self, fname:str) -> None:
        self._fname = fname
        self._content = self._load()

    @property
    def kwrd(self):
        k = self._content.split(self.main_sep)[1]
        return ",".join([KWRD.find(x).value for x in re.findall(self.kwrd_re, k)])
    
    @property
    def title(self):
        return self._content.split(self.main_sep)[0][2:]
    
    @property
    def blob_name(self):
        b = self.title
        for k, v in self.repl_d.items():
            b = b.replace(k, v)
        return re.sub(r'[^\w\s]','', b)
    
    @property
    def intro(self):
        return self._content.split(self.main_sep)[1].split(self.sec_sep)[2]

    def _load(self):
        with open(self._fname, "r") as f:
            f1 = f.read()
        return f1



if __name__=="__main__":
    fname = "../../.assets/sapiens.md"
    stub = LocalArticle(fname)
    print("Title", stub.title)
    print("kwrd", stub.kwrd)
    print("----")
    print("intro", stub.intro)