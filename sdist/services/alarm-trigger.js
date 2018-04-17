"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DATABASE
var pg = require("pg");
var queries_1 = require("../data-access/queries");
// HELPERS
var time_helpers_1 = require("../services/time-helpers");
var AlarmTrigger = /** @class */ (function () {
    function AlarmTrigger(dbInfo) {
        this.dbInfo = dbInfo;
        this.maxRingTime = 10;
        this.maxSnoozeTime = 10;
    }
    AlarmTrigger.prototype.init = function () {
        var _this = this;
        var pool = new pg.Pool(this.dbInfo);
        pool.connect()
            .then(function (client) {
            _this.querySvc = new queries_1.default(client);
            return _this.querySvc;
        })
            .catch(function (e) {
            console.log('error connecting to pool in alarm');
            console.log(e);
            return e;
        });
    };
    // snoozing(user_uuid, alarm) {
    //     return this.querySvc.getUserSettings([user_uuid])
    //         .then(settings => {
    //             setTimeout(
    //                 () => {
    //                     this.querySvc.updateAlarmState(['ringing', alarm.alarm_uuid])
    //                 }, 
    //                 (settings.snooze_length*1000)
    //             )
    //         })
    //         .catch(e => {
    //             console.log('error at snoozing in alarm clock', e)
    //         })
    // }
    AlarmTrigger.prototype.matchTime = function (alarms) {
        for (var i = 0; i < alarms.length; i++) {
            var time = alarms[i].time, state = alarms[i].state, title = alarms[i].title, alarm = alarms[i].alarm_uuid, user = alarms[i].user_uuid;
            if (time === this.now()) {
                console.log('-----STARTS RINGING!!!------');
                this.querySvc.updateAlarmState(['ringing', alarm]);
            }
            else if (state === 'ringing') {
                console.log('------RINGING!!!!------');
                if (time_helpers_1.default.parseStringTime(this.now()) > time_helpers_1.default.parseStringTime(time) + this.maxRingTime + delay) {
                    console.log('--------MISSED ALARM---------');
                    this.querySvc.insertDismiss([alarm, user]);
                    this.querySvc.updateAlarmState(['pending', alarm]);
                }
            }
            else if (state === 'snoozing') {
                console.log('--------SNOOZING---------');
                if (time_helpers_1.default.parseStringTime(this.now()) > time_helpers_1.default.parseStringTime(time) + this.maxSnoozeTime + delay) {
                    console.log('--------SNOOZE OVER---------');
                    this.querySvc.updateAlarmState(['ringing', alarm]);
                    console.log('before', this.maxRingTime);
                    this.maxRingTime = this.maxRingTime + this.maxRingTime;
                    console.log('before', this.maxRingTime);
                }
            }
            else {
                console.log('--------pending---------');
            }
        }
    };
    AlarmTrigger.prototype.now = function () {
        var date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    };
    AlarmTrigger.prototype.start = function () {
        var _this = this;
        this.init();
        setInterval(function () {
            _this.querySvc.getAllActiveAlarms([])
                .then(function (alarms) { return _this.matchTime(alarms); })
                .catch(function (e) { return console.log(e); });
        }, 1000);
    };
    return AlarmTrigger;
}());
exports.default = AlarmTrigger;
//# sourceMappingURL=alarm-trigger.js.map