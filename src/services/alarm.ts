// VALIDATION
import * as V from '../services/validation';
import * as R from '../services/value-objects';
// DATABASE
import * as pg from 'pg';
import QuerySvc from '../data-access/queries'


export default class AlarmClock {
    querySvc:QuerySvc;
    dbInfo: pg.ConnectionConfig;

    constructor(dbInfo) {
        this.dbInfo = dbInfo
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

    printUsers() {
        return this.querySvc.getAllUsers([])
    }

    start() {
        this.init()
        setInterval(() => {
            this.printUsers()
                .then(res => console.log(res))
                .catch(e => console.log(e))
        }, 2000)
    }
}



// EXAMPLE FUNCTION CALL
// const alarmClock = new AlarmClock(dbConfig)