"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_USER = 'REQ_USER';
var reqUserData = function () {
    return { type: exports.REQ_USER };
};
exports.RECEIVE_USER = 'RECEIVE_USER';
function receiveUserData(json) {
    console.log('recieve user data');
    return {
        type: exports.RECEIVE_USER,
        gets: json,
        receivedAt: Date.now()
    };
}
function fetchUserData() {
    return function (dispatch) {
        console.log('fetch user data');
        dispatch(reqUserData());
        return fetch("http://localhost:8000/user-data", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            console.log('fetch user data response', res);
            return res.json();
        }).then(function (body) {
            console.log(typeof body);
            var userData = JSON.stringify(body);
            dispatch(receiveUserData(body));
        })
            .catch(function (err) {
            console.log(err);
        });
    };
}
exports.fetchUserData = fetchUserData;
//# sourceMappingURL=user-data.js.map