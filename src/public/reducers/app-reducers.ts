import { combineReducers } from 'redux';
import { REQ_PERMISSIONS, RECEIVE_PERMISSIONS } from '../actions/permissions';
import { REQ_ALARMS, RECEIVE_ALARMS } from '../actions/alarms';

let initialState = {
    isFetching: false,
    permission: 'guest',
    alarms: 'nothing here!'
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


const appReducers = combineReducers({
    getPermissions,
    getAlarms
})

export default appReducers


