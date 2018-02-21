import * as express from 'express';
import * as r from '../resources/value-objects';
import { db } from '../middleware/database';
var EventEmitter = require('events').EventEmitter;
var router = express.Router();
var mockUser = {
    uuid: '700fb850-ac21-4418-b843-8e4a0999bdf1',
    name: 'timothy',
    permission: 'user',
    cart_uuid: '70cf640a-cf9d-439c-98b5-0cfd8473ba02',
    email: 'g@g.gg'
};
var user = r.UserSession.fromJSON(mockUser);
var Alarm = /** @class */ (function () {
    function Alarm(user_uuid, title, active, alarm_uuid, state, time) {
        this.user_uuid = user_uuid;
        this.title = title;
        this.active = active;
        this.alarm_uuid = alarm_uuid;
        this.state = state;
        this.time = time;
    }
    Alarm.prototype.addSnooze = function () {
        var _this = this;
        console.log('------YOU SNOOZED! Now you have a snooze, but dont snooze to much!------');
        var query = 'UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3';
        var input = ['snoozing', this.user_uuid, this.alarm_uuid];
        db.query(query, input)
            .then(function (result) {
            return db.query('INSERT INTO snoozes(user_uuid, alarm_uuid) VALUES ($1, $2)', [_this.user_uuid, _this.alarm_uuid]);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Alarm.prototype.addDismiss = function () {
        var _this = this;
        console.log('------YOU SLEPT IN! Now you have a dismiss under your belt.------');
        var query = 'UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3';
        var input = ['dismissed', this.user_uuid, this.alarm_uuid];
        db.query(query, input)
            .then(function (result) {
            return db.query('INSERT INTO dismisses(user_uuid, alarm_uuid) VALUES ($1, $2)', [_this.user_uuid, _this.alarm_uuid]);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Alarm.prototype.addWake = function () {
        var _this = this;
        console.log('------NICE JOB, YOU WOKE UP! CARPE DIEM!------');
        var query = 'UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3';
        var input = ['woke', this.user_uuid, this.alarm_uuid];
        db.query(query, input)
            .then(function (result) {
            return db.query('INSERT INTO wakes(user_uuid, alarm_uuid) VALUES ($1, $2)', [_this.user_uuid, _this.alarm_uuid]);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Alarm.prototype.triggerAlarm = function () {
        console.log('------ALARM TRIGGERED------');
        var query = 'UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3';
        var input = ['ringing', this.user_uuid, this.alarm_uuid];
        db.query(query, input)
            .then(function (result) {
            console.log(result);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Alarm.prototype.alarmReset = function () {
        var query = 'UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3';
        var input = ['pending', this.user_uuid, this.alarm_uuid];
        db.query(query, input)
            .then(function (result) {
            console.log(result);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    Alarm.prototype.snoozing = function () {
        var _this = this;
        var currentTime = Date.now();
        var endTime = currentTime + 10000; // ten second snooze
        this.addSnooze();
        var thing = setInterval(function () {
            var timeLeft = endTime - Date.now();
            console.log('timeleft', timeLeft);
            db.query('SELECT state FROM alarms WHERE user_uuid = $1 AND alarm_uuid = $2', [_this.user_uuid, _this.alarm_uuid])
                .then(function (result) {
                var state = result.rows[0].state;
                console.log(state);
                if (state === 'snoozing') {
                    if (timeLeft < 0) {
                        clearInterval(thing);
                        _this.triggerAlarm();
                        _this.ringing();
                    }
                }
                else if (state === 'dismiss') {
                    clearInterval(thing);
                    _this.addDismiss();
                }
                else if (state === 'woke') {
                    clearInterval(thing);
                    _this.addWake();
                }
            });
        }, 1000);
    };
    Alarm.prototype.ringing = function () {
        var _this = this;
        var currentTime = Date.now();
        var endTime = currentTime + 6000;
        var thing = setInterval(function () {
            var timeLeft = endTime - Date.now();
            console.log('timeleft', timeLeft);
            db.query('SELECT state FROM alarms WHERE user_uuid = $1 AND alarm_uuid = $2', [_this.user_uuid, _this.alarm_uuid])
                .then(function (result) {
                var state = result.rows[0].state;
                console.log(state);
                if (state === 'ringing') {
                    if (timeLeft < 0) {
                        clearInterval(thing);
                        _this.addDismiss();
                    }
                }
                else if (state === 'snoozing') {
                    clearInterval(thing);
                    _this.snoozing();
                }
                else if (state === 'dismiss') {
                    clearInterval(thing);
                    _this.addDismiss();
                }
                else if (state === 'woke') {
                    clearInterval(thing);
                    _this.addWake();
                }
            });
        }, 1000);
    };
    return Alarm;
}());
module.exports = router;
//# sourceMappingURL=alarm-class.js.map