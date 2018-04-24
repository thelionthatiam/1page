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
var toggle_1 = require("./little-components/toggle");
var AlarmList = /** @class */ (function (_super) {
    __extends(AlarmList, _super);
    function AlarmList(props) {
        return _super.call(this, props) || this;
    }
    AlarmList.prototype.render = function () {
        var _this = this;
        var alarms = this.props.alarms.map(function (alarm) {
            return React.createElement(Alarm, { alarm: alarm, key: alarm.id, postTime: _this.props.postTime, toggleActive: _this.props.toggleActive, postTitle: _this.props.postTitle });
        });
        return (React.createElement("div", null, alarms));
    };
    return AlarmList;
}(React.Component));
exports.AlarmList = AlarmList;
var Alarm = /** @class */ (function (_super) {
    __extends(Alarm, _super);
    function Alarm(props) {
        var _this = _super.call(this, props) || this;
        _this.testClick = _this.testClick.bind(_this);
        return _this;
    }
    Alarm.prototype.testClick = function () {
        console.log('test click completed', this.props.alarm.alarm_uuid);
    };
    Alarm.prototype.render = function () {
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
                    React.createElement("div", { className: 'form-row' },
                        React.createElement("p", { className: "small-text centered-text" }, this.props.alarm.nextAlarm),
                        React.createElement("p", { className: "small-text centered-text" }, "\u2022"),
                        React.createElement(TitleForm, { alarm_uuid: this.props.alarm.alarm_uuid, title: this.props.alarm.title, postTitle: this.props.postTitle })),
                    React.createElement("div", { className: 'alarm-time-row' },
                        React.createElement(TimeForm, { alarm_uuid: this.props.alarm.alarm_uuid, time: this.props.alarm.time, postTime: this.props.postTime }),
                        React.createElement("div", { className: 'toggle-down' },
                            React.createElement(toggle_1.default, { alarm: this.props.alarm, toggleActive: this.props.toggleActive }))))),
            React.createElement("div", { className: "alarm-row" },
                React.createElement("a", { href: '/app/accounts/{user_uuid}/settings' },
                    React.createElement("img", { className: 'icon fadeIn', src: '/icons/black/gear.svg' })),
                React.createElement("form", { action: "/app/accounts/{user_uuid}/alarms/{alarm_uuid}?_method=DELETE", method: "POST" },
                    React.createElement("input", { className: "icon", type: "image", width: "20px", height: "20px", src: "/icons/black/trash.svg" }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid })))));
    };
    return Alarm;
}(React.Component));
var TimeForm = /** @class */ (function (_super) {
    __extends(TimeForm, _super);
    function TimeForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.time,
            form: false
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        return _this;
    }
    TimeForm.prototype.componentDidMount = function () { document.addEventListener('mousedown', this.handleClickOutside); };
    TimeForm.prototype.componentWillUnmount = function () { document.removeEventListener('mousedown', this.handleClickOutside); };
    TimeForm.prototype.onBlur = function () {
        this.setState({
            form: !this.state.form,
            value: this.props.time
        });
    };
    TimeForm.prototype.setWrapperRef = function (node) { this.wrapperRef = node; };
    TimeForm.prototype.handleClickOutside = function (event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event);
            this.onBlur();
        }
    };
    TimeForm.prototype.handleChange = function (event) {
        if (event.target.value !== '') {
            this.setState({ value: event.target.value });
        }
    };
    TimeForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
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
                    React.createElement("input", { type: 'text', className: 'link-text-form alarm-time', value: this.state.value, onChange: this.handleChange }))));
    };
    return TimeForm;
}(React.Component));
var TitleForm = /** @class */ (function (_super) {
    __extends(TitleForm, _super);
    function TitleForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.title,
            form: false
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        return _this;
    }
    TitleForm.prototype.componentDidMount = function () {
        document.addEventListener('mousedown', this.handleClickOutside);
    };
    TitleForm.prototype.componentWillUnmount = function () { document.removeEventListener('mousedown', this.handleClickOutside); };
    TitleForm.prototype.onBlur = function () {
        this.setState({
            form: !this.state.form,
            value: this.props.title // changed
        });
    };
    TitleForm.prototype.setWrapperRef = function (node) { this.wrapperRef = node; };
    TitleForm.prototype.handleClickOutside = function (event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event);
            this.onBlur();
        }
    };
    TitleForm.prototype.handleChange = function (event) {
        // if (event.target.value !== '') {
        this.setState({ value: event.target.value });
        // }
    };
    TitleForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.props.postTitle({
            alarm_uuid: this.props.alarm_uuid,
            title: this.state.value
        }); // is this the only difference?    
    };
    TitleForm.prototype.render = function () {
        return (React.createElement("div", null, !this.state.form
            ?
                React.createElement("div", { onClick: this.onBlur },
                    React.createElement("p", { className: 'alarm-title small-text link-text' }, this.props.title ? this.props.title : 'add title')) //changed class and property
            :
                React.createElement("form", { ref: this.setWrapperRef, onSubmit: this.handleSubmit, onBlur: this.onBlur },
                    React.createElement("input", { type: 'text', className: 'link-text-form alarm-title small-text', value: this.state.value, onChange: this.handleChange }))));
    };
    return TitleForm;
}(React.Component));
//# sourceMappingURL=alarm-list.js.map