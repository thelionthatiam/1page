import * as express from 'express';
import { db } from '../middleware/database';
import AlarmSvc from '../logic/logic-alarms';
const alarms = express.Router();

// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
import * as url from 'url';
import * as qs from 'querystring';

import * as React from 'react';
// YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable

// random helper that will go with logic for alarms

function compare(a : any, b : any) {
  const awakeA = parseInt(a.awake);
  const awakeB = parseInt(b.awake);

  let comp = 0;
  if (awakeA > awakeB) {
    comp = 1;
  } else if (awakeB > awakeA) {
    comp = -1;
  }
  return comp;
}


alarms.route('/')
  .post((req, res) => {
    let query = 'INSERT INTO alarms(user_uuid, title, time) VALUES ($1, $2, $3) RETURNING *';
    let input = [req.session.user.uuid, req.body.title, req.body.time];

    db.query(query, input)
      .then((result) => {
        res.redirect('alarms');
      })
      .catch((err) => {
        console.log(err);
        let userError = (err.message)
        res.render('account/alarms/new-alarm', { dbError: userError });
      });
  })
  .get((req, res) => {
    console.log('alarms get route')

    db.query("SELECT * FROM alarms WHERE user_uuid = $1", [req.session.user.uuid])
      .then((result) => {
        console.log(res.locals.user)
        console.log(req.session.user.email)
        let alarmContent = result.rows;
        let sortedAlarms = alarmContent.sort(compare)
        res.render('account/alarms/alarms', {
          alarmContent:sortedAlarms,
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

alarms.get('/new-alarm', (req, res, next) => {
  res.render('account/alarms/new-alarm')
})

alarms.route('/:title')
  // .get((req, res) => {
  //   let title = req.query.title;

  //   db.query("SELECT * FROM alarms WHERE title = $1 AND user_uuid = $2", [title, req.session.user.uuid])
  //     .then((result) => {
  //       res.render('account/alarms/edit-alarm', {
  //         title:result.rows[0].title,
  //         time:result.rows[0].time,
  //         active:result.rows[0].active,
  //         email:req.session.user.email
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err.stack);
  //       res.render('/:title', { dbError: err.stack });
  //     });
  //   })
    // .put((req, res) => {
    //   let inputs = {
    //     prevTitle:req.body.prevTitle, // should be an id
    //     title:req.body.title,
    //     time:req.body.time,
    //     active:req.body.active
    //   }
    //   console.log(inputs)
    //   let query = 'UPDATE alarms SET (title, time, active) = ($1, $2, $3) WHERE title = $4';
    //   let input = [inputs.title, inputs.time, inputs.active, inputs.prevTitle];
    //   db.query(query, input)
    //     .then((result) => {
    //       res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
    //     })
    //     .catch((err) => {
    //       console.log(err.stack)
    //       // put info into sessions
    //       // YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
    //       res.redirect('/app/account/alarms/edit-alarm?' + qs.stringify({ dbError: err.stack })); // change route to make route
    //       // YINSO ADDITIONS FOR REDIRECT WITH QUERY OBJECT, LIMITED BY SIZE OF QUERY, put info into sessions may be preferable
    //     });
    // })
    .delete((req, res) => {

      let alarm_uuid = req.body.alarm_uuid
      db.query('DELETE FROM alarms WHERE alarm_uuid = $1', [alarm_uuid])
        .then((result) => {
          res.redirect('/app/accounts/' + req.session.user.email + '/alarms');
        })
        .catch((err) => {
          console.log(err.stack)
          res.render('accoount/alarms/edit-alarm', { dbError: err.stack });
        });
    })

// NEW DAYS OF WEEK SECTION

alarms.route('/:title/days-of-week')
    .get((req, res) => {
      console.log(req.query)
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.query)

      req.AlarmSvc.getAlarm()
        .then(daysOfWeek => res.render('account/alarms/days-of-week', daysOfWeek))
        .catch(e => {
          console.log(e)
          res.render('error', {error:e})
        })
    })
    .put((req, res) => {
      console.log('REQ BODY', req.body)
      req.AlarmSvc = new AlarmSvc(req.querySvc, req.session.user, req.body)
      req.AlarmSvc.updateDaysOfWeek()
        .then(daysOfWeek => res.redirect('/app/accounts/' + req.session.user.email + '/alarms'))
        .catch(e => {
          console.log(e)
          res.render('error', {error:e})
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
