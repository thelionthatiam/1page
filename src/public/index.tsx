import Photos from './photos'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { POPULATE, populate } from './user-data';
import { 
    REQ_PHOTOS,
    RES_PHOTOS,
    REQ_TEST,
    RES_TEST,
    GEN_ERR,
    CLEAR_ERR,
} from './actions'
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
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

let initialState = {
    albums:[]
}

function reduce(state = initialState, action) {
    switch (action.type) {
        case POPULATE:
            return Object.assign({}, state, {
                profile:action.userData.profile,
                alarms:action.userData.alarms
            })
        case REQ_PHOTOS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RES_PHOTOS:
            return Object.assign({}, state, {
                isFetching: false,
                albums: action.albums
            })
        case REQ_TEST:
            return Object.assign({}, state, {
                isFetching:true
            })
        case RES_TEST:
            return Object.assign({}, state, {
                isFetching:false,
                test:action.test
            })
        case GEN_ERR:
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
    all: reduce
})

let store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

function photos() {
  ReactDOM.render(
    <Provider store = { store }>
        <Photos/>
    </Provider>,
  document.getElementById('root'));
}


export { store, populate, photos };