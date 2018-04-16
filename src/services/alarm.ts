// VALIDATION
import * as V from '../services/validation';
import * as R from '../services/value-objects';
// DATABASE
import * as pg from 'pg';
import QuerySvc from '../data-access/queries'
// HELPERS
import TimeHelpers from '../services/time-helpers'

export default class AlarmClock {
    querySvc:QuerySvc;
    dbInfo: pg.ConnectionConfig;
    date:Date;
    timeString:V.MilitaryTime;

    constructor(dbInfo) {
        this.dbInfo = dbInfo;
    }

    init():Promise<QuerySvc> {
        const pool = new pg.Pool(this.dbInfo)
        pool.connect()
            .then(client => {
                this.querySvc = new QuerySvc(client)
                return this.querySvc
            })
            .catch(e => {
                console.log('error connecting to pool in alarm')
                console.log(e)
                return e
            })
    }

    getUserAlarms() {
        return this.querySvc.getAllActiveAlarms([])
    }

    matchTime(alarms:R.AlarmDB[]) {
        for (let i = 0; i < alarms.length; i++) {
            let time = alarms[i].time,
                state = alarms[i].state;
            console.log(time, this.now())
            if (time === this.now()) {
                if (state === 'pending') {
                    console.log('-----STARTS RINGING!!!------')
                    // eventEmitter.emit('ring', triggerAlarm(alarm, user))
                    // eventEmitter.emit('ringingCountdown', ringing(alarm, user))

                } else if (state === 'ringing') {
                    console.log('-----aRINGING!!!------')

                } else if (state === 'snoozing') {
                    console.log('-----aSNOOZING------')

                } else if (state === 'dismissed') {
                    console.log('-----aDISMISSED------')

                } else if (state === 'woke') {
                    console.log('-----aWAITING TO RESET------')

                }
            } else {
                if (state === 'woke') {
                    console.log('-----bWOKE AND RESET------')
                    // eventEmitter.emit('alarmReset', alarmReset(alarm, user))

                } else if (state === 'dismissed') {
                    console.log('-----bDISMISSED AND RESET------')
                    // eventEmitter.emit('alarmReset', alarmReset(alarm, user))

                } else if (state === 'snoozing') {
                    console.log('-----bSNOOZING------')

                } else if (state === 'ringing') {
                    console.log('-----bRINGING!!!------')
                } else {

                }
            }
        }
    }

    now() {
        let date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    }

    start() {
        this.init()
        setInterval(() => {
            this.getUserAlarms()
                .then(alarms => this.matchTime(alarms))
                .catch(e => console.log(e))
        }, 3000)
    }
}