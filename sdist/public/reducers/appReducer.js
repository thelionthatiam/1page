"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var permissions_1 = require("../actions/permissions");
var initialState = {
    message: 'Hello, undecided.',
    isFetching: false,
    permission: 'guest'
};
function getPermissions(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case permissions_1.REQ_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case permissions_1.RECEIVE_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: false,
                permission: action.gets,
                lastUpdated: action.recievedAt
            });
        default:
            return state;
    }
}
var appReducer = redux_1.combineReducers({
    getPermissions: getPermissions
});
exports.default = appReducer;
//# sourceMappingURL=appReducer.js.map