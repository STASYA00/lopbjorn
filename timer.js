"use strict";
exports.__esModule = true;
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer() {
        this.current = this.reset();
    }
    Timer.prototype.reset = function () {
        return new Date().getTime();
    };
    Timer.prototype.get = function () {
        var diff = this.reset() - this.current;
        this.restart();
        console.log("Operation took ".concat(Math.floor(0.001 * diff / 60), " min ").concat(0.001 * diff % 60, " s"));
        return diff;
    };
    Timer.prototype.restart = function () {
        this.current = this.reset();
    };
    return Timer;
}());
exports.Timer = Timer;
