"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GET ALARMS FOR TICKER
exports.REQ_ALARM = 'REQ_ALARM';
exports.RES_ALARM = 'RES_ALARM';
function reqAlarms() {
    return {
        type: exports.REQ_ALARM,
    };
}
exports.reqAlarms = reqAlarms;
function recieveAlarms(alarms) {
    return {
        type: exports.RES_ALARM,
        alarms: alarms
    };
}
function fetchAlarms() {
    return function (dispatch) {
        dispatch(reqAlarms());
        return fetch('/app/accounts/:email/alarms/api', {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (alarms) { return dispatch(recieveAlarms(alarms)); })
            .catch(function (e) { return console.log(e); });
    };
}
exports.fetchAlarms = fetchAlarms;
// SAMPLE THUNK
exports.REQ_TIME_CHANGE = 'REQ_TIME_CHANGE';
exports.RES_TIME_CHANGE = 'RES_TIME_CHANGE';
function reqNewTime(v) {
    console.log('req new timr', v);
    return { type: exports.REQ_TIME_CHANGE };
}
exports.reqNewTime = reqNewTime;
function recieveNewTime(alarms) {
    console.log('rec new time', alarms);
    return {
        type: exports.RES_TIME_CHANGE,
        alarms: alarms
    };
}
function fetchNewTime(v) {
    console.log('fetch new time one:', v);
    return function (dispatch) {
        console.log('fetch new time two:', v);
        dispatch(reqNewTime(v));
        console.log(reqNewTime);
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/time?_method=PUT", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "test": "true"
            },
            body: JSON.stringify(v)
        })
            .then(function (res) { return res.json(); })
            .then(function (alarms) {
            console.log('fetch new time', alarms);
            dispatch(recieveNewTime(alarms));
        })
            .catch(function (e) { return console.log(e); });
    };
}
exports.fetchNewTime = fetchNewTime;
// SAMPLE THUNK
exports.REQ_NAME_CHANGE = 'REQ_NAME_CHANGE';
exports.RES_NAME_CHANGE = 'RES_NAME_CHANGE';
function reqNewName(v) {
    return { type: exports.REQ_NAME_CHANGE };
}
exports.reqNewName = reqNewName;
function recieveNewName(user) {
    return {
        type: exports.RES_NAME_CHANGE,
        profile: user
    };
}
function fetchNewName(v) {
    return function (dispatch) {
        dispatch(reqNewName(v));
        return fetch("/new-name", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: v })
        })
            .then(function (res) {
            return res.json();
        })
            .then(function (user) {
            dispatch(recieveNewName(user));
        })
            .catch(function (e) { return console.log(e); });
    };
}
exports.fetchNewName = fetchNewName;
//# sourceMappingURL=actions.js.map