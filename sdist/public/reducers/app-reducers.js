"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
// import { REQ_USER, RECEIVE_USER } from '../actions/user-data'
// import { settings } from 'cluster';
var user_data_1 = require("../actions/user-data");
// let initialState = {
//     permission: 'guest',
// }
// function getPermissions(state = initialState, action) {
//     switch (action.type) {
//         case REQ_PERMISSIONS:
//             console.log('req_permission case')
//             if (window.permission === 'guest') {
//                 return state;
//             } else if (window.permission === 'user') {
//                 let user = window.userData;
//                 return Object.assign({}, state, {
//                     permission:window.permission,
//                     profile: user.profile,
//                     alarms: user.alarms,
//                     settings: user.settings,
//                     orgs: user.orgs,
//                     lastUpdated: Date.now()
//                 })
//             } else {
//                 throw new Error ('window.permission not set')
//             }
//         case RECEIVE_PERMISSIONS:
//             return Object.assign({}, state, {
//                 isFetching: false,
//                 permission: action.gets,
//                 lastUpdated: action.recievedAt
//             })
//         default:
//             console.log('default case')
//             return state
//     }
// }
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
// function getUserData(state = null, action) {
//     switch (action.type) {
//         case REQ_USER:
//             return Object.assign({}, state, {isFetching: true})
//         case RECEIVE_USER:
//             console.log('reducer action', action)
//             return Object.assign({}, state, {
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
var initialState = { userData: 'nothing populated, click below to see whats up' };
var populateUserData = function (state, action) {
    if (state === void 0) { state = initialState; }
    console.log('reducer, populate user data');
    switch (action.type) {
        case user_data_1.POPULATE:
            console.log('reducer POPULATE', action.data);
            return Object.assign({}, state, { userData: 'whatever' }); // where are you, user data?
        default:
            console.log('reducer default');
            return state;
    }
};
var appReducers = redux_1.combineReducers({
    populateUserData: populateUserData
});
exports.default = appReducers;
//# sourceMappingURL=app-reducers.js.map