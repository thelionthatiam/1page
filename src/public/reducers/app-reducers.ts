import { combineReducers } from 'redux';
import { REQ_PERMISSIONS, RECEIVE_PERMISSIONS } from '../actions/permissions';
import { REQ_ALARMS, RECEIVE_ALARMS } from '../actions/alarms';
import { REQ_USER, RECEIVE_USER } from '../actions/user-data'

let initialState = {
    isFetching: false,
    permission: 'guest',
    alarms: 'nothing here!',
}

function getPermissions(state = initialState, action) {
    switch (action.type) {
        case REQ_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching:true
            })
        case RECEIVE_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: false,
                permission: action.gets,
                lastUpdated: action.recievedAt
            })
        default:
            return state
    }
}


function getAlarms(state = initialState, action) {
    switch(action.type) {
        case REQ_ALARMS:
            return Object.assign({}, state, {
                isFetching:true
            })
        case RECEIVE_ALARMS:
            return Object.assign({}, state, {
                isFetching: false,
                alarms:action.alarms,
                lastUpdated:action.recievedAt
            })
        default: 
            return state
    }
}

let initialUserData = {
        profile: {},
        alarms: {},
        settings: {},
        orgs: {}
}

function getUserData(state = initialUserData, action) {
    console.log('user data reducer')
    switch(action.type) {
        case REQ_USER:
            return Object.assign({}, state, {
                isFetching:true
            })
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.gets,
                lastUpdatedUser: action.recievedAt
            })
        default: 
            return state
    }
}


const appReducers = combineReducers({
    getPermissions,
    getAlarms,
    getUserData
})

export default appReducers


