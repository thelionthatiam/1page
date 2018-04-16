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
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            date: new Date(),
            time: '',
            savedTimes: props.alarms
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () { return _this.tick(); }, 1000);
    };
    Clock.prototype.componentWillMount = function () {
        clearInterval(this.timerID);
    };
    Clock.prototype.tick = function () {
        var now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        // console.log(now)
        for (var i = 0; i < this.state.savedTimes.length; i++) {
            //    console.log(now, this.state.savedTimes[i])
            if (now === this.state.savedTimes[i]) {
                alert('your alarm at ' + this.state.savedTimes[i] + ' just happend. go do something about it!');
            }
        }
        this.setState({
            date: new Date()
        }, function () {
            // console.log(this.state.date.toLocaleTimeString('en-US', { hour12: false }), this.state.savedTimes)
        });
    };
    Clock.prototype.handleChange = function (event) {
        this.setState({
            time: event.target.value
        });
    };
    Clock.prototype.render = function () {
        return (React.createElement("div", { className: 'clock' },
            React.createElement("h1", null, this.state.date.toLocaleTimeString('en-US', { hour12: false }))));
    };
    return Clock;
}(React.Component));
exports.AlarmList = function (_a) {
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
        React.createElement(Clock, { alarms: alarmTimesToArr() }),
        React.createElement("ul", null, alarms.map(function (alarm) { return React.createElement("li", { key: alarm.id }, alarm.time); }))));
};
var mapStateToProps = function (state) {
    // console.log('mapping for alarmlist', state)
    return {
        alarms: state.userData.alarms
    };
};
exports.AlarmClock = react_redux_1.connect(mapStateToProps)(exports.AlarmList);
//# sourceMappingURL=alarm-clock.js.map