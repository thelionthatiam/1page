"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("../components/form-wrapper");
var React = require("react");
var ReactDOM = require("react-dom");
function login() {
    console.log('login executed');
    return ReactDOM.render(React.createElement("div", { className: 'flex column pageWrapper center' },
        React.createElement("div", { className: "flex column userWrapper" },
            React.createElement("h1", null, "Snooze you Lose"),
            React.createElement("p", { className: "noMarginsPadding" }, "or how sleeping in really hurts your bottom line")),
        React.createElement(form_wrapper_1.default, { buttonText: 'login', url: 'http://localhost:8000/authorized', noValidation: true, method: 'post' },
            React.createElement(TextForm, { title: 'email', placeholder: 'type in your email' }),
            React.createElement(PasswordForm, { title: 'password', placeholder: 'type in your password', newPass: false })),
        React.createElement(form_wrapper_1.default, { buttonText: 'home', url: 'http://localhost:8000/home-redirect', noValidation: true, method: 'get' }),
        React.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/new-account', noValidation: true, method: 'get' }),
        React.createElement("div", { className: "flex column userWrapper" },
            React.createElement("form", { action: "/forgot-password", method: "get" },
                React.createElement("button", { className: "no", type: "submit" }, "forgot password")),
            React.createElement("form", { method: 'get', action: '/splash' },
                React.createElement("button", { type: 'submit', className: 'no' }, "splash page")))), document.getElementById('login'));
}
exports.default = login;
//# sourceMappingURL=login.js.map