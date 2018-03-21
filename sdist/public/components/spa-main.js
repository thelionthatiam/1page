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
var react_router_dom_1 = require("react-router-dom");
var spa_home_1 = require("./spa-home");
var spa_stuff_1 = require("./spa-stuff");
var spa_contact_1 = require("./spa-contact");
var spa_new_account_1 = require("./spa-new-account");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Main.prototype.render = function () {
        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: 'app-wrapper' },
                react_1.default.createElement("ul", { className: "app-menu" },
                    react_1.default.createElement("h1", { className: 'app-menu-title' }, "Simple SPA"),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { exact: true, to: "/", className: 'app-menu-item' }, "Home")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/stuff", className: 'app-menu-item' }, "Stuff")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/contact", className: 'app-menu-item' }, "Contact")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/new-account", className: 'app-menu-item' }, "New Accout"))),
                react_1.default.createElement("div", { className: "app-content" },
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: spa_home_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/stuff', component: spa_stuff_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/contact', component: spa_contact_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/new-account', component: spa_new_account_1.default })))));
    };
    return Main;
}(react_1.Component));
exports.default = Main;
//# sourceMappingURL=spa-main.js.map