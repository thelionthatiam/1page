"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spa_main_1 = require("./components/spa-main");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var permissions_1 = require("./reducers/permissions");
var React = require("react");
var ReactDOM = require("react-dom");
var store = redux_1.createStore(permissions_1.default);
function app() {
    return ReactDOM.render(React.createElement(react_redux_1.Provider, null,
        React.createElement(spa_main_1.default, null)), document.getElementById('app'));
}
exports.default = app;
//# sourceMappingURL=app.js.map