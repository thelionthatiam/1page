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
var AlarmClock = /** @class */ (function (_super) {
    __extends(AlarmClock, _super);
    function AlarmClock(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            date: new Date(),
            time: '',
            savedTimes: []
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AlarmClock.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () { return _this.tick(); }, 1000);
    };
    AlarmClock.prototype.componentWillMount = function () {
        clearInterval(this.timerID);
    };
    AlarmClock.prototype.tick = function () {
        var now = this.state.date.toTimeString().split(' ')[0];
        var times = this.state.savedTimes;
        for (var i = 0; i < times.length; i++) {
            var alarm = times[i] + ':00';
            if (now === alarm) {
                alert('your alarm at ' + alarm + ' just happend. go do something about it!');
            }
        }
        this.setState({
            date: new Date()
        });
    };
    AlarmClock.prototype.handleSubmit = function (event) {
        var currentTimes = this.state.savedTimes;
        currentTimes.push(this.state.time);
        this.setState({
            savedTime: currentTimes
        });
        event.preventDefault();
    };
    AlarmClock.prototype.handleChange = function (event) {
        this.setState({
            time: event.target.value
        });
    };
    AlarmClock.prototype.render = function () {
        return (React.createElement("div", { className: 'app-alarm-wrapper' },
            React.createElement(Clock, { time: this.state.date.toLocaleTimeString() }),
            React.createElement(AlarmForm, { formSubmit: this.handleSubmit, time: this.state.time, inputChange: this.handleChange }),
            React.createElement(Alarms, { savedTimes: this.state.savedTimes })));
    };
    return AlarmClock;
}(React.Component));
exports.default = AlarmClock;
function Clock(props) {
    return (React.createElement("div", { className: 'clock' },
        React.createElement("h1", null, props.time)));
}
function AlarmForm(props) {
    return (React.createElement("div", { className: 'alarmForm' },
        React.createElement("h4", null, "create a new alarm"),
        React.createElement("form", { onSubmit: props.formSubmit },
            React.createElement("input", { type: 'time', time: props.time, onChange: props.inputChange }),
            React.createElement("button", null, "add"))));
}
var Alarms = /** @class */ (function (_super) {
    __extends(Alarms, _super);
    function Alarms(props) {
        var _this = _super.call(this, props) || this;
        _this.alarms = props.savedTimes;
        return _this;
    }
    Alarms.prototype.render = function () {
        return (React.createElement("div", { className: 'alarms' },
            React.createElement(SavedAlarmsTitle, { alarms: this.alarms }),
            React.createElement(SavedAlarms, { alarms: this.alarms })));
    };
    return Alarms;
}(React.Component));
function SavedAlarmsTitle(props) {
    var alarms = props.alarms;
    if (alarms.length < 1) {
        return React.createElement("p", null, "start adding alarms to see them here!");
    }
    else {
        return React.createElement("p", null, "saved alarms");
    }
}
function SavedAlarms(props) {
    var alarms = props.alarms;
    var savedAlarms = alarms.map(function (alarm) {
        return React.createElement("li", { key: alarm }, alarm);
    });
    return (React.createElement("ul", null, savedAlarms));
}
//# sourceMappingURL=old-alarm-clock.js.map