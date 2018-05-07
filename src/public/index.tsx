import App from './app'
import { TestApp } from './test'
import NewAccount from './unused/components/new-account';
import { AlarmClock } from './alarm-clock'
import { SimpleClock } from './simple-clock'
import * as wp from 'web-push';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { POPULATE, populate } from './user-data';
import { 
    REQ_NAME_CHANGE,
    RES_NAME_CHANGE,
    GEN_ERR,
    CLEAR_ERR,
} from './actions'
import {
    REQ_ALARM,
    RES_ALARM,
    REQ_TIME_CHANGE,
    RES_TIME_CHANGE,
    REQ_ACTIVE_TOGGLE,
    RES_ACTIVE_TOGGLE,
    REQ_ALARM_TITLE,
    REQ_ALARM_ARCHIVE,
    RES_ALARM_ARCHIVE,
    RES_ALARM_TITLE
} from './actions-alarm'
import { WSAEPFNOSUPPORT } from 'constants';


// wrap around erroring component 
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

let initialState = {}

function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE:
            return Object.assign({}, state, {
                profile:action.userData.profile,
                alarms:action.userData.alarms
            })
        case REQ_TIME_CHANGE:
            return Object.assign({}, state, { isFetching: true })
        case RES_TIME_CHANGE:
            return Object.assign({}, state, { 
                isFetching: false,
                alarms: action.alarms,
                error: "dismissed"
            }) 
        case REQ_NAME_CHANGE:
            return Object.assign({}, state, { isFetching: true })
        case RES_NAME_CHANGE:
            return Object.assign({}, state, {
                isFetching: false,
                profile: action.profile
            }) 
        case REQ_ALARM:
            return Object.assign({}, state, { isFetching: true })
        case RES_ALARM:
            return Object.assign({}, state, {
                isFetching: false,
                alarms: action.alarms                
            })
        case REQ_ACTIVE_TOGGLE:
            return Object.assign({}, state, {isFetching : true})
        case RES_ACTIVE_TOGGLE:
            console.log('res active toggle', action)
            return Object.assign({}, state, {
                isFetching:false,
                alarms:action.alarms
            })
        case REQ_ALARM_TITLE:
            return Object.assign({}, state, {isFetching: true})
        case REQ_ALARM_TITLE:

            return Object.assign({}, state, {
                isFetching:false,
                alarms:action.alarms
            })
        case REQ_ALARM_ARCHIVE:
            return Object.assign({}, state, { isFetching: true })
        case REQ_ALARM_ARCHIVE:
            return Object.assign({}, state, {
                isFetching: false,
                alarms: action.alarms
            })
        case GEN_ERR:
            console.log('gen error', action)
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            })
        case CLEAR_ERR:
            return Object.assign({}, state, {
                error: action.error,
            })
        default:
            return state;
    }
}  

let reducer = combineReducers({
    userData: userDataReducer
})

let store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

function test() {
  ReactDOM.render(
    <Provider store = { store }>
        <TestApp/>
    </Provider>,
  document.getElementById('root'));
}


export { store, populate, test };