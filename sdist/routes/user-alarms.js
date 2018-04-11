"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var error_handling_1 = require("../services/error-handling");
var logic_alarms_1 = require("../logic/logic-alarms");
var alarms = express.Router();
// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
alarms.route('/')
    .post(function (req, res) {
    console.log('ALARMS POST', req.body);
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.addAlarm()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (err) {
        console.log(err);
        res.render('alarms/new-alarm', { dbError: error_handling_1.dbErrTranslator(err) });
    });
})
    .get(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, null);
    req.AlarmSvc.getUserAlarms()
        .then(function (alarms) {
        res.render('alarms/alarms', {
            alarmContent: alarms,
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('error', {
            errName: err.message,
            errMessage: null
        });
    });
})
    .delete(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, null);
    req.AlarmSvc.deleteAllAlarms()
        .then(function (time) { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { error: e });
    });
});
alarms.get('/new-alarm', function (req, res, next) {
    res.render('alarms/new-alarm');
});
// CHANGE TIME
alarms.route('/:alarm_uuid/time')
    .get(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.query);
    req.AlarmSvc.getAlarm()
        .then(function (alarm) {
        res.render('alarms/time', alarm);
    })
        .catch(function (e) {
        console.log(e);
        res.render('error', { error: e });
    });
})
    .put(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.updateAlarmTime()
        .then(function (time) { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: error_handling_1.dbErrTranslator(e) });
    });
});
// CHANGE TITLE
alarms.route('/:alarm_uuid/title')
    .get(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.query);
    req.AlarmSvc.getAlarm()
        .then(function (alarm) {
        res.render('alarms/title', alarm);
    })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
})
    .put(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.updateAlarmTitle()
        .then(function (time) { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
});
// TOGGLE ACTIVE
alarms.route('/:alarm_uuid/active').put(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.toggleActiveAlarm()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
});
// CHANGE DAYS OF WEEK SECTION
alarms.route('/:alarm_uuid/days-of-week')
    .get(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.query);
    req.AlarmSvc.getAlarm()
        .then(function (alarm) { return res.render('alarms/days-of-week', alarm); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
})
    .put(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.updateDaysOfWeek()
        .then(function (daysOfWeek) { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
});
alarms.route('/:alarm_uuid')
    .delete(function (req, res) {
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.deleteAlarm()
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (e) {
        console.log(e);
        res.render('error', { errMessage: e });
    });
});
// //  THIS IS STILL IMPORTANT !!!! alarm functionality
// router.post('/:title/snooze', (req, res) => {
//   let alarm = req.body.alarm_uuid
//   console.log(alarm)
//   db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['snoozing', req.session.user.uuid, alarm])
//   .then((result) =>{
//     console.log(result)
//     res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// })
// router.post('/:title/dismiss', (req, res) => {
//   let alarm = req.body.alarm_uuid
//   db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['dismissed', req.session.user.uuid, alarm])
//   .then((result) =>{
//     console.log(result)
//   res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// })
// router.post('/:title/wake', (req, res) => {
//   let alarm = req.body.alarm_uuid
//   db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['woke', req.session.user.uuid, alarm])
//   .then((result) =>{
//     console.log(result)
//     res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// })
exports.default = alarms;
//# sourceMappingURL=user-alarms.js.map