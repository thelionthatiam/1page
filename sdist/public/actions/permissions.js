"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQ_PERMISSIONS = 'REQ_PERMISSIONS';
exports.reqPermissions = function () {
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
//# sourceMappingURL=permissions.js.map