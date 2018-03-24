"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_ALARMS = 'REQ_ALARMS';
var reqPermissions = function () {
    return {
        type: exports.REQ_ALARMS,
    };
};
exports.RECEIVE_ALARMS = 'RECEIVE_ALARMS';
function receiveAlarms(json) {
    return {
        type: exports.RECEIVE_ALARMS,
        alarms: json,
        receivedAt: Date.now()
    };
}
function fetchAlarms() {
    return function (dispatch) {
        dispatch(reqPermissions());
        return fetch("http://localhost:8000/accounts/:email/api/alarms", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (res) {
            console.log('fetch alarms response', res);
            return res.json();
        })
            .then(function (body) {
            var userAlarms = JSON.parse(body);
            console.log(userAlarms);
            dispatch(receiveAlarms(userAlarms));
        });
    };
}
exports.fetchAlarms = fetchAlarms;
//# sourceMappingURL=alarms.js.map