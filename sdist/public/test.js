"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var Test = function (_a) {
    var userData = _a.userData;
    return (React.createElement("div", null,
        React.createElement("h1", null, "profile"),
        React.createElement("p", null, userData.profile.name),
        React.createElement("p", null, userData.profile.email),
        React.createElement("p", null, userData.profile.phone),
        React.createElement("p", null, userData.profile.permission),
        React.createElement("h1", null, "alarms"),
        React.createElement("h4", null, userData.alarms[0].title),
        React.createElement("p", null, userData.alarms[0].time),
        React.createElement("p", null, userData.alarms[0].user_uuid),
        React.createElement("p", null, userData.alarms[0].state),
        React.createElement("p", null, userData.alarms[0].repeat)));
};
var mapStateToProps = function (state) {
    return {
        userData: state.userData
    };
};
var TestApp = react_redux_1.connect(mapStateToProps)(Test);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map