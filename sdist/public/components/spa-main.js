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
var spa_contact_1 = require("./spa-contact");
var spa_new_account_1 = require("./spa-new-account");
AppStates;
{
    permission: string;
    email ?  : string;
    uuid ?  : string;
}
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            permission: 'guest',
            email: '',
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        fetch("http://localhost:8000/permission", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (body) {
            console.log(JSON.parse(body));
            var userSession = JSON.parse(body);
            _this.setState({
                permission: userSession.permission,
                uuid: userSession.uuid,
                name: userSession.name,
                email: userSession.email
            });
        })
            .catch(function (error) {
            console.log(error.stack);
        });
    };
    App.prototype.render = function () {
        console.log('state', this.state);
        var isLoggedIn;
        var routes;
        if (this.state.permission === 'guest') {
            isLoggedIn = react_1.default.createElement("p", { className: 'app-menu-text' }, " Hi, guest ");
            routes = (react_1.default.createElement("div", { className: "app-content" },
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', render: function () { return react_1.default.createElement(react_router_dom_1.Redirect, { to: '/alarms' }); } }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/alarms', component: spa_new_account_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/stuff', component: spa_new_account_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/contact', component: spa_new_account_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/new-account', component: spa_new_account_1.default })));
        }
        else if (this.state.permission === 'user') {
            isLoggedIn = react_1.default.createElement("p", { className: 'app-menu-text' },
                " Welcome, ",
                this.state.email,
                "! ");
            routes = (react_1.default.createElement("div", { className: "app-content" },
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', render: function () { return react_1.default.createElement(react_router_dom_1.Redirect, { to: '/alarms' }); } }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/alarms', component: spa_contact_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/stuff', component: spa_contact_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/contact', component: spa_contact_1.default }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/new-account', component: spa_contact_1.default })));
        }
        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: 'app-wrapper' },
                react_1.default.createElement("ul", { className: "app-menu" },
                    react_1.default.createElement("div", { className: 'app-menu-title-wrapper' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' }),
                        react_1.default.createElement("h1", { className: 'app-menu-title' }, "s.y.l.")),
                    react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' }, isLoggedIn),
                    react_1.default.createElement("li", { className: 'app-menu-li' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/alarms", className: 'app-menu-text' }, "alarms")),
                    react_1.default.createElement("li", { className: 'app-menu-li' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/stuff", className: 'app-menu-text' }, "organizations")),
                    react_1.default.createElement("li", { className: 'app-menu-li' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/graph-bar.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/new-account", className: 'app-menu-text' }, "insights")),
                    react_1.default.createElement("li", { className: 'app-menu-li' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/user-fem.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/contact", className: 'app-menu-text' }, "profile")),
                    react_1.default.createElement("li", { className: 'app-menu-li' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/mixer.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/new-account", className: 'app-menu-text' }, "settings")),
                    react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' },
                        react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/back-1.svg' }),
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/new-account", className: 'app-menu-text' }, "logout"))),
                routes)));
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=spa-main.js.map