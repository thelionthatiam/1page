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
var React = require("react");
// import { fetchAlarms } from './actions'
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var alarm_clock_1 = require("./alarm-clock");
var test_1 = require("./test");
// import ProfileWithActions from "./containers/profile-actions";
// import GraphWrapper from "./components/user-graph";
// import SettingsWithActions from "./containers/settings-actions";
// import SpaNewAccount from "./new-account"
// import AlarmsWithActions from "./containers/alarm-actions";
// import OrgsWithActions from "./containers/organizations-actions";
// import AlarmClock from './components/alarm-clock';
// import Orgs from './components/guest-orgs'
var Spa = /** @class */ (function (_super) {
    __extends(Spa, _super);
    function Spa(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Spa.prototype.render = function () {
        var _this = this;
        if (this.props.userData.profile.permission === 'guest') {
            return (React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: 'app-wrapper' },
                    React.createElement("ul", { className: "app-menu" },
                        React.createElement("a", { href: '/' },
                            React.createElement("div", { className: 'app-menu-title-wrapper' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' }),
                                React.createElement("h1", { className: 'app-menu-title' }, "s.y.l."))),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' }),
                            React.createElement(react_router_dom_1.Link, { to: "/app/guest/alarms", className: 'app-menu-text' }, "alarms")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                            React.createElement(react_router_dom_1.Link, { to: "/app/guest/orgs", className: 'app-menu-text ' }, "organizations"))),
                    React.createElement("div", { className: "app-content" },
                        React.createElement(react_router_dom_1.Route, { path: '/app/guest', render: function () { return React.createElement(react_router_dom_1.Redirect, { to: '/app/guest/alarms' }); } }),
                        React.createElement(react_router_dom_1.Route, { path: '/app/guest/alarms', component: alarm_clock_1.AlarmClock })))));
        }
        else if (this.props.userData.profile.permission === 'user') {
            return (React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", { className: 'app-wrapper' },
                    React.createElement("ul", { className: "app-menu" },
                        React.createElement("a", { href: '/' },
                            React.createElement("div", { className: 'app-menu-title-wrapper' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' }),
                                React.createElement("h1", { className: 'app-menu-title' }, "s.y.l."))),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' }),
                            React.createElement(react_router_dom_1.Link, { to: "/app/accounts/" + this.props.userData.profile.email + "/alarms", className: 'app-menu-text' }, "alarms")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                            React.createElement(react_router_dom_1.Link, { to: "/app/accounts/" + this.props.userData.profile.email + "/orgs", className: 'app-menu-text ' }, "test")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' }),
                            React.createElement("a", { href: "/app/accounts/{{email}}/orgs", className: 'app-menu-text ' }, "organizations")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/user-fem.svg' }),
                            React.createElement("a", { href: "/app/accounts/{{email}}", className: 'app-menu-text' }, "profile")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/mixer.svg' }),
                            React.createElement("a", { href: "/app/accounts/{{email}}/settings", className: 'app-menu-text' }, "settings")),
                        React.createElement("li", { className: 'app-menu-li', id: 'logout' },
                            React.createElement("div", { className: "filler" }),
                            React.createElement("div", { className: "logout-wrapper" },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/back-1.svg' }),
                                React.createElement("form", { action: "/log-out", method: "post" },
                                    React.createElement("button", { type: "submit", className: "app-menu-text" }, "logout"))),
                            React.createElement("p", { className: 'app-menu-li' }, this.props.userData.profile.permission))),
                    React.createElement("ul", { className: "mob-app-menu" },
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("a", { href: '/' },
                                React.createElement("div", { className: 'app-menu-title-wrapper' },
                                    React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/logo-placeholder.svg' })))),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement(react_router_dom_1.Link, { to: "/app/accounts/" + this.props.userData.profile.email + "/alarms", className: 'app-menu-text' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/clock-alarm.svg' })),
                            React.createElement("p", { className: "mini-text gray-text" }, "alarm")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement(react_router_dom_1.Link, { to: "/app/accounts/" + this.props.userData.profile.email + "/orgs", className: 'app-menu-text ' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' })),
                            React.createElement("p", { className: "mini-text gray-text" }, "test")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("a", { href: "/app/accounts/{{email}}/orgs", className: 'app-menu-text ' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/squares.svg' })),
                            React.createElement("p", { className: "mini-text gray-text" }, "orgs")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("a", { href: "/app/accounts/{{email}}", className: 'app-menu-text' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/user-fem.svg' })),
                            React.createElement("p", { className: "mini-text gray-text" }, "profile")),
                        React.createElement("li", { className: 'app-menu-li' },
                            React.createElement("a", { href: "/app/accounts/{{email}}/settings", className: 'app-menu-text' },
                                React.createElement("img", { className: 'formIcon fadeIn', src: '/icons/white/mixer.svg' })),
                            React.createElement("p", { className: "mini-text gray-text" }, "settings")),
                        React.createElement("li", { className: 'app-menu-li', id: 'logout' },
                            React.createElement("div", { className: 'filler' }),
                            React.createElement("div", { className: 'logout-wrapper' },
                                React.createElement("form", { action: "/log-out", method: "post" },
                                    React.createElement("input", { type: 'image', name: "submit", className: 'formIcon fadeIn', src: '/icons/white/back-1.svg' }))),
                            React.createElement("p", { className: "mini-text gray-text" }, "logout"))),
                    React.createElement("div", { className: "app-content" },
                        React.createElement(react_router_dom_1.Route, { path: '/app/account', render: function () { return React.createElement(react_router_dom_1.Redirect, { to: '/app/accounts/' + _this.props.userData.profile.email + '/alarms' }); } }),
                        React.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.userData.profile.email + '/alarms', component: alarm_clock_1.AlarmClock }),
                        React.createElement(react_router_dom_1.Route, { path: '/app/accounts/' + this.props.userData.profile.email + '/orgs', component: test_1.TestApp })))));
        }
        else {
            React.createElement("h1", null, "something broke");
        }
    };
    return Spa;
}(React.Component));
var mapStateToProps = function (state) {
    // console.log('mapping for alarmlist', state)
    return {
        userData: state.userData
    };
};
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         updateAlarms: () => dispatch(fetchAlarms())
//     }
// }
var App = react_redux_1.connect(mapStateToProps)(Spa);
exports.default = App;
//# sourceMappingURL=app.js.map