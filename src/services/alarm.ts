// VALIDATION
import * as V from '../services/validation';
import * as R from '../services/value-objects';
// DATABASE
import * as pg from 'pg';
import QuerySvc from '../data-access/queries'
// HELPERS
import TimeHelpers from '../services/time-helpers'
import { AnalysisSchemeLanguage } from 'aws-sdk/clients/cloudsearch';

export default class AlarmClock {
    querySvc:QuerySvc;
    dbInfo: pg.ConnectionConfig;
    date:Date;
    timeString:V.MilitaryTime;
    maxRingTime: number;
    maxSnooze: number;



    constructor(dbInfo) {
        this.dbInfo = dbInfo;
        this.maxRingTime = 10;

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

    snoozing(user_uuid, alarm_uuid) {
        return this.querySvc.getUserSettings([user_uuid])
            .then(settings => {
                setTimeout(
                    () => this.querySvc.updateAlarmState(['pending', alarm_uuid]), 
                    (settings.snooze_length*1000)
                )
            })
            .catch(e => {
                console.log('error at snoozing in alarm clock', e)
            })
        
    }

    // pretty sure this for loop is blocking
    matchTime(alarms:R.AlarmDB[]) {

        for (let i = 0; i < alarms.length; i++) {
            // mostly for tracking purposes will probably change this
            let time = alarms[i].time,
                state = alarms[i].state,
                title = alarms[i].title,
                alarm = alarms[i].alarm_uuid,
                user = alarms[i].user_uuid;
            if (time === this.now()) {
                if (state === 'pending') {
                    console.log('-----STARTS RINGING!!!------')
                    this.querySvc.updateAlarmState(['ringing', alarm])

                } else if (state === 'ringing') {  // can this case even occur?
                    console.log('-----aRINGING!!!------')

                } else if (state === 'snoozing') { // can this case even occur?
                    console.log('-----aSNOOZING------')

                } else if (state === 'dismissed') { // can this case even occur?
                    console.log('-----aDISMISSED------')

                } else if (state === 'woke') { // can this case even occur?
                    console.log('-----aWAITING TO RESET------')

                }
            } else if (state === 'ringing') {
                console.log('------cRINGING------')
                if (TimeHelpers.parseStringTime(this.now()) > TimeHelpers.parseStringTime(time) + this.maxRingTime) {
                    // automatic dismiss with special notification for missed-ness
                    console.log('--------MISSED ALARM---------')
                    this.querySvc.insertDismiss([alarm, user])
                    this.querySvc.updateAlarmState(['pending', alarm])
                }
            } else {
                if (state === 'woke') {
                    console.log('-----bWOKE AND RESET------')
                } else if (state === 'dismissed') {
                    console.log('-----bDISMISSED AND RESET------')
                } else if (state === 'snoozing') {
                    console.log('state is snoozing', user, alarm)
                    this.snoozing(user, alarm)
                    console.log('-----bSNOOZING------')
                } else if (state === 'ringing') {
                    console.log('-----bRINGING!!!------')
                } else {
                    console.log('------pending------')
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
            this.querySvc.getAllActiveAlarms([])
                .then(alarms => this.matchTime(alarms))
                .catch(e => console.log(e))
        }, 1000)
    }
}