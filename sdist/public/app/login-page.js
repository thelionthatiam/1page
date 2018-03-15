"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("./form-wrapper");
var React = require("react");
var ReactDOM = require("react-dom");
function login() {
    return ReactDOM.render(React.createElement("div", null,
        React.createElement(form_wrapper_1.default, { buttonText: 'login', url: 'http://localhost:8000/' }),
        React.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/new-account' })), document.getElementById('login'));
}
exports.default = login;
//# sourceMappingURL=login-page.js.map