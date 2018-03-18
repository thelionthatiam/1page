"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_wrapper_1 = require("../components/form-wrapper");
var form_item_1 = require("../components/form-item");
var React = require("react");
var ReactDOM = require("react-dom");
function newAccount() {
    return ReactDOM.render(React.createElement("div", { className: "flex pageWrapper" },
        React.createElement("div", { className: "flex column userWrapper" },
            React.createElement("h3", { className: "formTitle" }, "user info"),
            React.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/accounts', method: 'post' },
                React.createElement(form_item_1.default, { title: 'name', placeholder: 'type in your username', imgSrc: '/icons/user-fem.svgg.svuser-fememail', placeholder: 'type in your email', imgSrc: 's/mail.svg' }),
                React.createElement(form_item_1.default, { title: 'phone', placeholder: 'type in your phone number', imgSrc: '/iconss/phone.svg' }),
                React.createElement(form_item_1.default, { title: 'password', placeholder: 'type in your password', imgSrc: '/iconss/key.svg', type: 'password', newPass: true })),
            React.createElement(form_wrapper_1.default, null),
            ">/ 'login' method = 'get' url = 'http://localhost:8000/' noValidation = ",
            true,
            "/>")), document.getElementById('new-user'));
}
exports.default = newAccount;
//# sourceMappingURL=new-account.js.map