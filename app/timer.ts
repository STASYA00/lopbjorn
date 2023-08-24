class Timer{
    current: number
    constructor(){
        this.current = this.reset();
    }

    private reset(): number{
        return new Date().getTime();
    }

    get():number{
        let diff = this.reset() - this.current;
        this.restart();
        console.log(`Operation took ${Math.floor(0.001 * diff / 60)} min ${0.001 * diff % 60} s`);
        return diff;
    }
    restart():void{
        this.current = this.reset();
    }
}

export {Timer};