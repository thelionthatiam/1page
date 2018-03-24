"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_actions_1 = require("./containers/app-actions");
var redux_thunk_1 = require("redux-thunk");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var app_reducers_1 = require("./reducers/app-reducers");
var React = require("react");
var ReactDOM = require("react-dom");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var store = redux_1.createStore(app_reducers_1.default, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
function app() {
    return ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(app_actions_1.default, null)), document.getElementById('app'));
}
exports.default = app;
//# sourceMappingURL=app.js.map