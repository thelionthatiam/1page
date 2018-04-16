"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DATABASE
var pg = require("pg");
var queries_1 = require("../data-access/queries");
var AlarmClock = /** @class */ (function () {
    function AlarmClock(dbInfo) {
        this.dbInfo = dbInfo;
    }
    AlarmClock.prototype.init = function () {
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
    AlarmClock.prototype.getUserAlarms = function () {
        return this.querySvc.getAllActiveAlarms([]);
    };
    AlarmClock.prototype.matchTime = function (alarms) {
        for (var i = 0; i < alarms.length; i++) {
            var time = alarms[i].time, state = alarms[i].state;
            console.log(time, this.now());
            if (time === this.now()) {
                if (state === 'pending') {
                    console.log('-----STARTS RINGING!!!------');
                    // eventEmitter.emit('ring', triggerAlarm(alarm, user))
                    // eventEmitter.emit('ringingCountdown', ringing(alarm, user))
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
            else {
                if (state === 'woke') {
                    console.log('-----bWOKE AND RESET------');
                    // eventEmitter.emit('alarmReset', alarmReset(alarm, user))
                }
                else if (state === 'dismissed') {
                    console.log('-----bDISMISSED AND RESET------');
                    // eventEmitter.emit('alarmReset', alarmReset(alarm, user))
                }
                else if (state === 'snoozing') {
                    console.log('-----bSNOOZING------');
                }
                else if (state === 'ringing') {
                    console.log('-----bRINGING!!!------');
                }
                else {
                }
            }
        }
    };
    AlarmClock.prototype.now = function () {
        var date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    };
    AlarmClock.prototype.start = function () {
        var _this = this;
        this.init();
        setInterval(function () {
            _this.getUserAlarms()
                .then(function (alarms) { return _this.matchTime(alarms); })
                .catch(function (e) { return console.log(e); });
        }, 3000);
    };
    return AlarmClock;
}());
exports.default = AlarmClock;
//# sourceMappingURL=alarm.js.map