"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("../services/value-objects");
var AlarmsSvc = /** @class */ (function () {
    function AlarmsSvc(querySvc, user, inputs) {
        this.alarm;
        this.inputs = inputs;
        this.user = user;
        this.querySvc = querySvc;
    }
    AlarmsSvc.prototype.addAlarm = function () {
        var _this = this;
        return TimeHelpers.isMilitaryTime(this.inputs.time)
            .then(function () {
            R.AlarmInputs.fromJSON(_this.inputs); // <-- this is where I'm doing validation again??
            return _this.querySvc.insertAlarm([_this.user.uuid, _this.inputs.title, _this.inputs.time]);
        });
    };
    AlarmsSvc.prototype.addTodayOrTomorrowIndicator = function (sortedAlarms) {
        var helper = new TimeHelpers();
        for (var i = 0; i < sortedAlarms.length; i++) {
            if (sortedAlarms[i].repeat) {
                sortedAlarms[i].nextAlarm = 'schedule below';
            }
            else {
                sortedAlarms[i].nextAlarm = helper.todayOrTomorrow(sortedAlarms[i].time);
            }
        }
        return sortedAlarms;
    };
    AlarmsSvc.prototype.getUserAlarms = function () {
        var _this = this;
        return this.querySvc.getUserAlarms([this.user.uuid])
            .then(function (alarms) {
            var sortedAlarms = alarms.sort(TimeHelpers.orderTimes);
            return _this.addTodayOrTomorrowIndicator(sortedAlarms);
        });
    };
    AlarmsSvc.prototype.getDaysOfWeek = function () {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.getAlarm = function () {
        return this.querySvc.getUserAlarm([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.updateAlarmTime = function () {
        var _this = this;
        return TimeHelpers.isMilitaryTime(this.inputs.time)
            .then(function () {
            return _this.querySvc.updateAlarmTime([_this.inputs.time, _this.inputs.alarm_uuid, _this.user.uuid]);
        });
    };
    AlarmsSvc.prototype.updateAlarmTitle = function () {
        return this.querySvc.updateAlarmTitle([this.inputs.title, this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.toggleActiveAlarm = function () {
        var state;
        this.inputs.active === "true" ? state = false : state = true;
        return this.querySvc.updateAlarmToggleActive([state, this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.weekObjToQueryValues = function () {
        return [
            this.inputs.mon,
            this.inputs.tues,
            this.inputs.wed,
            this.inputs.thur,
            this.inputs.fri,
            this.inputs.sat,
            this.inputs.sun,
            this.user.uuid,
            this.inputs.alarm_uuid
        ];
    };
    AlarmsSvc.prototype.updateDaysOfWeek = function () {
        var _this = this;
        return this.querySvc.updateDaysOfWeek(this.weekObjToQueryValues())
            .then(function () { return _this.querySvc.getUserAlarm([_this.inputs.alarm_uuid, _this.user.uuid]); })
            .then(function (alarm) {
            if (alarm.sun === true ||
                alarm.mon === true ||
                alarm.tues === true ||
                alarm.wed === true ||
                alarm.thur === true ||
                alarm.fri === true ||
                alarm.sat === true) {
                return _this.querySvc.updateAlarmRepeat([true, _this.inputs.alarm_uuid, _this.user.uuid]);
            }
            else {
                return _this.querySvc.updateAlarmRepeat([false, _this.inputs.alarm_uuid, _this.user.uuid]);
            }
        });
    };
    AlarmsSvc.prototype.deleteAlarm = function () {
        return this.querySvc.deleteUserAlarm([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.deleteAllAlarms = function () {
        return this.querySvc.deleteUserAlarms([this.user.uuid]);
    };
    return AlarmsSvc;
}());
exports.default = AlarmsSvc;
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
exports.TimeHelpers = TimeHelpers;
//# sourceMappingURL=logic-alarms.js.map