import { combineReducers } from 'redux'
import {GUEST, USER} from '../actions/permissions'

let initialState = {
    message: 'Hello'
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

const permissions = combineReducers({permissionCheck})

export default permissions
