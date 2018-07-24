"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const React = require("react");
const ReactDOM = require("react-dom");
const react_redux_1 = require("react-redux");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const redux_thunk_1 = require("redux-thunk");
const redux_1 = require("redux");
// COMPONENTS
const blinds_1 = require("./blinds");
const menu_1 = require("./menu");
const shapely_1 = require("./shapely");
const test_1 = require("./test");
const blinds_in_the_thick_1 = require("./blinds-in-the-thick");
//ACTIONS
const user_data_1 = require("./user-data");
exports.populate = user_data_1.populate;
const actions_1 = require("./actions");
// wrap around erroring component 
let initialState = {
    albums: [],
    blinds: {}
};
function all(state = initialState, action) {
    switch (action.type) {
        case user_data_1.POPULATE:
            return Object.assign({}, state, {
                profile: action.userData.profile,
                alarms: action.userData.alarms
            });
        case actions_1.REQ_PHOTOS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case actions_1.RES_PHOTOS:
            if (action.albums.length !== 0) {
                action.albums.map(album => {
                    album.selected = false;
                });
            }
            console.log('inside res photos');
            return Object.assign({}, state, {
                isFetching: false,
                albums: action.albums
            });
        case actions_1.OPEN_BLINDS:
            state.albums.map((album) => {
                for (let k in album) {
                    if (album.id !== action.id) {
                        album.selected = false;
                    }
                    else if (album.id === action.id) {
                        album.selected = true;
                    }
                    else {
                        console.log("error");
                    }
                }
            });
            return Object.assign({}, state, {
                blinds: {
                    albums: state.albums
                }
            });
        case actions_1.CLOSE_BLINDS:
            state.albums.map((album) => {
                album.selected = false;
            });
            return Object.assign({}, state, {
                blinds: {
                    active: false
                }
            });
        case actions_1.SCROLL_LOCK:
            return Object.assign({}, state, {
                action
            });
        case actions_1.REQ_TEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case actions_1.RES_TEST:
            return Object.assign({}, state, {
                isFetching: false,
                test: action.test
            });
        case actions_1.GEN_ERR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            });
        case actions_1.CLEAR_ERR:
            return Object.assign({}, state, {
                error: action.error,
            });
        default:
            return state;
    }
}
let reducer = redux_1.combineReducers({
    all
});
let store = redux_1.createStore(reducer, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
exports.store = store;
function test() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(test_1.TestApp, null)), document.getElementById('test'));
}
function blinds(route) {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(blinds_1.default, { route: route })), document.getElementById('blinds'));
}
function menu() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(menu_1.default, null)), document.getElementById('menu'));
}
exports.menu = menu;
function shapely() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(shapely_1.default, null)), document.getElementById('root'));
}
exports.shapely = shapely;
function blindsInTheThick() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(blinds_in_the_thick_1.default, null)), document.getElementById('whenInTheThick'));
}
//# sourceMappingURL=index.js.map