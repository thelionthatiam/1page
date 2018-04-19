// GET ALARMS FOR TICKER
export const REQ_ALARM = 'REQ_ALARM'
export const RES_ALARM = 'RES_ALARM'

export function reqAlarms() {
    return {
        type: REQ_ALARM,
    }
}

function recieveAlarms(alarms) {
    return {
        type: RES_ALARM,
        alarms:alarms
    } 
}

export function fetchAlarms() {
    return function(dispatch) {
        dispatch(reqAlarms())
        return fetch('/app/accounts/:email/alarms/api', {
            method: 'get',
            credentials:'same-origin',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        })
        .then(res => res.json())
        .then(alarms => dispatch(recieveAlarms(alarms)))
        .catch(e => console.log(e))
    }
}

// SAMPLE THUNK
export const REQ_NAME_CHANGE = 'REQ_NAME_CHANGE'
export const RES_NAME_CHANGE = 'RES_NAME_CHANGE'

export function reqNewName(v) {
    return { type: REQ_NAME_CHANGE }
}

function recieveNewName(user) {
    return {
        type: RES_NAME_CHANGE,
        profile: user
    }
}

export function fetchNewName(v) {
    return function (dispatch) {
        dispatch(reqNewName(v))
        return fetch("/new-name", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: v })
        })
            .then((res) => {
                return res.json();
            })
            .then(user => {
                dispatch(recieveNewName(user))
            })
            .catch(e => console.log(e))
    }
}

