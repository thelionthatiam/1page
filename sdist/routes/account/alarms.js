"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helpers_1 = require("../functions/helpers");
var database_1 = require("../middleware/database");
//
var router = express.Router();
router.route('/')
    .post(function (req, res) {
    var query = 'INSERT INTO alarms(user_uuid, title, time) VALUES ($1, $2, $3) RETURNING *';
    var input = [req.session.user.uuid, req.body.title, req.body.time];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('alarms');
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render('account/alarms/new-alarm', { dbError: userError });
    });
})
    .get(function (req, res) {
    console.log('alarms get route');
    if (req.session.user.permission === 'guest') {
        res.render('guest/alarms');
    }
    database_1.db.query("SELECT * FROM alarms WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        console.log(res.locals.user);
        console.log(req.session.user.email);
        var alarmContent = result.rows;
        var sortedAlarms = alarmContent.sort(helpers_1.compare);
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
router.get('/new-alarm', function (req, res, next) {
    res.render('account/alarms/new-alarm');
});
router.route('/:title')
    .get(function (req, res) {
    var title = req.query.title;
    database_1.db.query("SELECT * FROM alarms WHERE title = $1 AND user_uuid = $2", [title, req.session.user.uuid])
        .then(function (result) {
        res.render('account/alarms/edit-alarm', {
            title: result.rows[0].title,
            time: result.rows[0].time,
            active: result.rows[0].active,
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('/:title', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var inputs = {
        prevTitle: req.body.prevTitle,
        title: req.body.title,
        time: req.body.time,
        active: req.body.active
    };
    console.log(inputs);
    var query = 'UPDATE alarms SET (title, time, active) = ($1, $2, $3) WHERE title = $4';
    var input = [inputs.title, inputs.time, inputs.active, inputs.prevTitle];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/alarms/edit-alarm', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var title = req.body.title;
    database_1.db.query('DELETE FROM alarms WHERE title = $1', [title])
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('accoount/alarms/edit-alarm', { dbError: err.stack });
    });
});
// // alarm functionality
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
module.exports = router;
//# sourceMappingURL=alarms.js.map