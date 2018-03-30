"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var permissions_1 = require("../actions/permissions");
var initialState = {
    permission: 'guest',
};
function getPermissions(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case permissions_1.REQ_PERMISSIONS:
            console.log('req_permission case');
            if (window.permission === 'guest') {
                return state;
            }
            else if (window.permission === 'user') {
                var user = window.userData;
                return Object.assign({}, state, {
                    permission: window.permission,
                    profile: user.profile,
                    alarms: user.alarms,
                    settings: user.settings,
                    orgs: user.orgs,
                    lastUpdated: Date.now()
                });
            }
            else {
                throw new Error('window.permission not set');
            }
        case permissions_1.RECEIVE_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: false,
                permission: action.gets,
                lastUpdated: action.recievedAt
            });
        default:
            console.log('default case');
            return state;
    }
}
// let user = window.userData;
// let initialUserData;
// if (window.permission === 'user') {
//     initialUserData = {
//         isFetching: false,
//         profile: user.profile,
//         alarms: user.alarms,
//         settings: user.settings,
//         orgs: user.orgs,
//         lastUpdated: Date.now()
//     }
// } else if (window.permission === 'guest') {
//     initialUserData = 'guest'
// } else {
//     throw new Error('permissions never set.')
// }
// function getUserData(state = initialUserData, action) {
//     switch (action.type) {
//         case REQ_USER:
//             return Object.assign({}, state, {isFetching: true})
//         case RECEIVE_USER:
//             console.log('reducer action', action)return Object.assign({}, state, {
//                 isFetching: false,
//                 profile: action.profile,
//                 alarms: action.alarms,
//                 settings: action.settings,
//                 orgs: action.orgs,
//                 lastUpdatedUser: action.recievedAt
//             })
//         default:
//             return state
//     }
// }
var appReducers = redux_1.combineReducers({
    getPermissions: getPermissions,
});
exports.default = appReducers;
//# sourceMappingURL=app-reducers.js.map