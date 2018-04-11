"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlarmsSvc = /** @class */ (function () {
    function AlarmsSvc(querySvc, user, inputs) {
        this.alarm;
        this.inputs = inputs;
        this.user = user;
        this.querySvc = querySvc;
    }
    AlarmsSvc.prototype.orderTimes = function (a, b) {
        var timeA = parseInt(a.time);
        var timeB = parseInt(b.time);
        var comp = 0;
        if (timeA > timeB) {
            comp = 1;
        }
        else if (timeB > timeA) {
            comp = -1;
        }
        return comp;
    };
    AlarmsSvc.prototype.getUserAlarms = function () {
        var _this = this;
        return this.querySvc.getUserAlarms([this.user.uuid])
            .then(function (alarms) {
            var sortedAlarms = alarms.sort(_this.orderTimes);
            return sortedAlarms;
        });
    };
    AlarmsSvc.prototype.getDaysOfWeek = function () {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.getAlarm = function () {
        return this.querySvc.getUserAlarm([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.updateAlarmTime = function () {
        return this.querySvc.updateAlarmTime([this.inputs.time, this.inputs.alarm_uuid, this.user.uuid]);
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
        return this.querySvc.updateDaysOfWeek(this.weekObjToQueryValues());
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
    TimeHelpers.prototype.nextActiveAlarm = function (time) {
        var timeArr = time.split(':');
        var timeH = parseInt(timeArr[0]);
        var timeM = parseInt(timeArr[1]);
        console.log('time', timeH, 'h', this.hour);
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
        console.log('running');
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
//# sourceMappingURL=logic-alarms.js.map