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
var AlarmList = /** @class */ (function (_super) {
    __extends(AlarmList, _super);
    function AlarmList(props) {
        return _super.call(this, props) || this;
    }
    AlarmList.prototype.render = function () {
        var _this = this;
        var alarms = this.props.alarms.map(function (alarm) {
            return React.createElement(Alarm, { alarm: alarm, key: alarm.id, postTime: _this.props.postTime });
        });
        return (React.createElement("div", null,
            React.createElement("h1", null, alarms)));
    };
    return AlarmList;
}(React.Component));
exports.AlarmList = AlarmList;
var Alarm = /** @class */ (function (_super) {
    __extends(Alarm, _super);
    function Alarm(props) {
        return _super.call(this, props) || this;
    }
    Alarm.prototype.render = function () {
        var titleAction = "/app/accounts/" + this.props.alarm.user_uuid + "/alarms/" + this.props.alarm.alarm_uuid + "/title";
        var timeAction = "/app/accounts/" + this.props.alarm.time + "/alarms/" + this.props.alarm.alarm_uuid + "/title";
        var activeButton;
        if (this.props.alarm.active) {
            activeButton = React.createElement("button", { type: 'submit', className: "button dark-button" }, "disable");
        }
        else {
            activeButton = React.createElement("button", { type: 'submit', className: "button light-button" }, "enable");
        }
        return (React.createElement("div", { className: "column contentWrapper" },
            React.createElement("div", { className: "alarm-row" },
                React.createElement("div", { className: 'time-wrapper' },
                    React.createElement("form", { className: 'form-row', action: titleAction, method: 'get' },
                        React.createElement("input", { type: 'submit', className: "alarm-title small-text link-text", value: this.props.alarm.title }),
                        React.createElement("p", { className: "small-text centered-text" }, "\u2022"),
                        React.createElement("p", { className: "small-text centered-text" }, "tomorrow"),
                        React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid }),
                        React.createElement("input", { name: "title", type: 'hidden', value: this.props.alarm.title })),
                    React.createElement(TimeForm, { alarm_uuid: this.props.alarm.alarm_uuid, postTime: this.props.postTime }),
                    React.createElement("div", { className: 'alarm-time-row' },
                        React.createElement("form", { action: timeAction, method: 'get' },
                            React.createElement("input", { type: 'submit', className: "alarm-time link-text", value: this.props.alarm.time }),
                            React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid }),
                            React.createElement("input", { name: "time", type: 'hidden', value: this.props.alarm.time })),
                        React.createElement("form", { action: '/app/accounts/{user_uuid}/alarms/{alarm_uuid}/active?_method=PUT', method: 'POST' },
                            activeButton,
                            React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid }),
                            React.createElement("input", { name: "active", type: 'hidden', value: this.props.alarm.active }))))),
            React.createElement("div", { className: "alarm-row" },
                React.createElement("a", { href: '/app/accounts/{user_uuid}/settings' },
                    React.createElement("img", { className: 'icon fadeIn', src: '/icons/black/gear.svg' })),
                React.createElement("form", { action: "/app/accounts/{user_uuid}/alarms/{alarm_uuid}?_method=DELETE", method: "POST" },
                    React.createElement("input", { className: "icon", type: "image", width: "20px", height: "20px", src: "/icons/black/x.svg" }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid })))));
    };
    return Alarm;
}(React.Component));
var TimeForm = /** @class */ (function (_super) {
    __extends(TimeForm, _super);
    function TimeForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    TimeForm.prototype.handleChange = function (event) {
        this.setState({ value: event.target.value });
    };
    TimeForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        console.log('handlesubmit function', this.props.postTime);
        console.log(this.props.postTime);
        this.props.postTime({
            alarm_uuid: this.props.alarm_uuid,
            time: this.state.value
        }); // is this the only difference?
    };
    TimeForm.prototype.render = function () {
        console.log('render of time form', this.props);
        return (React.createElement("div", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: 'text', className: 'big-form-item', value: this.state.value, onChange: this.handleChange }),
                React.createElement("input", { type: "submit", value: "submit new time", className: 'button dark-button' }))));
    };
    return TimeForm;
}(React.Component));
// const mapStateToProps = state => {
//     return {
//         userData: state.userData
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         postTime: (v) => dispatch(fetchNewTime(v))
//     }
// }
// const TimeFormCont = connect(
//     // mapStateToProps,
//     mapDispatchToProps
// )(TimeForm)
//# sourceMappingURL=alarm-list.js.map