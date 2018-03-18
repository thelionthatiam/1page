"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("./form-wrapper");
var form_item_text_1 = require("./form-item-text");
var form_item_password_1 = require("./form-item-password");
var React = require("react");
var ReactDOM = require("react-dom");
function newAccount() {
    return ReactDOM.render(React.createElement("div", { className: "flex pageWrapper" },
        React.createElement("div", { className: "flex column userWrapper" },
            React.createElement("h3", { className: "formTitle" }, "user info"),
            React.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/accounts', method: 'post' },
                React.createElement(form_item_text_1.default, { title: 'name', placeholder: 'type in your username' }),
                React.createElement(form_item_text_1.default, { title: 'email', placeholder: 'type in your email' }),
                React.createElement(form_item_text_1.default, { title: 'phone', placeholder: 'type in your phone number' }),
                React.createElement(form_item_password_1.default, { title: 'password', placeholder: 'type in your password', newPass: true })))), document.getElementById('new-user'));
}
exports.default = newAccount;
//# sourceMappingURL=new-account-page.js.map