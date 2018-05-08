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
var SimpleClock = /** @class */ (function (_super) {
    __extends(SimpleClock, _super);
    function SimpleClock(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            date: new Date(),
            time: '',
            savedTimes: props.alarms,
            showControls: true
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    SimpleClock.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () { return _this.tick(); }, 1000);
    };
    SimpleClock.prototype.componentWillMount = function () {
        clearInterval(this.timerID);
    };
    SimpleClock.prototype.tick = function () {
        var _this = this;
        var now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        // console.log(now)
        for (var i = 0; i < this.state.savedTimes.length; i++) {
            //    console.log(now, this.state.savedTimes[i])
            if (now === this.state.savedTimes[i]) {
                this.setState({
                    showControls: true
                }, function () { return console.log(_this.state); });
            }
        }
        this.setState({
            date: new Date()
        }, function () {
            // console.log(this.state.date.toLocaleTimeString('en-US', { hour12: false }), this.state.savedTimes)
        });
    };
    SimpleClock.prototype.handleChange = function (event) {
        this.setState({
            time: event.target.value
        });
    };
    SimpleClock.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'clock' },
                React.createElement("h1", null, this.state.date.toLocaleTimeString('en-US', { hour12: false }))),
            React.createElement("div", { className: 'clock' },
                React.createElement(AlarmController, { showControls: this.state.showControls }))));
    };
    return SimpleClock;
}(React.Component));
exports.SimpleClock = SimpleClock;
var AlarmController = /** @class */ (function (_super) {
    __extends(AlarmController, _super);
    function AlarmController(props) {
        var _this = _super.call(this, props) || this;
        _this.style;
        return _this;
    }
    AlarmController.prototype.render = function () {
        if (this.props.showControls) {
            this.style = 'alarm-control-wrapper';
        }
        else {
            this.style = 'alarm-control-wrapper none';
        }
        return (React.createElement("div", { className: this.style },
            React.createElement("h1", null, "state"),
            React.createElement("p", null, "title"),
            React.createElement("button", { className: 'button dark-button' }, "wake"),
            React.createElement("button", { className: 'button dark-button' }, "snooze"),
            React.createElement("button", { className: 'button dark-button' }, "dismiss")));
    };
    return AlarmController;
}(React.Component));
var AlarmList = function (_a) {
    var alarms = _a.alarms;
    // console.log('this is for the alarm:', alarms)
    function alarmTimesToArr() {
        var arr = [];
        for (var i = 0; i < alarms.length; i++) {
            arr.push(alarms[i].time);
        }
        // console.log(arr)
        return arr;
    }
    return (React.createElement("div", null,
        React.createElement("ul", null, alarms.map(function (alarm) { return React.createElement("li", { key: alarm.id }, alarm.time); }))));
};
//# sourceMappingURL=simple-clock.js.map