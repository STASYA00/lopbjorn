"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
class Timer {
    constructor() {
        this.current = this.reset();
    }
    reset() {
        return new Date().getTime();
    }
    get() {
        let diff = this.reset() - this.current;
        this.restart();
        console.log(`Operation took ${Math.floor(0.001 * diff / 60)} min ${0.001 * diff % 60} s`);
        return diff;
    }
    restart() {
        this.current = this.reset();
    }
}
exports.Timer = Timer;
