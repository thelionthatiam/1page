import { combineReducers } from 'redux';
import { REQ_PERMISSIONS, RECEIVE_PERMISSIONS } from '../actions/permissions';
import { REQ_ALARMS, RECEIVE_ALARMS } from '../actions/alarms';
// import { REQ_USER, RECEIVE_USER } from '../actions/user-data'
// import { settings } from 'cluster';
import { POPULATE } from '../actions/user-data'

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

let initialState = { userData: 'nothing populated, click below to see whats up' }

const populateUserData = (state = initialState, action) => {
    console.log('reducer, populate user data')
    switch (action.type) {
        case POPULATE:
            console.log('reducer POPULATE', action.data)
            return Object.assign({}, state, { userData: 'whatever' }) // where are you, user data?
        default:
            console.log('reducer default')
            return state;
    }
}


const appReducers = combineReducers({
    populateUserData
})

export default appReducers;


