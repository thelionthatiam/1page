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
    AlarmClock.prototype.printActiveUserAlarms = function () {
        return this.querySvc.getAllActiveAlarms([])
            .then(function (res) {
            var alarmTitles = [];
            for (var i = 0; i < res.length; i++) {
                alarmTitles.push(res[i].time);
            }
            return alarmTitles;
        });
    };
    AlarmClock.prototype.now = function () {
        var date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    };
    AlarmClock.prototype.start = function () {
        var _this = this;
        this.init();
        setInterval(function () {
            _this.printActiveUserAlarms()
                .then(function (res) { return console.log(res); })
                .then(function () { return console.log(typeof _this.now()); })
                .catch(function (e) { return console.log(e); });
        }, 3000);
    };
    return AlarmClock;
}());
exports.default = AlarmClock;
// EXAMPLE FUNCTION CALL 
//# sourceMappingURL=alarm.js.map