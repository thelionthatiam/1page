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
var user_graph_1 = require("./components/user-graph");
var settings_1 = require("./components/settings");
var alarm_actions_1 = require("./containers/alarm-actions");
var organizations_1 = require("./components/organizations");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.props.permissionChecker();
    };
    App.prototype.render = function () {
        var _this = this;
        if (this.props.permission === 'guest') {
            return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement("div", { className: 'app-wrapper' },
                    react_1.default.createElement("ul", { className: "app-menu" },
                        react_1.default.createElement("div", { className: 'app-menu-title-wrapper' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' }),
                            react_1.default.createElement("h1", { className: 'app-menu-title' }, "s.y.l.")),
                        react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' }, this.props.permission),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/alarms", className: 'app-menu-text' }, "alarms")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/orgs", className: 'app-menu-text ' }, "organizations")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/graph-bar.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/insights", className: 'app-menu-text-disabled disabled-link' }, "insights")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/user-fem.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/profile", className: 'app-menu-text-disabled disabled-link' }, "profile")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/mixer.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/settings", className: 'app-menu-text-disabled disabled-link' }, "settings")),
                        react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/heart.svg' }),
                            react_1.default.createElement("form", { action: "/to-login", method: "get" },
                                react_1.default.createElement("button", { type: "submit", className: "app-menu-text" }, "log in"))),
                        react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/back-1.svg' }),
                            react_1.default.createElement("form", { action: "/log-out", method: "post" },
                                react_1.default.createElement("button", { type: "submit", className: "app-menu-text-disabled disabled-link" }, "logout")))),
                    react_1.default.createElement("div", { className: "app-content" },
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/', render: function () { return react_1.default.createElement(react_router_dom_1.Redirect, { to: '/app/alarms' }); } }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/alarms', component: alarm_actions_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/orgs', component: organizations_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/insights', component: user_graph_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/profile', component: settings_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/settings', component: settings_1.default })))));
        }
        else if (this.props.permission === 'user') {
            return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement("div", { className: 'app-wrapper' },
                    react_1.default.createElement("ul", { className: "app-menu" },
                        react_1.default.createElement("div", { className: 'app-menu-title-wrapper' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' }),
                            react_1.default.createElement("h1", { className: 'app-menu-title' }, "s.y.l.")),
                        react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' }, this.props.permission),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/alarms", className: 'app-menu-text' }, "alarms")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/orgs", className: 'app-menu-text ' }, "organizations")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/graph-bar.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/insights", className: 'app-menu-text' }, "insights")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/user-fem.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/profile", className: 'app-menu-text' }, "profile")),
                        react_1.default.createElement("li", { className: 'app-menu-li' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/mixer.svg' }),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/app/settings", className: 'app-menu-text' }, "settings")),
                        react_1.default.createElement("li", { className: 'app-menu-li', id: 'logout' },
                            react_1.default.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/back-1.svg' }),
                            react_1.default.createElement("form", { action: "/log-out", method: "post" },
                                react_1.default.createElement("button", { type: "submit", className: "app-menu-text" }, "logout")))),
                    react_1.default.createElement("div", { className: "app-content" },
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/', render: function () { return react_1.default.createElement(react_router_dom_1.Redirect, { to: '/app/accounts/' + _this.props.email + 'alarms' }); } }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.email + 'alarms', component: alarm_actions_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.email + 'orgs', component: organizations_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.email + 'insights', component: user_graph_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.email + 'profile', component: settings_1.default }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.email + 'settings', component: settings_1.default })))));
        }
        else {
            react_1.default.createElement("h1", null, "something broke");
        }
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=spa.js.map