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
// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
// import appReducers from './reducers/app-reducers';
var test_1 = require("./test");
var alarm_clock_1 = require("./alarm-clock");
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
var user_data_1 = require("./actions/user-data");
exports.populate = user_data_1.populate;
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
            // You can render any custom fallback UI
            return React.createElement("h1", null, "Something went wrong.");
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
var initialState = { userData: 'foo' };
// runs multiple times for checking purposes
// store calls the reducer which updates the state based on the actions
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_data_1.POPULATE:
            return Object.assign({}, state, { userData: action.userData });
        default:
            return state;
    }
}
var store = redux_1.createStore(reducer, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
exports.store = store;
function app() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(test_1.TestApp, null)), document.getElementById('test'));
}
exports.app = app;
function alarmClock() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(alarm_clock_1.AlarmClock, null)), document.getElementById('alarm'));
}
exports.alarmClock = alarmClock;
// const preloadedState = window.__PRELOADED_STATE__
//  
// // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__
//  
// // Create Redux store with initial state
//  
// // ReactDOM.render(
// //   <Provider store={store}>
// //     <TestApp />
// //   </Provider>,
// //   document.getElementById('app')
// // )
// const Thing = <Provider store = {store}><TestApp/></Provider>
// ReactDOM.hydrate(
//   <Provider store={store}>
//     <TestApp />
//   </Provider>,
//   document.getElementById('app')
// )
// var allTags = document.body.getElementsByTagName('*');
// var ids = [];
// for (var tg = 0; tg< allTags.length; tg++) {
//   var tag = allTags[tg];
//   if (tag.id) {
//           ids.push(tag.id);
//     }
// }
// for (let i = 0; i < ids.length; i++) {
//   if (ids[i] === 'new-user') {
//     newAccount();
//   } else if (ids[i] === 'login') {
//     login();
//   } else if (ids[i] === 'app') {
//     app();
//   } else if (ids[i] === 'home') {
//     home();
//   } else if (ids[i] === 'root') {
//     console.log('index working')
//   }
// }
// export function render( Component, props, elID ) {
//   ReactDOM.render(
//       React.createElement(Component, props, null),
//       document.getElementById(elID)
//   ); 
// } 
//# sourceMappingURL=index.js.map