// VALIDATION
import * as V from '../services/validation';
import * as R from '../services/value-objects';
// DATABASE
import * as pg from 'pg';
import QuerySvc from '../data-access/queries'
// HELPERS
import TimeHelpers from '../services/time-helpers'
import { AnalysisSchemeLanguage } from 'aws-sdk/clients/cloudsearch';

export default class AlarmTrigger {
    querySvc:QuerySvc;
    dbInfo: pg.ConnectionConfig;
    date:Date;
    timeString:V.MilitaryTime;
    maxRingTime: number;
    maxSnoozeTime: number;




    constructor(dbInfo) {
        this.dbInfo = dbInfo;
        this.maxRingTime = 10;
        this.maxSnoozeTime = 10;

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

    // snoozing(user_uuid, alarm) {
    //     return this.querySvc.getUserSettings([user_uuid])
    //         .then(settings => {
    //             setTimeout(
    //                 () => {
    //                     this.querySvc.updateAlarmState(['ringing', alarm.alarm_uuid])
    //                 }, 
    //                 (settings.snooze_length*1000)
    //             )
    //         })
    //         .catch(e => {
    //             console.log('error at snoozing in alarm clock', e)
    //         })
        
    // }

    matchTime(alarms:R.AlarmDB[]) {
        
        for (let i = 0; i < alarms.length; i++) {
            let time = alarms[i].time,
                state = alarms[i].state,
                title = alarms[i].title,
                alarm = alarms[i].alarm_uuid,
                user = alarms[i].user_uuid;


                
            if (time === this.now()) {


                console.log('-----STARTS RINGING!!!------')
                this.querySvc.updateAlarmState(['ringing', alarm])


            } else if (state === 'ringing') {


                console.log('------RINGING!!!!------')
                if (TimeHelpers.parseStringTime(this.now()) > TimeHelpers.parseStringTime(time) + this.maxRingTime + delay) {
                    console.log('--------MISSED ALARM---------')
                    this.querySvc.insertDismiss([alarm, user])
                    this.querySvc.updateAlarmState(['pending', alarm])
                }


            } else if (state === 'snoozing') {


                console.log('--------SNOOZING---------')
                if (TimeHelpers.parseStringTime(this.now()) > TimeHelpers.parseStringTime(time) + this.maxSnoozeTime + delay) {
                    console.log('--------SNOOZE OVER---------')
                    this.querySvc.updateAlarmState(['ringing', alarm])
                    console.log('before', this.maxRingTime)
                    this.maxRingTime = this.maxRingTime + this.maxRingTime
                    console.log('before', this.maxRingTime)
                }


            } else {
                console.log('--------pending---------')
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