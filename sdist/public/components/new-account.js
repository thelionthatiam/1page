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
var form_wrapper_1 = require("./form-wrapper");
var form_item_1 = require("./form-item");
var react_1 = require("react");
var SpaNewAccount = /** @class */ (function (_super) {
    __extends(SpaNewAccount, _super);
    function SpaNewAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpaNewAccount.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "flex column userWrapper" },
            react_1.default.createElement("h3", { className: "formTitle" }, "create account"),
            react_1.default.createElement(form_wrapper_1.default, { buttonText: 'create new account', url: 'http://localhost:8000/accounts', method: 'post' },
                react_1.default.createElement(form_item_1.default, { title: 'name', placeholder: 'type in your username', imgSrc: '/icons/black/user-fem.svg' }),
                react_1.default.createElement(form_item_1.default, { title: 'email', placeholder: 'type in your email', imgSrc: '/icons/black/mail.svg' }),
                react_1.default.createElement(form_item_1.default, { title: 'phone', placeholder: 'type in your phone number', imgSrc: '/icons/black/phone.svg' }),
                react_1.default.createElement(form_item_1.default, { title: 'password', placeholder: 'type in your password', imgSrc: '/icons/black/key.svg', type: 'password', newPass: true })),
            react_1.default.createElement(form_wrapper_1.default, { buttonText: 'login', method: 'get', url: 'http://localhost:8000/', noValidation: true })));
    };
    return SpaNewAccount;
}(react_1.Component));
exports.default = SpaNewAccount;
//# sourceMappingURL=new-account.js.map