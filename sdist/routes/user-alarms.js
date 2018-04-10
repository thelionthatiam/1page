"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../middleware/database");
var logic_alarms_1 = require("../logic/logic-alarms");
var alarms = express.Router();
// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
// random helper that will go with logic for alarms
function compare(a, b) {
    var awakeA = parseInt(a.awake);
    var awakeB = parseInt(b.awake);
    var comp = 0;
    if (awakeA > awakeB) {
        comp = 1;
    }
    else if (awakeB > awakeA) {
        comp = -1;
    }
    return comp;
}
alarms.route('/')
    .post(function (req, res) {
    var query = 'INSERT INTO alarms(user_uuid, title, time) VALUES ($1, $2, $3) RETURNING *';
    var input = [req.session.user.uuid, req.body.title, req.body.time];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('alarms');
    })
        .catch(function (err) {
        console.log(err);
        var userError = (err.message);
        res.render('account/alarms/new-alarm', { dbError: userError });
    });
})
    .get(function (req, res) {
    console.log('alarms get route');
    database_1.db.query("SELECT * FROM alarms WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        console.log(res.locals.user);
        console.log(req.session.user.email);
        var alarmContent = result.rows;
        var sortedAlarms = alarmContent.sort(compare);
        res.render('account/alarms/alarms', {
            alarmContent: sortedAlarms,
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
});
alarms.get('/new-alarm', function (req, res, next) {
    res.render('account/alarms/new-alarm');
});
alarms.route('/:title')
    .delete(function (req, res) {
    var alarm_uuid = req.body.alarm_uuid;
    database_1.db.query('DELETE FROM alarms WHERE alarm_uuid = $1', [alarm_uuid])
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('accoount/alarms/edit-alarm', { dbError: err.stack });
    });
});
// NEW DAYS OF WEEK SECTION
alarms.route('/:title/days-of-week')
    .get(function (req, res) {
    console.log(req.query);
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.query);
    req.AlarmSvc.getAlarm()
        .then(function (daysOfWeek) { return res.render('account/alarms/days-of-week', daysOfWeek); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { error: e });
    });
})
    .put(function (req, res) {
    console.log('REQ BODY', req.body);
    req.AlarmSvc = new logic_alarms_1.default(req.querySvc, req.session.user, req.body);
    req.AlarmSvc.updateDaysOfWeek()
        .then(function (daysOfWeek) { return res.redirect('/app/accounts/' + req.session.user.email + '/alarms'); })
        .catch(function (e) {
        console.log(e);
        res.render('error', { error: e });
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