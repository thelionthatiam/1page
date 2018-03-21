"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("./components/form-wrapper");
var form_item_1 = require("./components/form-item");
var React = require("react");
var ReactDOM = require("react-dom");
function login() {
    console.log('login executed');
    return ReactDOM.render(React.createElement("div", { className: "flex column userWrapper login" },
        React.createElement("h3", { className: "formTitle" }, "login"),
        React.createElement(form_wrapper_1.default, { buttonText: 'login', url: 'http://localhost:8000/api/authorized', noValidation: true, method: 'post' },
            React.createElement(form_item_1.default, { title: 'email', placeholder: 'type in your email', imgSrc: '/icons/mail.svg' }),
            React.createElement(form_item_1.default, { title: 'password', placeholder: 'type in your password', imgSrc: '/icons/key.svg', type: 'password', newPass: false })),
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