"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
// COMPONENTS
var blinds_1 = require("./blinds");
var menu_1 = require("./menu");
var shapely_1 = require("./shapely");
//ACTIONS
var user_data_1 = require("./user-data");
exports.populate = user_data_1.populate;
var actions_1 = require("./actions");
// wrap around erroring component 
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return React.createElement("h1", null, "Something went wrong.");
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
var initialState = {
    albums: [],
    blinds: {}
};
function all(state, action) {
    if (state === void 0) { state = initialState; }
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
                action.albums.map(function (album) {
                    album.selected = false;
                });
            }
            return Object.assign({}, state, {
                isFetching: false,
                albums: action.albums
            });
        case actions_1.OPEN_BLINDS:
            state.albums.map(function (album) {
                for (var k in album) {
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
            state.albums.map(function (album) {
                album.selected = false;
            });
            return Object.assign({}, state, {
                blinds: {
                    active: false
                }
            });
        case actions_1.SCROLL_LOCK:
            return Object.assign({}, state, {
                action: action
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
var reducer = redux_1.combineReducers({
    all: all
});
var store = redux_1.createStore(reducer, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
exports.store = store;
function blinds() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(blinds_1.default, null)), document.getElementById('blinds'));
}
exports.blinds = blinds;
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
//# sourceMappingURL=index.js.map