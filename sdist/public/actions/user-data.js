"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_USER = 'REQ_USER';
var reqUserData = function () {
    return { type: exports.REQ_USER };
};
exports.RECEIVE_USER = 'RECEIVE_USER';
function receiveUserData(json) {
    return {
        type: exports.RECEIVE_USER,
        profile: json.profile,
        alarms: json.alarms,
        settings: json.settings,
        orgs: json.orgs,
        receivedAt: Date.now()
    };
}
function fetchUserData() {
    return function (dispatch) {
        dispatch(reqUserData());
        return fetch("http://localhost:8000/user-data", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (body) {
            dispatch(receiveUserData(body));
        })
            .catch(function (err) {
            console.log(err);
        });
    };
}
exports.fetchUserData = fetchUserData;
//# sourceMappingURL=user-data.js.map