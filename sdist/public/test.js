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
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var actions_alarm_1 = require("./actions-alarm");
var NewTest = /** @class */ (function (_super) {
    __extends(NewTest, _super);
    function NewTest(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    NewTest.prototype.handleChange = function (event) {
        this.setState({ value: event.target.value });
    };
    NewTest.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.props.postName(this.state.value);
    };
    NewTest.prototype.render = function () {
        return (React.createElement("div", { className: 'app-content' },
            React.createElement("div", { className: 'profile-wrapper full-width' },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("input", { type: 'text', className: 'big-form-item', value: this.state.value, onChange: this.handleChange }),
                    React.createElement("input", { type: "submit", value: "Submit", className: 'button dark-button' })),
                React.createElement("div", null,
                    React.createElement("h1", null, "profile"),
                    React.createElement("p", null, this.props.userData.profile.name),
                    React.createElement("p", null, this.props.userData.profile.email),
                    React.createElement("p", null, this.props.userData.profile.phone),
                    React.createElement("p", null, this.props.userData.profile.permission),
                    React.createElement("h1", null, "alarms"),
                    React.createElement("h4", null, this.props.userData.alarms[0].title),
                    React.createElement("p", null, this.props.userData.alarms[0].time),
                    React.createElement("p", null, this.props.userData.alarms[0].user_uuid),
                    React.createElement("p", null, this.props.userData.alarms[0].state),
                    React.createElement("p", null, this.props.userData.alarms[0].repeat)),
                React.createElement("form", { action: '/app/accounts/' + this.props.userData.profile.email + '/alarms', method: 'get' },
                    React.createElement("button", { type: 'submit', className: 'button dark-button' }, "alarms")),
                React.createElement("form", { action: '/app/accounts/' + this.props.userData.profile.email + '/orgs', method: 'get' },
                    React.createElement("button", { type: 'submit', className: 'button dark-button' }, "orgs")),
                React.createElement("form", { action: '/trans', method: 'get' },
                    React.createElement("button", { type: 'submit', className: 'button dark-button' }, "get test trans")),
                React.createElement("form", { action: '/trans', method: 'post' },
                    React.createElement("button", { type: 'submit', className: 'button dark-button' }, "post test trans")),
                React.createElement("form", { action: '/anythingatall', method: 'get' },
                    React.createElement("button", { type: 'submit', className: 'button dark-button' }, "get test")))));
    };
    return NewTest;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        userData: state.userData
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        postName: function (v) { return dispatch(actions_1.fetchNewName(v)); },
        postTime: function (v) { return dispatch(actions_alarm_1.fetchNewTime(v)); }
    };
};
var TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewTest);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map