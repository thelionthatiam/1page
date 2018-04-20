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
                    React.createElement("div", { className: 'alarm-time-row' },
                        React.createElement(TimeForm, { alarm_uuid: this.props.alarm.alarm_uuid, time: this.props.alarm.time, postTime: this.props.postTime }),
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
            value: '',
            form: false
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        return _this;
    }
    TimeForm.prototype.componentDidMount = function () {
        document.addEventListener('mousedown', this.handleClickOutside);
    };
    TimeForm.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };
    TimeForm.prototype.onBlur = function () {
        this.setState({
            form: !this.state.form
        });
    };
    TimeForm.prototype.setWrapperRef = function (node) {
        this.wrapperRef = node;
    };
    TimeForm.prototype.handleClickOutside = function (event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event);
            this.onBlur();
        }
    };
    TimeForm.prototype.handleChange = function (event) {
        this.setState({ value: event.target.value });
    };
    TimeForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        console.log(this.state.value);
        if (this.state.value !== '') {
            this.props.postTime({
                alarm_uuid: this.props.alarm_uuid,
                time: this.state.value
            }); // is this the only difference?    
        }
    };
    TimeForm.prototype.render = function () {
        return (React.createElement("div", null, !this.state.form
            ?
                React.createElement("div", { onClick: this.onBlur },
                    React.createElement("p", { className: 'alarm-time link-text' }, this.props.time))
            :
                React.createElement("form", { ref: this.setWrapperRef, onSubmit: this.handleSubmit, onBlur: this.onBlur },
                    React.createElement("input", { type: 'text', className: 'link-text-form alarm-time', value: this.state.value, onChange: this.handleChange, placeholder: this.props.time }))));
    };
    return TimeForm;
}(React.Component));
//# sourceMappingURL=alarm-list.js.map