import * as r from './value-objects';
import * as V from './validation';
import * as webpush from 'web-push'
import { dbErrTranslator } from './error-handling';
import { TimeHelpers } from '../logic/logic-alarms'
import { db } from '../middleware/database';
const EventEmitter = require('events').EventEmitter

function addLeadingZeros(number:number) {
  if (number < 10) {
    return '0' + number.toString()
  }
  return number;
}

function theTime() {
	let clock = new Date();
	let h = addLeadingZeros(clock.getHours());
	let m = addLeadingZeros(clock.getMinutes());
	let s = addLeadingZeros(clock.getSeconds());
	return h + ':' + m + ':' + s;
}

const eventEmitter = new EventEmitter()

eventEmitter.on('ring', () => {
   console.log('ringing event');
})

eventEmitter.on('ringingCountdown', () => {
  console.log('ringing countdown');
})

function triggerAlarm(alarm:string, user:r.UserSession) {
  db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['ringing', user.uuid, alarm])
  .then((result) =>{
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
}

function addSnooze(alarm:string, user:r.UserSession) {
  console.log('------YOU SNOOZED! Now you have a snooze, but dont snooze to much!------')
  db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['snoozing', user.uuid, alarm])
    .then((result) => {
      return db.query('INSERT INTO snoozes(user_uuid, alarm_uuid) VALUES ($1, $2)', [user.uuid, alarm]);
    })
    .catch((error) => {
      console.log(error);
    })
}

function addDismiss(alarm:string, user:r.UserSession) {
  console.log('------YOU SLEPT IN! Now you have a dismiss under your belt.------')
  db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['dismissed', user.uuid, alarm])
    .then((result) => {
      return db.query('INSERT INTO dismisses(user_uuid, alarm_uuid) VALUES ($1, $2)', [user.uuid, alarm])
    })
    .catch((error) => {
      console.log(error)
    })
}

function addWake(alarm:string, user:r.UserSession) {
  console.log('------NICE JOB, YOU WORK UP! CARPE DIEM!------')
  db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['woke', user.uuid, alarm])
    .then((result) => {
      return db.query('INSERT INTO wakes(user_uuid, alarm_uuid) VALUES ($1, $2)', [user.uuid, alarm])
    })
    .catch((error) => {
      console.log(error)
    })
}

function alarmReset(alarm:string, user:r.UserSession) {
  db.query('UPDATE alarms SET state = $1 WHERE user_uuid = $2 AND alarm_uuid = $3', ['pending', user.uuid, alarm])
  .then((result) =>{
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
}


function snoozing(alarm:string, user:r.UserSession) {
  let currentTime = Date.now();
  let endTime = currentTime + 10000; // ten second snooze
  addSnooze(alarm, user);

  let thing = setInterval(() => {
    let timeLeft = endTime - Date.now()
    console.log('timeleft', timeLeft)

    db.query('SELECT state FROM alarms SELECT state FROM alarms WHERE user_uuid = $1 AND alarm_uuid = $2', [user.uuid, alarm])
      .then((result) => {
        let state = result.rows[0].state;
        console.log(state)
        if (state === 'snoozing') {
          if (timeLeft < 0 ) {
            clearInterval(thing)
            triggerAlarm(alarm, user)
            ringing(alarm, user)
          }
        } else if (state === 'dismiss') {
          clearInterval(thing)
          addDismiss(alarm, user)
        } else if (state === 'woke') {
          clearInterval(thing)
          addWake(alarm, user)
        }
      })

  }, 1000)

}

function triggerPushMsg(subscription, dataToSend, user) {
  return webpush.sendNotification(subscription, dataToSend, null)
    .catch((err) => {
      if (err.statusCode === 410) {
        return db.query(
          'delete from push_subs where user_uuid = $1',
          [user.uuid]
        )
      } else {
        console.log('Subscription is no longer valid: ', err);
      }
    });
};


function getSubs(user) {
  return db.query(
      'select * from push_subs where user_uuid = $1',
      [user.uuid]
    )
    .then(subs => {
      console.log('%%%%%%%% RETURN FROM GET PUSH SUBS', subs)
      const subscription = {
        endpoint: subs.rows[0].endpoint,
        keys: {
          p256dh: subs.rows[0].p256dh,
          auth: subs.rows[0].auth
        }
      }
      // console.log(subscription)
      return triggerPushMsg(subscription, 'Hi guys, this is from the alarm!', user)
    })
    .catch(e => {
      console.log('something didn\'t work out:\n')
      console.log(e)
    })
}

function ringing(alarm:string, user:r.UserSession) {
  let currentTime = Date.now()
  let endTime = currentTime + 6000;

  let thing = setInterval(() => {
    let timeLeft = endTime - Date.now()
    console.log('timeleft', timeLeft)
    
    getSubs(user)
      .then(() => db.query('SELECT state FROM alarms WHERE user_uuid = $1 AND alarm_uuid = $2', [user.uuid, alarm]))
      .then((result) => {
        let state = result.rows[0].state;
        console.log(state)
        if (state === 'ringing') {
          if (timeLeft < 0 ) {
            clearInterval(thing)
            addDismiss(alarm, user)
          }
        } else if (state === 'snoozing') {
          clearInterval(thing)
          snoozing(alarm, user)
        } else if (state === 'dismiss') {
          clearInterval(thing)
          addDismiss(alarm, user)
        } else if (state === 'woke') {
          clearInterval(thing)
          addWake(alarm, user)
        }
      })
      // .catch(e => {
      //   console.log('something didn\'t work out:\n')
      //   console.log(e)
      // })

  }, 1000)
}

function watchUserAlarms(user:V.UUID) {
  db.query('SELECT * FROM alarms WHERE user_uuid = $1 AND active = $2', [user.uuid, true]) // and active = true
    .then((result) => {
      let alarms = result.rows;
      for (let i = 0; i < alarms.length; i++) {
        let time = alarms[i].time;
        let alarm = alarms[i].alarm_uuid;
        let state = alarms[i].state;

        if (time === theTime()) {
          if (state === 'pending') {
            console.log('-----STARTS RINGING!!!------')
            eventEmitter.emit('ring', triggerAlarm(alarm, user))
            eventEmitter.emit('ringingCountdown', ringing(alarm, user))

          } else if (state === 'ringing') {
            console.log('-----RINGING!!!------')

          } else if (state === 'snoozing') {
            console.log('-----SNOOZING------')

          } else if (state === 'dismissed') {
            console.log('-----DISMISSED------')

          } else if (state === 'woke') {
            console.log('-----WAITING TO RESET------')

          }
        } else {
          if (state === 'woke') {
            console.log('-----WOKE AND RESET------')
            eventEmitter.emit('alarmReset', alarmReset(alarm, user))

          } else if (state === 'dismissed') {
            console.log('-----DISMISSED AND RESET------')
            eventEmitter.emit('alarmReset', alarmReset(alarm, user))

          } else if (state === 'snoozing') {
            console.log('-----SNOOZING------')

          } else if (state === 'ringing') {
            console.log('-----RINGING!!!------')

          }
        }
        console.log('ALARM: ', time, 'CURRENT TIME: ', theTime())
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function watchAlarms(user:V.UUID) {
  setInterval(() => { watchUserAlarms(user) }, 1000)
}

export default watchAlarms;