"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DATABASE
var pg = require("pg");
var queries_1 = require("../data-access/queries");
// HELPERS
var time_helpers_1 = require("../services/time-helpers");
var AlarmClockTrigger = /** @class */ (function () {
    function AlarmClockTrigger(dbInfo) {
        this.dbInfo = dbInfo;
        this.maxRingTime = 10;
    }
    AlarmClockTrigger.prototype.init = function () {
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
    AlarmClockTrigger.prototype.snoozing = function (user_uuid, alarm) {
        var _this = this;
        return this.querySvc.getUserSettings([user_uuid])
            .then(function (settings) {
            setTimeout(function () {
                _this.querySvc.updateAlarmState(['ringing', alarm.alarm_uuid]);
            }, (settings.snooze_length * 1000));
        })
            .catch(function (e) {
            console.log('error at snoozing in alarm clock', e);
        });
    };
    // pretty sure this for loop is blocking
    AlarmClockTrigger.prototype.matchTime = function (alarms) {
        for (var i = 0; i < alarms.length; i++) {
            // mostly for tracking purposes will probably change this
            var time = alarms[i].time, state = alarms[i].state, title = alarms[i].title, alarm = alarms[i].alarm_uuid, user = alarms[i].user_uuid;
            if (time === this.now()) {
                if (state === 'pending') {
                    console.log('-----STARTS RINGING!!!------');
                    this.querySvc.updateAlarmState(['ringing', alarm]);
                }
                else if (state === 'ringing') {
                    console.log('-----aRINGING!!!------');
                }
                else if (state === 'snoozing') {
                    console.log('-----aSNOOZING------');
                }
                else if (state === 'dismissed') {
                    console.log('-----aDISMISSED------');
                }
                else if (state === 'woke') {
                    console.log('-----aWAITING TO RESET------');
                }
            }
            else if (state === 'ringing') {
                console.log('------cRINGING------');
                if (time_helpers_1.default.parseStringTime(this.now()) > time_helpers_1.default.parseStringTime(time) + this.maxRingTime) {
                    // automatic dismiss with special notification for missed-ness
                    console.log('--------MISSED ALARM---------');
                    this.querySvc.insertDismiss([alarm, user]);
                    this.querySvc.updateAlarmState(['pending', alarm]);
                }
            }
            else {
                if (state === 'woke') {
                    console.log('-----bWOKE AND RESET------');
                }
                else if (state === 'dismissed') {
                    console.log('-----bDISMISSED AND RESET------');
                }
                else if (state === 'snoozing') {
                    console.log('state is snoozing', user, alarm);
                    if ()
                        console.log('-----bSNOOZING------');
                }
                else if (state === 'ringing') {
                    console.log('-----bRINGING!!!------');
                }
                else {
                    console.log('------pending------');
                }
            }
        }
    };
    AlarmClockTrigger.prototype.now = function () {
        var date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    };
    AlarmClockTrigger.prototype.start = function () {
        var _this = this;
        this.init();
        setInterval(function () {
            _this.querySvc.getAllActiveAlarms([])
                .then(function (alarms) { return _this.matchTime(alarms); })
                .catch(function (e) { return console.log(e); });
        }, 1000);
    };
    return AlarmClockTrigger;
}());
exports.default = AlarmClockTrigger;
//# sourceMappingURL=alarm.js.map