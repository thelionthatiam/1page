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
// TIME CHANGE
exports.REQ_TIME_CHANGE = 'REQ_TIME_CHANGE';
exports.RES_TIME_CHANGE = 'RES_TIME_CHANGE';
exports.GEN_ERR = 'GEN_ERR';
exports.CLEAR_ERR = 'CLEAR_ERR';
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
function clearError() {
    console.log('clear errors');
    return {
        type: exports.CLEAR_ERR,
        error: 'dismissed',
        route: 'dismissed'
    };
}
exports.clearError = clearError;
function recieveError(error, dispatch) {
    console.log('do we even get here??');
    console.log(typeof error.error);
    if (error.error !== null && typeof error.error === 'object') {
        console.log('The input was an object from postgres, write a more specific error for the route: ', error.route);
        error.error = 'There was a problem with your input. Try again.';
    }
    console.log(error);
    return {
        type: exports.GEN_ERR,
        error: error.error,
        route: error.route
    };
}
exports.recieveError = recieveError;
function fetchNewTime(v) {
    return function (dispatch) {
        dispatch(reqNewTime(v));
        console.log(reqNewTime);
        return fetch("/app/accounts/:email/alarms/:alarm_uuid/time/api?_method=PUT", {
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
                return dispatch(recieveError(alarms, dispatch));
            }
            dispatch(recieveNewTime(alarms));
        });
    };
}
exports.fetchNewTime = fetchNewTime;
// TITLE CHANGE
// export const REQ_TITLE_CHANGE = 'REQ_TIME_CHANGE';
// export const RES_TITLE_CHANGE = 'RES_TIME_CHANGE';
// export function reqNewTitle(v) {
//     console.log('req new timr', v)
//     return { type: REQ_TITLE_CHANGE }
// }
// function recieveNewTitle(profile) {
//     console.log('rec new time', profile)
//     return {
//         type: RES_TIME_CHANGE,
//         profile: profile
//     }
// }
// export function fetchNewTitle(v) {
//     return function (dispatch) {
//         dispatch(reqNewTitle(v))
//         console.log(reqNewTitle)
//         return fetch("/app/accounts/:email/alarms/:alarm_uuid/time/api?_method=PUT", {
//             method: "post",
//             credentials: 'same-origin',
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(v)
//         })
//             .then((res) => res.json())
//             .then(profile => {
//                 dispatch(recieveNewTitle(profile))
//             })
//     }
// }
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