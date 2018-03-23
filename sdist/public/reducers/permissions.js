"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var permissions_1 = require("../actions/permissions");
var async_permissions_1 = require("../actions/async-permissions");
function getPermissions(state, action) {
    if (state === void 0) { state = {
        isFetching: false,
        permissions: 'guest',
    }; }
    switch (action.type) {
        case async_permissions_1.REQ_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: true // doesn't mutate state?
            });
        case async_permissions_1.RECEIVE_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: false,
                permissions: action.gets,
                lastUpdated: action.recievedAt
            });
        default:
            return state;
    }
}
var initialState = {
    message: 'Hello, undecided.'
};
var permissionCheck = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case permissions_1.GUEST:
            return Object.assign({}, state, { message: 'Hello, guest!' });
        case permissions_1.USER:
            return Object.assign({}, state, { message: 'Hello, user!' });
        default:
            return state;
    }
};
var permissions = redux_1.combineReducers({
    permissionCheck: permissionCheck,
    getPermissions: getPermissions
});
exports.default = permissions;
//# sourceMappingURL=permissions.js.map