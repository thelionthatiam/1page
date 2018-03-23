import { combineReducers } from 'redux'
import { GUEST, USER } from '../actions/permissions'
import { REQ_PERMISSIONS, RECEIVE_PERMISSIONS } from '../actions/async-permissions'


function getPermissions( 
    state = {
        isFetching: false,
        permissions: 'guest', 
    },
    action
) {
    switch (action.type) {
        case REQ_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching:true // doesn't mutate state?
            })
        case RECEIVE_PERMISSIONS:
            return Object.assign({}, state, {
                isFetching: false,
                permissions: action.gets,
                lastUpdated: action.recievedAt
            })
        default:
            return state
    }
}

let initialState = {
    message: 'Hello, undecided.'
}


const permissionCheck = (state = initialState, action) => {
    switch (action.type) {
        case GUEST:
            return Object.assign({}, state, {message: 'Hello, guest!'})
        case USER:
            return Object.assign({}, state, {message: 'Hello, user!'})
        default:
            return state
    }
}


const permissions = combineReducers({
    permissionCheck,
    getPermissions
})

export default permissions


