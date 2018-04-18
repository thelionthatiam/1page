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
            alarms: props.alarms,
            showControls: false
        };
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () {
            console.log('tick');
            return _this.tick();
        }, 1000);
    };
    Clock.prototype.componentWillMount = function () { };
    Clock.prototype.tick = function () {
        var _this = this;
        var now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        for (var i = 0; i < this.state.alarms.length; i++) {
            if (now === this.state.alarms[i]) {
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
        return (React.createElement("div", null,
            React.createElement("div", { className: 'clock' },
                React.createElement("h1", null, this.state.date.toLocaleTimeString('en-US', { hour12: false }))),
            React.createElement("pre", null, JSON.stringify(this.state.alarms, undefined, 2)),
            React.createElement("div", { className: 'clock' },
                React.createElement(AlarmController, { showControls: this.state.showControls }))));
    };
    return Clock;
}(React.Component));
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
var mapStateToProps = function (state) {
    // console.log('mapping for alarmlist', state)
    return {
        alarms: state.userData.alarms
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {};
};
exports.AlarmClock = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Clock);
//# sourceMappingURL=alarm-clock.js.map