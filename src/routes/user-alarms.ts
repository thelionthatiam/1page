import * as express from 'express';
import { dbErrTranslator } from '../services/error-handling';
import AlarmSvc from '../logic/logic-alarms';
const alarms = express.Router();

// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
import * as url from 'url';
import * as qs from 'querystring';
import * as React from 'react';
// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable


alarms.route('/')
  .post((req, res) => {
    console.log('ALARMS POST',req.body)
    req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)

    req.AlarmSvc.addAlarm()
      .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
      .catch((err) => {
        console.log(err)
        res.render('alarms/new-alarm', { dbError: dbErrTranslator(err) });
      });
  })
  .get((req, res) => {
    req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, null)

    req.AlarmSvc.getUserAlarms()
      .then((alarms) => {
        res.render('alarms/alarms', {
          alarmContent:alarms,
          email:req.session.user.email
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', {
          errName: err.message,
          errMessage: null
        });
      });
  })
  .delete((req, res) => {
    req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, null)

    req.AlarmSvc.deleteAllAlarms()
      .then(time => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
      .catch(e => {
        console.log(e)
        res.render('error', { error: e })
      })
  })

alarms.get('/new-alarm', (req, res, next) => {
  res.render('alarms/new-alarm')
})

// CHANGE TIME

alarms.route('/:alarm_uuid/time')
    .get((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.query)

      req.AlarmSvc.getAlarm()
        .then(alarm => {
          res.render('alarms/time', alarm)
        })
        .catch(e => {
          console.log(e)
          res.render('error', { error:e })
        })
    })
    .put((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)
      req.AlarmSvc.updateAlarmTime()
        .then(time => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
        .catch(e => {
          console.log(e)
          res.render('error', { errMessage: dbErrTranslator(e) })
        })
    })


// CHANGE TITLE

alarms.route('/:alarm_uuid/title')
    .get((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.query)

      req.AlarmSvc.getAlarm()
        .then(alarm => {
          res.render('alarms/title', alarm)
        })
        .catch(e => {
          console.log(e)
          res.render('error', {errMessage:e})
        })
    })
    .put((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)
      req.AlarmSvc.updateAlarmTitle()
        .then(time => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
        .catch(e => {
          console.log(e)
          res.render('error', {errMessage:e})
        })
    })

// TOGGLE ACTIVE

alarms.route('/:alarm_uuid/active').put((req, res) => {
  req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)
  req.AlarmSvc.toggleActiveAlarm()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
    .catch(e => {
      console.log(e)
      res.render('error', { errMessage: e })
    })
})


// CHANGE DAYS OF WEEK SECTION

alarms.route('/:alarm_uuid/days-of-week')
    .get((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.query)      
      req.AlarmSvc.getAlarm()
        .then(alarm => res.render('alarms/days-of-week', alarm))
        .catch(e => {
          console.log(e)
          res.render('error', {errMessage:e})
        })
    })
    .put((req, res) => {
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)
      req.AlarmSvc.updateDaysOfWeek()
        .then(daysOfWeek => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
        .catch(e => {
          console.log(e)
          res.render('error', {errMessage:e})
        })
    })


// ARCHIVE ALARM

alarms.route('/:alarm_uuid')
  .delete((req, res) => {
    req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)

    req.AlarmSvc.archiveAlarm()
      .then((result) => {
        res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
      })
      .catch(e => {
        console.log(e)
        res.render('error', { errMessage:e })
      })
  })


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


export default alarms;
