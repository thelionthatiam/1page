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
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Home.prototype.componentDidMount = function () {
        fetch('http://localhost:8000/permission', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (body) { return console.log(body); })
            .catch(function (error) {
            console.log(error.stack);
        });
    };
    Home.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: 'home-img-wrapper' },
                react_1.default.createElement("div", { className: 'home-navigation-bar' },
                    react_1.default.createElement("div", { className: 'home-title-wrapper' },
                        react_1.default.createElement("div", { className: 'home-logo-wrapper' },
                            react_1.default.createElement("img", { className: 'home-icon fadeIn', src: '/icons/logo-placeholder.svg' })),
                        react_1.default.createElement("div", { className: 'home-title-text-wrapper' },
                            react_1.default.createElement("h1", { className: 'home-title' }, "snooze you lose"),
                            react_1.default.createElement("h4", { className: 'home-subtitle' }, "Or how sleeping in can hurt your bottom line."))),
                    react_1.default.createElement("div", { className: 'home-navigation-wrapper' },
                        react_1.default.createElement("ul", { className: 'home-navigation-list' },
                            react_1.default.createElement("a", { href: '#features-section' },
                                react_1.default.createElement("li", { className: 'home-navigation-item' }, "features")),
                            react_1.default.createElement("a", { href: '#about-section' },
                                react_1.default.createElement("li", { className: 'home-navigation-item' }, "about")),
                            react_1.default.createElement("a", { href: '/dummy-route' },
                                react_1.default.createElement("li", { className: 'home-navigation-item' }, "pricing")),
                            react_1.default.createElement("a", { href: '/to-login' },
                                react_1.default.createElement("li", { className: 'home-navigation-item' }, "log in")),
                            react_1.default.createElement("li", { className: 'home-navigation-item' },
                                react_1.default.createElement("a", { href: '/new-account' },
                                    react_1.default.createElement("button", { className: 'home-create-account' }, "create account")))))),
                react_1.default.createElement("div", { className: 'home-tryit-wrapper' },
                    react_1.default.createElement("a", { href: '/app' },
                        react_1.default.createElement("button", { className: 'home-try' }, "try it")),
                    react_1.default.createElement("img", { className: 'icon', src: '/icons/white/forward-1.svg' }))),
            react_1.default.createElement("div", { className: 'home-try-alarm-wrapper', id: 'features-section' },
                react_1.default.createElement("h1", null, "Add Alarm trial")),
            react_1.default.createElement("div", { className: 'home-about-wrapper', id: 'about-section' },
                react_1.default.createElement("h1", null, "About section"),
                react_1.default.createElement("div", { className: 'home-about-wrapper-center' },
                    react_1.default.createElement("div", { className: 'home-about-wrapper-square' }),
                    react_1.default.createElement("div", { className: 'home-about-wrapper-square' }),
                    react_1.default.createElement("div", { className: 'home-about-wrapper-square' }),
                    react_1.default.createElement("div", { className: 'home-about-wrapper-square' }))),
            react_1.default.createElement("div", { className: 'home-footer-wrapper' },
                react_1.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam"),
                react_1.default.createElement("div", { className: 'home-footer-icon-wrapper' },
                    react_1.default.createElement("img", { className: 'icon', src: '/icons/white/forward-1.svg' }),
                    react_1.default.createElement("img", { className: 'icon', src: '/icons/white/forward-1.svg' }),
                    react_1.default.createElement("img", { className: 'icon', src: '/icons/white/forward-1.svg' }),
                    react_1.default.createElement("img", { className: 'icon', src: '/icons/white/forward-1.svg' })))));
    };
    return Home;
}(react_1.Component));
function home() {
    return react_dom_1.default.render(react_1.default.createElement(Home, null), document.getElementById('home'));
}
exports.default = home;
//# sourceMappingURL=home.js.map