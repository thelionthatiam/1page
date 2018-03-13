"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_form_wrapper_1 = require("./test-form-wrapper");
var text_form_item_1 = require("./text-form-item");
var password_form_item_1 = require("./password-form-item");
var React = require("react");
var ReactDOM = require("react-dom");
ReactDOM.render(React.createElement(test_form_wrapper_1.default, null,
    React.createElement(text_form_item_1.default, { title: 'username', placeholder: 'type in your username' }),
    React.createElement(text_form_item_1.default, { title: 'email', placeholder: 'type in your email' }),
    React.createElement(password_form_item_1.default, { title: 'password', placeholder: 'type in your password' })), document.getElementById('root'));
// ReactDOM.render(
//   <PersonList />,
//   document.getElementById('branch')
// );
//# sourceMappingURL=index.js.map