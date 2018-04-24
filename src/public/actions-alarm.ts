import { recieveError } from './actions'
// ADD ALARM

export const REQ_NEW_ALARM = 'REQ_NEW_ALARM';
export const RES_NEW_ALARM = 'RES_NEW_ALARM';

export function reqNewAlarm(v) {
    return { type: REQ_NEW_ALARM }
}

function recieveNewAlarm(alarms) {
    return {
        type: RES_NEW_ALARM,
        alarms: alarms
    }
}

export function fetchNewAlarm(v) {
    return function (dispatch) {
        dispatch(reqNewAlarm(v))
        return fetch("/app/accounts/:email/alarms/api", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(v)
        })
            .then((res) => res.json())
            .then(alarms => {
                if (alarms.status === 'failed') {
                    return dispatch(recieveError(alarms, dispatch))
                }
                dispatch(recieveNewAlarm(alarms))
            })
    }
}

// TOGGLE ACTIVE
export const REQ_ACTIVE_TOGGLE = 'REQ_ACTIVE_TOGGLE';
export const RES_ACTIVE_TOGGLE = 'RES_ACTIVE_TOGGLE';

export function reqActiveToggle(v) {
    return { type: REQ_ACTIVE_TOGGLE }
}

function recieveActiveToggle(alarms) {
    return {
        type: RES_ACTIVE_TOGGLE,
        alarms: alarms
    }
}

export function fetchActiveToggle(v) {
    return function (dispatch) {
        dispatch(reqActiveToggle(v))
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/active/api?_method=PUT", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(v)
        })
            .then((res) => res.json())
            .then(alarms => {
                if (alarms.status === 'failed') {
                    return dispatch(recieveError(alarms, dispatch))
                }
                dispatch(recieveActiveToggle(alarms))
            })
    }
}

// TITLE
export const REQ_ALARM_TITLE = 'REQ_ALARM_TITLE';
export const RES_ALARM_TITLE = 'RES_ALARM_TITLE';

export function reqAlarmTitle(v) {
    return { type: REQ_ALARM_TITLE }
}

function recieveAlarmTitle(alarms) {
    return {
        type: RES_ACTIVE_TOGGLE,
        alarms: alarms
    }
}

export function fetchAlarmTitle(v) {
    return function (dispatch) {
        dispatch(reqActiveToggle(v))
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/title/api?_method=PUT", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(v)
        })
            .then((res) => res.json())
            .then(alarms => {
                console.log('return from fetch new titile', alarms)
                if (alarms.status === 'failed') {
                    return dispatch(recieveError(alarms, dispatch))
                }
                dispatch(recieveActiveToggle(alarms))
            })
    }
}