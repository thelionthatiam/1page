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
    AlarmClock.prototype.printUsers = function () {
        return this.querySvc.getAllUsers([]);
    };
    AlarmClock.prototype.start = function () {
        var _this = this;
        this.init();
        setInterval(function () {
            _this.printUsers()
                .then(function (res) { return console.log(res); })
                .catch(function (e) { return console.log(e); });
        }, 2000);
    };
    return AlarmClock;
}());
exports.default = AlarmClock;
// EXAMPLE FUNCTION CALL
// const alarmClock = new AlarmClock(dbConfig) 
//# sourceMappingURL=alarm.js.map