"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_PERMISSIONS = 'REQ_PERMISSIONS';
var reqPermissions = function () {
    return {
        type: exports.REQ_PERMISSIONS,
    };
};
exports.RECEIVE_PERMISSIONS = 'RECEIVE_PERMISSIONS';
function receivePermissions(json) {
    return {
        type: exports.RECEIVE_PERMISSIONS,
        gets: json.permission,
        receivedAt: Date.now()
    };
}
function fetchPermissions() {
    return function (dispatch) {
        dispatch(reqPermissions());
        return fetch("http://localhost:8000/permission", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (res) {
            console.log('fetch permissions response');
            return res.json();
        })
            .then(function (body) {
            var userSession = JSON.parse(body);
            dispatch(receivePermissions(userSession));
        })
            .catch(function (err) {
            console.log(err);
        });
    };
}
exports.fetchPermissions = fetchPermissions;
//# sourceMappingURL=permissions.js.map