// TITLE CHANGE
export const REQ_ACTIVE_TOGGLE = 'REQ_ACTIVE_TOGGLE';
export const RES_ACTIVE_TOGGLE = 'RES_ACTIVE_TOGGLE';

export function reqActiveToggle(v) {
    console.log('req new timr', v)
    return { type: REQ_ACTIVE_TOGGLE }
}

function recieveActiveToggle(alarms) {
    console.log('REC NEW ACTIVE STATE', alarms)
    return {
        type: RES_ACTIVE_TOGGLE,
        alarms: alarms
    }
}

export function fetchActiveToggle(v) {
    console.log('FETCH ACTIVE TOGGLE', v)
    return function (dispatch) {
        dispatch(reqActiveToggle(v))
        console.log(reqActiveToggle)
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
                console.log(alarms)
                dispatch(recieveActiveToggle(alarms))
            })
    }
}