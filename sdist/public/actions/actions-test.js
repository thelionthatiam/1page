"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_NAME_CHANGE = 'REQ_NAME_CHANGE';
exports.RES_NAME_CHANGE = 'RES_NAME_CHANGE';
function reqNewName() {
    console.log('req new name: here is a new name');
    return { type: exports.REQ_NAME_CHANGE };
}
exports.reqNewName = reqNewName;
function recieveNewName(json) {
    return {
        type: exports.RES_NAME_CHANGE,
        newName: json.name
    };
}
function fetchNewName(v) {
    console.log('fetch new name', v);
    return function (dispatch) {
        dispatch(reqNewName);
        return fetch("http://localhost:8000/new-name", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: v
        })
            .then(function (res) {
            return res.json();
        })
            .then(function (body) {
            dispatch(recieveNewName(body));
        })
            .catch(function (e) { return console.log(e); });
    };
}
exports.fetchNewName = fetchNewName;
//# sourceMappingURL=actions-test.js.map