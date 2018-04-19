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
var actions_1 = require("./actions");
var react_redux_1 = require("react-redux");
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            date: new Date(),
            time: '',
            showControls: false
        };
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () {
            _this.props.updateAlarms();
            return _this.tick();
        }, 1000);
    };
    Clock.prototype.componentWillMount = function () { };
    Clock.prototype.tick = function () {
        var _this = this;
        var now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        for (var i = 0; i < this.props.alarms.length; i++) {
            if (now === this.props.alarms[i]) {
                this.setState({
                    showControls: true
                }, function () { return console.log(_this.state); });
            }
        }
        this.setState({
            date: new Date()
        });
    };
    Clock.prototype.render = function () {
        var messages = this.props.alarms.map(function (alarm) {
            if (alarm.state === 'ringing') {
                return React.createElement(AlarmController, { alarm: alarm, key: alarm.id });
            }
        });
        return (React.createElement("div", null,
            React.createElement("div", { className: 'clock' },
                React.createElement("h1", null, this.state.date.toLocaleTimeString('en-US', { hour12: false }))),
            React.createElement("div", { className: 'alarm-controllers-wrapper' }, messages)));
    };
    return Clock;
}(React.Component));
var AlarmController = /** @class */ (function (_super) {
    __extends(AlarmController, _super);
    function AlarmController(props) {
        var _this = _super.call(this, props) || this;
        _this.style = 'alarm-control-wrapper';
        _this.alarm = _this.props.alarm;
        return _this;
    }
    AlarmController.prototype.render = function () {
        if (this.alarm.state === 'ringing') {
            this.style = 'alarm-control-wrapper';
        }
        var dismissRoute = "/app/accounts/" + this.alarm.user_uuid + "/alarms/" + this.alarm.alarm_uuid + "/dismiss";
        var snoozeRoute = "/app/accounts/" + this.alarm.user_uuid + "/alarms/" + this.alarm.alarm_uuid + "/snooze";
        return (React.createElement("div", { className: this.style },
            React.createElement("h1", null,
                this.alarm.state,
                "!!!"),
            React.createElement("p", null, this.alarm.title),
            React.createElement("p", null, this.alarm.time),
            React.createElement("div", { className: 'alarm-control-button-wrapper' },
                React.createElement("form", { action: dismissRoute, method: "POST" },
                    React.createElement("input", { className: "button light-button", type: 'submit', value: 'dismiss' }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.alarm.alarm_uuid })),
                React.createElement(MathProblem, { alarm: this.alarm }),
                React.createElement("form", { action: snoozeRoute, method: "POST" },
                    React.createElement("input", { className: "button light-button", type: 'submit', value: 'snooze' }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.alarm.alarm_uuid })))));
    };
    return AlarmController;
}(React.Component));
var MathProblem = /** @class */ (function (_super) {
    __extends(MathProblem, _super);
    function MathProblem(props) {
        var _this = _super.call(this, props) || this;
        _this.randomNumber = function () { return Math.floor((Math.random() * 20)); };
        _this.state = {
            value: '',
            answer: 0,
            showWakeButton: false,
            one: _this.randomNumber(),
            two: _this.randomNumber(),
            three: _this.randomNumber(),
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    MathProblem.prototype.handleChange = function (event) {
        this.setState({ value: event.target.value });
    };
    MathProblem.prototype.handleSubmit = function (event) {
        event.preventDefault();
        if (parseInt(this.state.value) === this.state.answer) {
            this.setState({
                showWakeButton: true
            });
        }
    };
    MathProblem.prototype.render = function () {
        this.state.answer = this.state.one + this.state.two + this.state.three;
        if (this.state.showWakeButton) {
            var wakeRoute = "/app/accounts/" + this.props.alarm.user_uuid + "/alarms/" + this.props.alarm.alarm_uuid + "/wake";
            return (React.createElement("form", { action: wakeRoute, method: "POST" },
                React.createElement("input", { className: "button light-button", type: 'submit', value: 'wake' }),
                React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid })));
        }
        return (React.createElement("div", null,
            React.createElement("p", null, "find the sum"),
            React.createElement("p", null,
                this.state.one,
                " + ",
                this.state.two,
                " + ",
                this.state.three,
                " ="),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: 'text', className: 'big-form-item', value: this.state.value, onChange: this.handleChange }),
                React.createElement("input", { type: "submit", value: "Submit", className: 'button dark-button' }))));
    };
    return MathProblem;
}(React.Component));
var mapStateToProps = function (state) {
    // console.log('mapping for alarmlist', state)
    return {
        alarms: state.userData.alarms
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        updateAlarms: function () { return dispatch(actions_1.fetchAlarms()); }
    };
};
exports.AlarmClock = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Clock);
//# sourceMappingURL=alarm-clock.js.map