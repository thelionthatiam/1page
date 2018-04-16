"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("../services/value-objects");
var time_helpers_1 = require("../services/time-helpers");
var AlarmsSvc = /** @class */ (function () {
    function AlarmsSvc(querySvc, user, inputs) {
        this.alarm;
        this.inputs = inputs;
        this.user = user;
        this.querySvc = querySvc;
    }
    AlarmsSvc.prototype.addAlarm = function () {
        var _this = this;
        return time_helpers_1.default.isMilitaryTime(this.inputs.time)
            .then(function () {
            R.AlarmInputs.fromJSON(_this.inputs); // <-- this is where I'm doing validation again??
            return _this.querySvc.insertAlarm([_this.user.uuid, _this.inputs.title, _this.inputs.time]);
        });
    };
    AlarmsSvc.prototype.addTodayOrTomorrowIndicator = function (sortedAlarms) {
        var helper = new time_helpers_1.default();
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
    AlarmsSvc.prototype.removeArchived = function (alarms) {
        var currentAlarms = [];
        for (var i = 0; i < alarms.length; i++) {
            if (!alarms[i].archive) {
                currentAlarms.push(alarms[i]);
            }
        }
        return currentAlarms;
    };
    AlarmsSvc.prototype.getUserAlarms = function () {
        var _this = this;
        return this.querySvc.getUserAlarms([this.user.uuid])
            .then(function (alarms) {
            var currentAlarms = _this.removeArchived(alarms);
            var sortedAlarms = currentAlarms.sort(time_helpers_1.default.orderTimes);
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
        return time_helpers_1.default.isMilitaryTime(this.inputs.time)
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
    AlarmsSvc.prototype.archiveAlarm = function () {
        console.log('archive alarm', this.inputs.alarm_uuid, this.user.uuid);
        return this.querySvc.updateAlarmArchived([true, this.inputs.alarm_uuid, this.user.uuid]);
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
//# sourceMappingURL=logic-alarms.js.map