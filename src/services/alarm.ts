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

    printActiveUserAlarms() {
        return this.querySvc.getAllActiveAlarms([])
            .then(res => {
                let alarmTitles = []
                for (let i = 0; i < res.length;i ++) {
                    alarmTitles.push(res[i].time)
                }
                return alarmTitles
            })
    }

    now() {
        let date = new Date();
        return date.toLocaleTimeString('en-Ud', { hour12: false });
    }

    start() {
        this.init()
        setInterval(() => {
            this.printActiveUserAlarms()
                .then(res => console.log(res))
                .then(() => console.log(typeof this.now()))
                .catch(e => console.log(e))
        }, 3000)
    }
}



// EXAMPLE FUNCTION CALL