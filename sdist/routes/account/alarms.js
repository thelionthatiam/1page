import * as express from 'express';
import { dbErrTranslator, compare } from '../../functions/helpers';
import { db } from '../../middleware/database';
var router = express.Router();
var viewPrefix = 'alarms/';
router.route('/alarms')
    .post(function (req, res) {
    var query = 'INSERT INTO alarms(user_uuid, title, time) VALUES ($1, $2, $3) RETURNING *';
    var input = [req.session.user.uuid, req.body.title, req.body.time];
    db.query(query, input)
        .then(function (result) {
        res.redirect('alarms');
    })
        .catch(function (err) {
        console.log(err);
        var userError = dbErrTranslator(err.message);
        res.render(viewPrefix + 'new-alarm', { dbError: userError });
    });
})
    .get(function (req, res) {
    db.query("SELECT * FROM alarms WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        var alarmContent = result.rows;
        var sortedAlarms = alarmContent.sort(compare);
        res.render(viewPrefix + 'alarms', {
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
    res.render(viewPrefix + 'new-alarm', {
        email: req.session.user.email
    });
});
router.route('/alarms/:title')
    .get(function (req, res) {
    var title = req.query.title;
    db.query("SELECT * FROM alarms WHERE title = $1 AND user_uuid = $2", [title, req.session.user.uuid])
        .then(function (result) {
        res.render(viewPrefix + 'edit-alarm', {
            title: result.rows[0].title,
            time: result.rows[0].time,
            active: result.rows[0].active,
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('/alarms/:title', { dbError: err.stack });
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
    db.query(query, input)
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'alarms', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var title = req.body.title;
    db.query('DELETE FROM alarms WHERE title = $1', [title])
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'alarms', { dbError: err.stack });
    });
});
// alarm functionality
router.post('/alarms/:title/snooze', function (req, res) {
    var alarm = req.body.alarm_uuid;
    console.log(alarm);
    db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['snoozing', req.session.user.uuid, alarm])
        .then(function (result) {
        console.log(result);
        res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
    })
        .catch(function (error) {
        console.log(error);
    });
});
router.post('/alarms/:title/dismiss', function (req, res) {
    var alarm = req.body.alarm_uuid;
    db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['dismissed', req.session.user.uuid, alarm])
        .then(function (result) {
        console.log(result);
        res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
    })
        .catch(function (error) {
        console.log(error);
    });
});
router.post('/alarms/:title/wake', function (req, res) {
    var alarm = req.body.alarm_uuid;
    db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['woke', req.session.user.uuid, alarm])
        .then(function (result) {
        console.log(result);
        res.redirect('/accounts/' + req.session.user.uuid + '/alarms');
    })
        .catch(function (error) {
        console.log(error);
    });
});
module.exports = router;
//# sourceMappingURL=alarms.js.map