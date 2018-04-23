"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TITLE CHANGE
exports.REQ_ACTIVE_TOGGLE = 'REQ_ACTIVE_TOGGLE';
exports.RES_ACTIVE_TOGGLE = 'RES_ACTIVE_TOGGLE';
function reqActiveToggle(v) {
    console.log('req new timr', v);
    return { type: exports.REQ_ACTIVE_TOGGLE };
}
exports.reqActiveToggle = reqActiveToggle;
function recieveActiveToggle(alarms) {
    console.log('REC NEW ACTIVE STATE', alarms);
    return {
        type: exports.RES_ACTIVE_TOGGLE,
        alarms: alarms
    };
}
function fetchActiveToggle(v) {
    console.log('FETCH ACTIVE TOGGLE', v);
    return function (dispatch) {
        dispatch(reqActiveToggle(v));
        console.log(reqActiveToggle);
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/active/api?_method=PUT", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(v)
        })
            .then(function (res) { return res.json(); })
            .then(function (alarms) {
            console.log(alarms);
            dispatch(recieveActiveToggle(alarms));
        });
    };
}
exports.fetchActiveToggle = fetchActiveToggle;
//# sourceMappingURL=actions-alarm.js.map