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

    getDaysOfWeek() {
        return this.querySvc.getDaysOfWeek([this.inputs.alarm_uuid, this.user.uuid])
    }

    getAlarm() {
        return this.querySvc.getAlarm([this.inputs.alarm_uuid, this.user.uuid])
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
} 