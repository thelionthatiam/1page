"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addLeadingZeros(number) {
    if (number < 10) {
        return '0' + number.toString();
    }
    return number;
}
function theTime() {
    var clock = new Date();
    var h = clock.getHours();
    var m = addLeadingZeros(clock.getMinutes());
    var s = addLeadingZeros(clock.getSeconds());
    return h + ':' + m;
}
function intervalTimer() {
    setInterval(function () { theTime(); }, 1000);
}
exports.intervalTimer = intervalTimer;
//# sourceMappingURL=clock.js.map