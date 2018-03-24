"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var permissions_1 = require("../actions/permissions");
var alarms_1 = require("../actions/alarms");
var initialState = {
    isFetching: false,
    permission: 'guest',
    alarms: 'nothing here!'
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
function getAlarms(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case alarms_1.REQ_ALARMS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case alarms_1.RECEIVE_ALARMS:
            return Object.assign({}, state, {
                isFetching: false,
                alarms: action.alarms,
                lastUpdated: action.recievedAt
            });
        default:
            return state;
    }
}
var appReducers = redux_1.combineReducers({
    getPermissions: getPermissions,
    getAlarms: getAlarms
});
exports.default = appReducers;
//# sourceMappingURL=app-reducers.js.map