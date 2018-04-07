export const REQ_ALARMS = 'REQ_ALARMS';

const reqPermissions = () => {
    return {
        type: REQ_ALARMS,
    }
}

export const RECEIVE_ALARMS = 'RECEIVE_ALARMS'

function receiveAlarms(json) {
    return {
        type: RECEIVE_ALARMS,
        alarms: json,
        receivedAt: Date.now()
    }
}


export function fetchAlarms(){
    return function (dispatch) {
        dispatch(reqPermissions())
        return fetch("http://localhost:8000/accounts/:email/api/alarms", {
                    method: "get",
                    credentials : 'same-origin',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    console.log('fetch alarms response', res);
                    return res.json();
                })
                .then((body) => {
                    let userAlarms = JSON.parse(body); 
                    console.log(userAlarms)
                    dispatch(receiveAlarms(userAlarms));
                })
    }
}