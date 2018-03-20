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
// import newAccount from './pages/new-account';
// import login from './pages/login'
//
// var allTags = document.body.getElementsByTagName('*');
// var ids = [];
//
// for (var tg = 0; tg< allTags.length; tg++) {
//     var tag = allTags[tg];
//     if (tag.id) {
//             ids.push(tag.id);
//      }
// }
// console.log(ids)
//
// for (let i = 0; i < ids.length; i++) {
//   console.log(ids[i])
//   if (ids[i] === 'new-user') {
//     newAccount();
//   } else if (ids[i] === 'login') {
//     login();
//   }
// }
var prop_types_1 = require("prop-types");
var React = require("react");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var react_redux_2 = require("react-redux");
var ReactDOM = require("react-dom");
// Based on: https://github.com/vaibhavmule/react-redux-helloworld/
// Actions
var HELLO_WORLD = 'HELLO_WORLD';
var helloAction = function () {
    console.log('helloWorld action');
    return {
        type: HELLO_WORLD
    };
};
// Components
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(HelloWorld, null));
    };
    return App;
}(React.Component));
var Hello = function (_a) {
    var onClick = _a.onClick, message = _a.message;
    return (React.createElement("div", null,
        React.createElement("h1", null, message),
        React.createElement("button", { onClick: onClick }, "Click")));
};
Hello.propTypes = {
    onClick: prop_types_1.default.func.isRequired,
    message: prop_types_1.default.string.isRequired
};
// Container
var mapStateToProps = function (state, ownProps) {
    return {
        message: state.helloWorld.message
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        onClick: function () {
            dispatch(helloAction());
        }
    };
};
var HelloWorld = react_redux_2.connect(mapStateToProps, mapDispatchToProps)(Hello);
// Reducers
var helloWorldReducer = function (state, action) {
    if (state === void 0) { state = { message: 'Hello' }; }
    switch (action.type) {
        case HELLO_WORLD:
            console.log('reducer: helloWorld');
            return Object.assign({}, state, { message: 'Hello, World!' });
        default:
            return state;
    }
};
var helloReducer = redux_1.combineReducers({
    helloWorld: helloWorldReducer
});
// Index
var store = redux_1.createStore(helloReducer);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App, null)), document.getElementById('login'));
//# sourceMappingURL=index.js.map