"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlarmsSvc = /** @class */ (function () {
    function AlarmsSvc(querySvc, user, inputs) {
        this.alarm;
        this.inputs = inputs;
        this.user = user;
        this.querySvc = querySvc;
    }
    AlarmsSvc.prototype.getDaysOfWeek = function () {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid]);
    };
    AlarmsSvc.prototype.getAlarm = function () {
        return this.querySvc.getAlarm([this.inputs.alarm_uuid, this.user.uuid]);
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
    return AlarmsSvc;
}());
exports.default = AlarmsSvc;
//# sourceMappingURL=logic-alarms.js.map