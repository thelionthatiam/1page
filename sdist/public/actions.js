"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_NAME_CHANGE = 'REQ_NAME_CHANGE';
exports.RES_NAME_CHANGE = 'RES_NAME_CHANGE';
function reqNewName(v) {
    console.log('req new name, here is a new name: ', v);
    return { type: exports.REQ_NAME_CHANGE };
}
exports.reqNewName = reqNewName;
function recieveNewName(name) {
    console.log('RECIEVE NEW NAME', name);
    return {
        type: exports.RES_NAME_CHANGE,
        newName: name
    };
}
function fetchNewName(v) {
    console.log('fetch new name', v);
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
            console.log(res);
            return res.json();
        })
            .then(function (name) {
            console.log(name);
            dispatch(recieveNewName(name));
        })
            .catch(function (e) { return console.log(e); });
    };
}
exports.fetchNewName = fetchNewName;
//# sourceMappingURL=actions.js.map