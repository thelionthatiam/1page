import QuerySvc from '../data-access/queries';
import { deepMerge } from '../services/merge'
import * as R from '../services/value-objects';
import * as V from '../services/validation';

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

    orderTimes(a,b) {
        const timeA = parseInt(a.time);
        const timeB = parseInt(b.time);

        let comp = 0;
        if (timeA > timeB) {
            comp = 1;
        } else if (timeB > timeA) {
            comp = -1;
        }
        return comp;
    }

    getUserAlarms() {
        return this.querySvc.getUserAlarms([this.user.uuid])
            .then(alarms => {
                let sortedAlarms = alarms.sort(this.orderTimes)
                return sortedAlarms;
            })
    }

    getDaysOfWeek() {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid])
    }

    getAlarm() {
        return this.querySvc.getUserAlarm([this.inputs.alarm_uuid, this.user.uuid])
    }

   
    updateAlarmTime() {
        return this.querySvc.updateAlarmTime([this.inputs.time, this.inputs.alarm_uuid, this.user.uuid])
    }

    updateAlarmTitle() {
        return this.querySvc.updateAlarmTitle([this.inputs.title, this.inputs.alarm_uuid, this.user.uuid])
    }

    toggleActiveAlarm() {

    }

    weekObjToQueryValues() {
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

    updateDaysOfWeek(){
        return this.querySvc.updateDaysOfWeek(this.weekObjToQueryValues())
    }

    deleteAlarm() {

    }

    deleteAllAlarms() {
        
    }
} 



class TimeHelpers {
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

    nextActiveAlarm(time) {
        let timeArr = time.split(':')
        let timeH = parseInt(timeArr[0])
        let timeM = parseInt(timeArr[1])

        console.log('time', timeH, 'h', this.hour)
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
        console.log('running')
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