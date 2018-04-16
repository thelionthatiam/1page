import QuerySvc from '../data-access/queries';
import { deepMerge } from '../services/merge'
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import { StorageGateway } from 'aws-sdk';

interface Alarm {
    user_uuid:V.UUID;
    title:string;
    active:boolean;
    alarm_uuid:V.UUID;
    state:string;
    time:string;
    triggered:boolean;
    mon:boolean;
    tues:boolean;
    wed:boolean;
    thur:boolean;
    fri:boolean;
    sat:boolean;
    sun:boolean;
}

interface DaysOfWeek {
    mon:boolean;
    tues:boolean;
    wed:boolean;
    thur:boolean;
    fri:boolean;
    sat:boolean;
    sun:boolean;
}

interface WeekRenderObj extends DaysOfWeek {
    alarm_uuid:V.UUID;
}

export default class AlarmsSvc {
    alarm: Alarm;
    querySvc: QuerySvc;
    user:R.UserSession;
    inputs: Alarm;

    constructor(querySvc, user, inputs) {
        this.alarm;
        this.inputs = inputs;
        this.user = user;
        this.querySvc = querySvc;
    }

    addAlarm():Promise<void> {
        return TimeHelpers.isMilitaryTime(this.inputs.time)
            .then(() => {
                R.AlarmInputs.fromJSON(this.inputs) // <-- this is where I'm doing validation again??
                return this.querySvc.insertAlarm([this.user.uuid, this.inputs.title, this.inputs.time])
            })
    }

    addTodayOrTomorrowIndicator(sortedAlarms):Alarm[] {
        let helper = new TimeHelpers()
        for (let i = 0; i < sortedAlarms.length; i++) {
            if (sortedAlarms[i].repeat) {
                sortedAlarms[i].nextAlarm = 'schedule below'
            } else {
                sortedAlarms[i].nextAlarm = helper.todayOrTomorrow(sortedAlarms[i].time)
            }
            
        }
        return sortedAlarms
    }

    getUserAlarms():Promise<Alarm[]> {
        return this.querySvc.getUserAlarms([this.user.uuid])
            .then(alarms => {
                let sortedAlarms = alarms.sort(TimeHelpers.orderTimes)
                return this.addTodayOrTomorrowIndicator(sortedAlarms);
            })
    }

    getDaysOfWeek():Promise<DaysOfWeek> {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid])
    }

    getAlarm():Promise<R.AlarmDB> {
        return this.querySvc.getUserAlarm([this.inputs.alarm_uuid, this.user.uuid])
    }
   
    updateAlarmTime():Promise<void> {
        return TimeHelpers.isMilitaryTime(this.inputs.time) 
            .then(() => {
                return this.querySvc.updateAlarmTime([this.inputs.time, this.inputs.alarm_uuid, this.user.uuid])
            })        
    }

    updateAlarmTitle(): Promise<void>  {
        return this.querySvc.updateAlarmTitle([this.inputs.title, this.inputs.alarm_uuid, this.user.uuid])
    }

    toggleActiveAlarm():Promise<void> {
        let state;
        this.inputs.active === "true" ? state = false : state = true;
        return this.querySvc.updateAlarmToggleActive([state, this.inputs.alarm_uuid, this.user.uuid])
    }

    weekObjToQueryValues():(string|V.UUID)[] {
        return [
            this.inputs.mon,
            this.inputs.tues,
            this.inputs.wed,
            this.inputs.thur,
            this.inputs.fri,
            this.inputs.sat,
            this.inputs.sun,
            this.user.uuid,
            this.inputs.alarm_uuid
        ]
    }



    updateDaysOfWeek():Promise<void>{
        return this.querySvc.updateDaysOfWeek(this.weekObjToQueryValues())
            .then(() => this.querySvc.getUserAlarm([this.inputs.alarm_uuid, this.user.uuid]))
            .then(alarm => {
                if (alarm.sun === true ||
                    alarm.mon === true ||
                    alarm.tues === true ||
                    alarm.wed === true ||
                    alarm.thur === true ||
                    alarm.fri === true ||
                    alarm.sat === true) 
                {
                    return this.querySvc.updateAlarmRepeat([true, this.inputs.alarm_uuid, this.user.uuid])
                } else {
                    return this.querySvc.updateAlarmRepeat([false, this.inputs.alarm_uuid, this.user.uuid])
                }
            })
        }

    deleteAlarm():Promise<void> {
        return this.querySvc.deleteUserAlarm([this.inputs.alarm_uuid, this.user.uuid])
    }

    deleteAllAlarms():Promise<void> {
        return this.querySvc.deleteUserAlarms([this.user.uuid])
    }
} 



export class TimeHelpers {
    date: Date;
    day: number;
    hour: number;
    min: number;

    constructor() {
        this.date = new Date();
        this.day = this.date.getDay();
        this.hour = this.date.getHours();
        this.min = this.date.getMinutes();
    }

    todayOrTomorrow(time:V.MilitaryTime):string {
        let timeArr = time.split(':') // Question out
        let timeH = parseInt(timeArr[0])
        let timeM = parseInt(timeArr[1])

        if (timeH < this.hour) {
            return "tomorrow";
        } else if (timeH > this.hour) {
            return "today";
        } else if (timeH === this.hour) {
            if (timeM < this.min) {
                return "tomorrow";
            } else if (timeM > this.min) {
                return "today";
            } else {
                return "tomorrow";
            }
        } else {
            throw new Error('Something was unaccounted for when determining the next time this alarm goes off!')
        }
    }

    static isMilitaryTime(time) {
        return new Promise(
            (resolve, reject) => {
                console.log('miliatry time', time)
                let militaryRe = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)?$/;
                if (militaryRe.test(time)) {
                    resolve(time)
                } else {
                    reject('alarms time')
                }
            }
        )
    }

    static orderTimes(a, b) {
        const timeA = a.time.split(':').reduce((acc, time) => (60 * acc) + +time);
        const timeB = b.time.split(':').reduce((acc, time) => (60 * acc) + +time);

        let comp = 0;
        if (timeA > timeB) {
            comp = 1;
        } else if (timeB > timeA) {
            comp = -1;
        }
        return comp;
    }

    // WHAT DAY OF THE WEEK IS COMING NEXT? CURRENTLY NOT IN USE, BUT MAY BE USEFUL LATER
    dayOfTheWeek(time) {
        let timeArr = time.split(':')
        let timeH = parseInt(timeArr[0])
        let timeM = parseInt(timeArr[1])

        let dayNum;

        if (timeH < this.hour) {
            dayNum = this.day + 1
        } else if (timeH > this.hour) {
            dayNum = this.day
        } else if (timeH === this.hour) {
            if (timeM < this.min) {
                dayNum = this.day + 1
            } else if (timeM > this.min) {
                dayNum = this.day
            } else {
                dayNum = this.day + 1
            }
        }

        return TimeHelpers.dayNumToString(dayNum)
    }

    static dayNumToString(dayNum) {
        switch (dayNum) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
            default:
                day = "not a day in the western calendar"
        }
        return day;
    }
}