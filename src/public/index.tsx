
// DEPENDENCIES
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { WSAEPFNOSUPPORT } from 'constants';
// COMPONENTS
import Blinds from './blinds'
import HamburgerMenu from './menu'
import Shapely from './shapely'
//ACTIONS
import { POPULATE, populate } from './user-data';
import { 
    REQ_PHOTOS,
    RES_PHOTOS,
    REQ_TEST,
    RES_TEST,
    OPEN_BLINDS,
    CLOSE_BLINDS,
    GEN_ERR,
    CLEAR_ERR,
    SCROLL_LOCK
} from './actions'



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
    albums:[],
    blinds: {}
}

function all(state = initialState, action) {
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
            if (action.albums.length !== 0) {
                action.albums.map(album => {
                    album.selected = false
                }) 
            }
            return Object.assign({}, state, {
                isFetching: false,
                albums: action.albums
            })
        case OPEN_BLINDS:
            state.albums.map((album) => {
                for (let k in album) {
                    if (album.id !== action.id) {
                        album.selected = false;
                    } else if (album.id === action.id) {
                        album.selected = true;
                    } else {
                        console.log("error")
                    }
                }
            })
            return Object.assign({}, state, {
                blinds: {
                    albums: state.albums
                }
            })
        case CLOSE_BLINDS:
            state.albums.map((album) => {
                    album.selected = false
            })
            return Object.assign({}, state, {
                blinds: {
                    active: false
                }
            })
        case SCROLL_LOCK:
            return Object.assign({}, state, {
                action
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
    all
})

let store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

function blinds() {
    ReactDOM.render(
        <Provider store={store}>
            <Blinds/>
        </Provider>,
        document.getElementById('blinds')
    )
}

function menu() {
    ReactDOM.render(
        <Provider store = { store }>
            <HamburgerMenu />
        </Provider>,
        document.getElementById('menu')
    )
}

function shapely() {
    ReactDOM.render(
        <Provider store={store}>
            <Shapely />
        </Provider>,
        document.getElementById('root')
    )
}


export { store, populate, blinds, menu, shapely};