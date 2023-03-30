import {Characteristic} from "./characteristic";

class Shoe{
    id: string;
    name: string;
    properties: Characteristic[];
    descr: string;
    constructor(id:string, name: string){
        this.id = id;
        this.name = name;
        this.descr = "";
        this.properties = [];
    }
}

class ShoeFactory{
    static make(name:string){
        
        return new Shoe("", name);
    }
}

interface ShoeInterface{
    name: string;

}

enum SHO {
    PUREBOOST, ULTRABOOST, PEGASUS, ADRENALINE, ADIOS, HOKA, SALOMON
};
enum SHOEBRANDS {ADIDAS, BROOKS, NIKE, HOKA, SALOMON};

const ShoeNames = new Map<SHO, string>([
    [SHO.PUREBOOST, "Pureboost"],
    [SHO.ULTRABOOST, "Ultraboost"],
    [SHO.PEGASUS, "Pegasus 38"],
    [SHO.ADIOS, "Adios 7"],
    [SHO.ADRENALINE, "Adrenaline GTS22"],
    [SHO.HOKA, "One One Speedgoat 4"],
    [SHO.SALOMON, "Salomon"],
]
);
const ShoeBrandsNames = new Map<SHOEBRANDS, string>([
    [SHOEBRANDS.ADIDAS, "Adidas"],
    [SHOEBRANDS.NIKE, "Nike"],
    [SHOEBRANDS.BROOKS, "Brooks"],
    [SHOEBRANDS.HOKA, "Hoka"],
    [SHOEBRANDS.SALOMON, "Salomon"],
]
);

const ShoeBrands = new Map<SHO, SHOEBRANDS>([
    [SHO.PUREBOOST, SHOEBRANDS.ADIDAS],
    [SHO.ULTRABOOST, SHOEBRANDS.ADIDAS],
    [SHO.PEGASUS, SHOEBRANDS.NIKE],
    [SHO.ADIOS, SHOEBRANDS.ADIDAS],
    [SHO.ADRENALINE, SHOEBRANDS.BROOKS],
    [SHO.HOKA, SHOEBRANDS.HOKA],
    [SHO.SALOMON, SHOEBRANDS.SALOMON],
]
);
