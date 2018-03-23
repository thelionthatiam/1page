"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var permissions_1 = require("../actions/permissions");
var initialState = {
    message: 'Hello'
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
var permission = redux_1.combineReducers({ permissionCheck: permissionCheck });
exports.default = permission;
//# sourceMappingURL=permissions.js.map