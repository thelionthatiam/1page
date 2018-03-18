"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("./form-wrapper");
var form_item_text_1 = require("./form-item-text");
var form_item_password_1 = require("./form-item-password");
var React = require("react");
var ReactDOM = require("react-dom");
function login() {
    return ReactDOM.render(React.createElement("div", { className: 'flex column pageWrapper center' },
        React.createElement("div", { className: "flex column userWrapper" },
            React.createElement("h1", null, "Snooze you Lose"),
            React.createElement("p", { className: "noMarginsPadding" }, "or how sleeping in really hurts your bottom line"),
            React.createElement(form_wrapper_1.default, { buttonText: 'login', url: 'http://localhost:8000/authorized', method: 'post' },
                React.createElement(form_item_text_1.default, { title: 'email', placeholder: 'type in your email' }),
                React.createElement(form_item_password_1.default, { title: 'password', placeholder: 'type in your password', newPass: false })),
            React.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/new-account', noValidation: true, method: 'get' }))), document.getElementById('login'));
}
exports.default = login;
//# sourceMappingURL=login-page.js.map