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
        return (React.createElement("div", null,
            React.createElement("div", { className: "login-img-wrapper" },
                React.createElement("div", { className: "home-navigation-bar" },
                    React.createElement("div", { className: "home-title-wrapper" },
                        React.createElement("div", { className: "home-logo-wrapper" },
                            React.createElement("img", { className: "home-icon fadeIn", src: "/icons/logo-placeholder.svg" })),
                        React.createElement("div", { className: "home-title-text-wrapper" },
                            React.createElement("h1", { className: "home-title" }, "snooze you lose"),
                            React.createElement("h4", { className: "home-subtitle" }, "Or how sleeping in can hurt your bottom line."))),
                    React.createElement("div", { className: "home-navigation-wrapper" },
                        React.createElement("ul", { className: "home-navigation-list" },
                            React.createElement("a", { href: "#features-section" },
                                React.createElement("li", { className: "home-navigation-item" }, "features")),
                            React.createElement("a", { href: "#about-section" },
                                React.createElement("li", { className: "home-navigation-item" }, "about")),
                            React.createElement("a", { href: "/dummy-route" },
                                React.createElement("li", { className: "home-navigation-item" }, "pricing")),
                            React.createElement("a", { href: "/to-login" },
                                React.createElement("li", { className: "home-navigation-item" }, "log in")),
                            React.createElement("li", { className: "home-navigation-item" },
                                React.createElement("a", { href: "/new-account" },
                                    React.createElement("button", { className: "home-create-account" }, "create account")))))),
                React.createElement("div", { className: 'login-wrapper' },
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
                                React.createElement("button", { className: "no", type: "submit" }, "forgot password"))))),
                React.createElement("div", { className: "home-tryit-wrapper" },
                    React.createElement("a", { href: "/app" },
                        React.createElement("button", { className: "home-try" }, "try it")),
                    React.createElement("img", { className: "icon", src: "/icons/white/forward-1.svg" }))),
            React.createElement("div", { className: "home-try-alarm-wrapper", id: "features-section" },
                React.createElement("h1", null, "Add Alarm trial")),
            React.createElement("div", { className: "home-about-wrapper", id: "about-section" },
                React.createElement("h1", null, "About section"),
                React.createElement("div", { className: "home-about-wrapper-center" },
                    React.createElement("div", { className: "home-about-wrapper-square" }),
                    React.createElement("div", { className: "home-about-wrapper-square" }),
                    React.createElement("div", { className: "home-about-wrapper-square" }),
                    React.createElement("div", { className: "home-about-wrapper-square" }))),
            React.createElement("div", { className: "home-footer-wrapper" },
                React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam"),
                React.createElement("div", { className: "home-footer-icon-wrapper" },
                    React.createElement("img", { className: "icon", src: "/icons/white/forward-1.svg" }),
                    React.createElement("img", { className: "icon", src: "/icons/white/forward-1.svg" }),
                    React.createElement("img", { className: "icon", src: "/icons/white/forward-1.svg" }),
                    React.createElement("img", { className: "icon", src: "/icons/white/forward-1.svg" })))));
    };
    return Login;
}(React.Component));
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