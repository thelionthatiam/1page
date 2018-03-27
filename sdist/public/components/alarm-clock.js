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
        if (this.props.permission === 'user') {
            // this.props.alarmGetter();
        }
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
        return (react_1.default.createElement("div", { className: 'app-alarm-wrapper' },
            react_1.default.createElement(Clock, { time: this.state.date.toLocaleTimeString() }),
            react_1.default.createElement(AlarmForm, { formSubmit: this.handleSubmit, time: this.state.time, inputChange: this.handleChange }),
            react_1.default.createElement(Alarms, { savedTimes: this.state.savedTimes })));
    };
    return AlarmClock;
}(react_1.Component));
function Clock(props) {
    return (react_1.default.createElement("div", { className: 'clock' },
        react_1.default.createElement("h1", null, props.time)));
}
function AlarmForm(props) {
    return (react_1.default.createElement("div", { className: 'alarmForm' },
        react_1.default.createElement("h4", null, "create a new alarm"),
        react_1.default.createElement("form", { onSubmit: props.formSubmit },
            react_1.default.createElement("input", { type: 'time', time: props.time, onChange: props.inputChange }),
            react_1.default.createElement("button", null, "add"))));
}
var Alarms = /** @class */ (function (_super) {
    __extends(Alarms, _super);
    function Alarms(props) {
        var _this = _super.call(this, props) || this;
        _this.alarms = props.savedTimes;
        return _this;
    }
    Alarms.prototype.render = function () {
        return (react_1.default.createElement("div", { className: 'alarms' },
            react_1.default.createElement(SavedAlarmsTitle, { alarms: this.alarms }),
            react_1.default.createElement(SavedAlarms, { alarms: this.alarms })));
    };
    return Alarms;
}(react_1.Component));
function SavedAlarmsTitle(props) {
    var alarms = props.alarms;
    if (alarms.length < 1) {
        return react_1.default.createElement("p", null, "start adding alarms to see them here!");
    }
    else {
        return react_1.default.createElement("p", null, "saved alarms");
    }
}
function SavedAlarms(props) {
    var alarms = props.alarms;
    var savedAlarms = alarms.map(function (alarm) {
        return react_1.default.createElement("li", { key: alarm }, alarm);
    });
    return (react_1.default.createElement("ul", null, savedAlarms));
}
exports.default = AlarmClock;
//# sourceMappingURL=alarm-clock.js.map