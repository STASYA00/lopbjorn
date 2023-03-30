class Characteristic{
    name: string;
    score: number;
    total: number;
    value: string;
    constructor(name:string, score:number=0, value:string=""){
        this.name = name;
        this.total = 10;
        this.score = score>=0 && score<=this.total ? score : 0;
        this.value = value;
    }
};



enum CHARACTERISTICS {
    WEIGHT,
    SUPPORT,
    SOFTNESS,
    RESPONSIVENESS,
    UPPER_VENTILATION,
    SURFACE,
    TRAINING,
    TRACTION
};

const CharacteristicNames = new Map<CHARACTERISTICS, string>([
    [CHARACTERISTICS.WEIGHT, "Weight"],
    [CHARACTERISTICS.SUPPORT, "Support"],
    [CHARACTERISTICS.SOFTNESS, "Softness"],
    [CHARACTERISTICS.RESPONSIVENESS, "Responsiveness"],
    [CHARACTERISTICS.UPPER_VENTILATION, "Upper Ventilation"],
    [CHARACTERISTICS.SURFACE, "Surface"],
    [CHARACTERISTICS.TRACTION, "Outsole Traction"],
    [CHARACTERISTICS.TRAINING, "Training"],
]);

export {Characteristic, CharacteristicNames, CHARACTERISTICS};