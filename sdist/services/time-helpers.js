"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeHelpers = /** @class */ (function () {
    function TimeHelpers() {
        this.date = new Date();
        this.day = this.date.getDay();
        this.hour = this.date.getHours();
        this.min = this.date.getMinutes();
    }
    TimeHelpers.prototype.todayOrTomorrow = function (time) {
        var timeArr = time.split(':'); // Question out
        var timeH = parseInt(timeArr[0]);
        var timeM = parseInt(timeArr[1]);
        if (timeH < this.hour) {
            return "tomorrow";
        }
        else if (timeH > this.hour) {
            return "today";
        }
        else if (timeH === this.hour) {
            if (timeM < this.min) {
                return "tomorrow";
            }
            else if (timeM > this.min) {
                return "today";
            }
            else {
                return "tomorrow";
            }
        }
        else {
            throw new Error('Something was unaccounted for when determining the next time this alarm goes off!');
        }
    };
    TimeHelpers.isMilitaryTime = function (time) {
        return new Promise(function (resolve, reject) {
            var militaryRe = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)?$/;
            if (militaryRe.test(time)) {
                resolve(time);
            }
            else {
                reject('alarms time');
            }
        });
    };
    TimeHelpers.orderTimes = function (a, b) {
        var timeA = a.time.split(':').reduce(function (acc, time) { return (60 * acc) + +time; });
        var timeB = b.time.split(':').reduce(function (acc, time) { return (60 * acc) + +time; });
        var comp = 0;
        if (timeA > timeB) {
            comp = 1;
        }
        else if (timeB > timeA) {
            comp = -1;
        }
        return comp;
    };
    // WHAT DAY OF THE WEEK IS COMING NEXT? CURRENTLY NOT IN USE, BUT MAY BE USEFUL LATER
    TimeHelpers.prototype.dayOfTheWeek = function (time) {
        var timeArr = time.split(':');
        var timeH = parseInt(timeArr[0]);
        var timeM = parseInt(timeArr[1]);
        var dayNum;
        if (timeH < this.hour) {
            dayNum = this.day + 1;
        }
        else if (timeH > this.hour) {
            dayNum = this.day;
        }
        else if (timeH === this.hour) {
            if (timeM < this.min) {
                dayNum = this.day + 1;
            }
            else if (timeM > this.min) {
                dayNum = this.day;
            }
            else {
                dayNum = this.day + 1;
            }
        }
        return TimeHelpers.dayNumToString(dayNum);
    };
    TimeHelpers.dayNumToString = function (dayNum) {
        switch (dayNum) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
            default:
                day = "not a day in the western calendar";
        }
        return day;
    };
    return TimeHelpers;
}());
exports.default = TimeHelpers;
//# sourceMappingURL=time-helpers.js.map