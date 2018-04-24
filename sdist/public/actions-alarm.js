"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
// ADD ALARM
exports.REQ_NEW_ALARM = 'REQ_NEW_ALARM';
exports.RES_NEW_ALARM = 'RES_NEW_ALARM';
function reqNewAlarm(v) {
    return { type: exports.REQ_NEW_ALARM };
}
exports.reqNewAlarm = reqNewAlarm;
function recieveNewAlarm(alarms) {
    return {
        type: exports.RES_NEW_ALARM,
        alarms: alarms
    };
}
function fetchNewAlarm(v) {
    return function (dispatch) {
        dispatch(reqNewAlarm(v));
        return fetch("/app/accounts/:email/alarms/api", {
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
            if (alarms.status === 'failed') {
                return dispatch(actions_1.recieveError(alarms, dispatch));
            }
            dispatch(recieveNewAlarm(alarms));
        });
    };
}
exports.fetchNewAlarm = fetchNewAlarm;
// TOGGLE ACTIVE
exports.REQ_ACTIVE_TOGGLE = 'REQ_ACTIVE_TOGGLE';
exports.RES_ACTIVE_TOGGLE = 'RES_ACTIVE_TOGGLE';
function reqActiveToggle(v) {
    return { type: exports.REQ_ACTIVE_TOGGLE };
}
exports.reqActiveToggle = reqActiveToggle;
function recieveActiveToggle(alarms) {
    return {
        type: exports.RES_ACTIVE_TOGGLE,
        alarms: alarms
    };
}
function fetchActiveToggle(v) {
    return function (dispatch) {
        dispatch(reqActiveToggle(v));
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
            if (alarms.status === 'failed') {
                return dispatch(actions_1.recieveError(alarms, dispatch));
            }
            dispatch(recieveActiveToggle(alarms));
        });
    };
}
exports.fetchActiveToggle = fetchActiveToggle;
// TITLE
exports.REQ_ALARM_TITLE = 'REQ_ALARM_TITLE';
exports.RES_ALARM_TITLE = 'RES_ALARM_TITLE';
function reqAlarmTitle(v) {
    return { type: exports.REQ_ALARM_TITLE };
}
exports.reqAlarmTitle = reqAlarmTitle;
function recieveAlarmTitle(alarms) {
    return {
        type: exports.RES_ACTIVE_TOGGLE,
        alarms: alarms
    };
}
function fetchAlarmTitle(v) {
    return function (dispatch) {
        dispatch(reqActiveToggle(v));
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/title/api?_method=PUT", {
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
            console.log('return from fetch new titile', alarms);
            if (alarms.status === 'failed') {
                return dispatch(actions_1.recieveError(alarms, dispatch));
            }
            dispatch(recieveActiveToggle(alarms));
        });
    };
}
exports.fetchAlarmTitle = fetchAlarmTitle;
//# sourceMappingURL=actions-alarm.js.map