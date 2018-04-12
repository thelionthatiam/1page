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
var form_item_1 = require("./components/form-item");
var form_wrapper_1 = require("./components/form-wrapper");
var React = require("react");
var ReactDOM = require("react-dom");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Login.prototype.render = function () {
        return (React.createElement("div", { className: 'login-wrapper' },
            React.createElement("div", { className: "flex column userWrapper" },
                React.createElement("h3", { className: "formTitle" }, "login"),
                React.createElement("p", null,
                    "hi ",
                    window.permission),
                React.createElement(form_wrapper_1.default, { buttonText: 'login', url: 'http://localhost:8000/api/authorized', noValidation: false, method: 'post' },
                    React.createElement(form_item_1.default, { title: 'email', placeholder: 'type in your email', imgSrc: '/icons/black/mail.svg' }),
                    React.createElement(form_item_1.default, { title: 'password', placeholder: 'type in your password', imgSrc: '/icons/black/key.svg', type: 'password', newPass: false })),
                React.createElement("div", { className: "flex column userWrapper" },
                    React.createElement("form", { action: "/forgot-password", method: "get" },
                        React.createElement("button", { className: "no", type: "submit" }, "forgot password"))))));
    };
    return Login;
}(React.Component));
exports.Login = Login;
function login() {
    return ReactDOM.render(React.createElement(Login, null), document.getElementById('login'));
}
exports.default = login;
// function login() {
//     console.log('login executed')
//     return ReactDOM.render(
//         <div className ="flex column userWrapper login">
//           <h3 className="formTitle">login</h3>
//           <FormWrapper
//             buttonText = 'login'
//             url = 'http://localhost:8000/api/authorized'
//             noValidation = {true}
//             method = 'post'
//             >
//             <FormItem
//               title = 'email'
//               placeholder = 'type in your email'
//               imgSrc = '/icons/mail.svg'
//               />
//             <FormItem
//               title = 'password'
//               placeholder = 'type in your password'
//               imgSrc = '/icons/key.svg'
//               type = 'password'
//               newPass = {false}
//               />
//           </FormWrapper>
//           <FormWrapper
//             buttonText = 'home'
//             url = 'http://localhost:8000/home-redirect'
//             noValidation = {true}
//             method = 'get'
//             />
//           <FormWrapper
//             buttonText = 'create new account'
//             url = 'http://localhost:8000/new-account'
//             noValidation = {true}
//             method = 'get'
//             />
//           <div className="flex column userWrapper">
//             <form action="/forgot-password" method="get">
//               <button className="no" type="submit">forgot password</button>
//             </form>
//             <form method='get' action='/splash'>
//               <button type='submit' className='no'>splash page</button>
//             </form>
//           </div>
//         </div>,
//       document.getElementById('login')
//     );
// }
// export default login; 
//# sourceMappingURL=login.js.map