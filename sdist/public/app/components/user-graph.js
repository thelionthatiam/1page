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
var mockMonth = [
    {
        snooze: 1,
        wake: true
    },
    {
        snooze: 4,
        wake: false
    },
    {
        snooze: 0,
        wake: false
    },
    {
        snooze: 2,
        wake: false
    },
    {
        snooze: 1,
        wake: true
    },
    {
        snooze: 0,
        wake: false
    },
    {
        snooze: 5,
        wake: false
    },
    {
        snooze: 1,
        wake: false
    },
    {
        snooze: 1,
        wake: true
    },
    {
        snooze: 0,
        wake: true
    },
    {
        snooze: 0,
        wake: true
    },
    {
        snooze: 0,
        wake: true
    },
];
var GraphWrapper = /** @class */ (function (_super) {
    __extends(GraphWrapper, _super);
    function GraphWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.scale = function () {
            var scale = {
                fifth: _this.state.max,
                fourth: _this.state.max * (4 / 5),
                third: (_this.state.max / 2),
                second: _this.state.max * (2 / 5),
                first: 0
            };
            return scale;
        };
        _this.state = {
            max: 0,
            snoozeSubTotal: 0,
            dismissSubTotal: 0,
            wakeSubTotal: 0,
            snoozeProportion: 0,
            dismissProportion: 0,
            wakeProportion: 0,
            topic: 'payments',
            xAxis: 'totals',
            yTitle: 'COST',
            xTitle: 'ACTION'
        };
        _this.monthData = mockMonth;
        _this.snoozes = parseInt(props.snoozes);
        _this.dismisses = parseInt(props.dismisses);
        _this.wakes = parseInt(props.wakes);
        _this.snoozePrice = parseFloat(props.snoozePrice);
        _this.dismissPrice = parseFloat(props.dismissPrice);
        _this.wakePrice = parseFloat(props.wakePrice);
        _this.subTotalArr = [_this.state.snoozeSubTotal, _this.state.dismissSubTotal, _this.state.wakeSubTotal];
        _this.activitiesArr = [_this.snoozes, _this.dismisses, _this.wakes];
        _this.monthMax = _this.setxAxis();
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    GraphWrapper.prototype.setProportions = function () {
        if (this.state.topic === 'activities') {
            var activitiesArr = [this.snoozes, this.dismisses, this.wakes];
            var organized = activitiesArr.sort(function (a, b) { return a - b; });
            var max = organized[organized.length - 1];
            this.setState({
                max: max,
                snoozeProportion: convertToProportion(this.snoozes, max),
                dismissProportion: convertToProportion(this.dismisses, max),
                wakeProportion: convertToProportion(this.wakes, max)
            });
        }
        else {
            var subtotalArr = [this.state.snoozeSubTotal, this.state.dismissSubTotal, this.state.wakeSubTotal];
            var organized = subtotalArr.sort(function (a, b) { return a - b; });
            var max = organized[organized.length - 1];
            this.setState({
                max: max,
                snoozeProportion: convertToProportion(this.state.snoozeSubTotal, max),
                dismissProportion: convertToProportion(this.state.dismissSubTotal, max),
                wakeProportion: convertToProportion(this.state.wakeSubTotal, max)
            });
        }
    };
    GraphWrapper.prototype.setxAxis = function () {
        var d = new Date();
        var month = d.getMonth();
        var year = d.getYear();
        function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }
        var monthMax = daysInMonth(month, year);
        var dayArray = [];
        for (var i = 1; i <= monthMax; i++) {
            dayArray.push(i);
        }
        return dayArray;
    };
    GraphWrapper.prototype.snoozeSubtotal = function () {
        this.setState({ snoozeSubTotal: this.snoozes * this.snoozePrice }, function () { this.setProportions(); });
    };
    GraphWrapper.prototype.dismissSubtotal = function () {
        this.setState({ dismissSubTotal: this.dismisses * this.dismissPrice }, function () { this.setProportions(); });
    };
    GraphWrapper.prototype.wakeSubtotal = function () {
        this.setState({ wakeSubTotal: this.wakes * this.wakePrice }, function () { this.setProportions(); });
    };
    GraphWrapper.prototype.componentDidMount = function () {
        if (this.state.topic === 'payments') {
            this.snoozeSubtotal();
            this.dismissSubtotal();
            this.wakeSubtotal();
        }
    };
    GraphWrapper.prototype.handleClick = function (setting) {
        if (setting === 'payments') {
            this.setState({
                yTitle: 'COST',
                xTitle: 'ACTION',
                topic: 'payments'
            }, function () {
                this.setProportions();
            });
        }
        else if (setting === 'activities') {
            this.setState({
                yTitle: 'EVENTS',
                xTitle: 'ACTION',
                topic: 'activities'
            }, function () {
                this.setProportions();
            });
        }
        else if (setting === 'totals') {
            this.setState({
                xAxis: 'totals'
            }, function () {
                this.setxAxis();
            });
        }
        else if (setting === 'time') {
            this.setState({
                xTitle: 'DATE',
                xAxis: 'time'
            }, function () {
                this.setxAxis();
            });
        }
    };
    GraphWrapper.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'paymentInfoWrapper' },
            React.createElement("div", null,
                React.createElement("div", { className: 'graphWrapper' },
                    React.createElement(YAxisTitle, { yTitle: this.state.yTitle }),
                    React.createElement(YAxis, { topic: this.state.topic, scale: this.scale() }),
                    React.createElement(Graph, { snooze: this.state.snoozeProportion, dismiss: this.state.dismissProportion, wake: this.state.wakeProportion, xAxis: this.state.xAxis, monthMax: this.monthMax, monthData: this.monthData })),
                React.createElement(XAxis, { xAxis: this.state.xAxis, monthMax: this.monthMax }),
                React.createElement(XAxisTitle, { xTitle: this.state.xTitle }),
                React.createElement("button", { onClick: function () { return _this.handleClick('totals'); } }, "totals"),
                React.createElement("button", { onClick: function () { return _this.handleClick('time'); } }, "over time")),
            React.createElement(UserData, { handleClick: this.handleClick, snoozes: this.props.snoozes, dismisses: this.props.dismisses, wakes: this.props.wakes, snoozePrice: this.props.snoozePrice, dismissPrice: this.props.dismissPrice, wakePrice: this.props.wakePrice, snoozeSubtotal: this.state.snoozeSubTotal, dismissSubtotal: this.state.dismissSubTotal, wakeSubtotal: this.state.wakeSubTotal })));
    };
    return GraphWrapper;
}(React.Component));
function YAxisTitle(props) {
    return (React.createElement("div", { className: 'y-title' },
        React.createElement("p", { className: 'vert-text' }, props.yTitle)));
}
//
function YAxis(props) {
    var a, b, c, d, e;
    if (props.topic === 'payments') {
        a = '$' + props.scale.fifth;
        b = '$' + props.scale.fourth;
        c = '$' + props.scale.third;
        d = '$' + props.scale.second;
        e = '$' + props.scale.first;
    }
    else if (props.topic === 'activities') {
        a = props.scale.fifth;
        b = props.scale.fourth;
        c = props.scale.third;
        d = props.scale.second;
        e = props.scale.first;
    }
    return (React.createElement("div", { className: 'y-axis' },
        React.createElement("div", null,
            React.createElement("p", null, a)),
        React.createElement("div", null,
            React.createElement("p", null, b)),
        React.createElement("div", null,
            React.createElement("p", null, c)),
        React.createElement("div", null,
            React.createElement("p", null, d)),
        React.createElement("div", null,
            React.createElement("p", null, e))));
}
function XAxisTitle(props) {
    return (React.createElement("div", { className: 'x-axis' },
        React.createElement("p", null, props.xTitle)));
}
function XAxis(props) {
    if (props.xAxis === 'time') {
        return (React.createElement("div", { className: 'x-axis' }, props.monthMax.map(function (date, index) {
            return React.createElement("div", { key: index },
                React.createElement("p", { className: 'dates' }, date));
        })));
    }
    else {
        return (React.createElement("div", { className: 'x-axis' },
            React.createElement("div", null,
                React.createElement("p", null, "snoozes")),
            React.createElement("div", null,
                React.createElement("p", null, "dismisses")),
            React.createElement("div", null,
                React.createElement("p", null, "wakes"))));
    }
}
function Graph(props) {
    if (props.xAxis === 'time') {
        return (React.createElement("div", { className: 'graph' }, props.monthMax.map(function (date, index) {
            var height = '1vh';
            var background = 'white';
            if (props.monthData[index] !== undefined) {
                height = props.monthData[index].snooze.toString() + 'vh';
                props.monthData[index].wake ? background = 'green' : background = 'red';
            }
            var genBarStyle = {
                height: height,
                transition: '600ms',
                border: '1px solid white',
                background: background
            }; //
            return React.createElement("div", { style: genBarStyle, key: index });
        })));
    }
    else {
        var snoozeStyle = {
            height: props.snooze.toString() + '%',
            transition: '600ms',
        };
        var dismissStyle = {
            height: props.dismiss.toString() + '%',
            transition: '600ms',
        };
        var wakeStyle = {
            height: props.wake.toString() + '%',
            transition: '600ms',
        };
        return (React.createElement("div", { className: "graph" },
            React.createElement("div", { style: snoozeStyle }),
            React.createElement("div", { style: dismissStyle }),
            React.createElement("div", { style: wakeStyle })));
    }
}
function UserData(props) {
    return (React.createElement("div", { className: 'userDataSummary' },
        React.createElement("h2", null, "Summary"),
        React.createElement("div", { className: 'titleButton' },
            React.createElement("h4", null, "Your prices")),
        React.createElement("p", null,
            "snoozePrice: $",
            props.snoozePrice,
            " "),
        React.createElement("p", null,
            "dismissPrice: $",
            props.dismissPrice,
            " "),
        React.createElement("p", null,
            "wakePrice: $",
            props.wakePrice,
            " "),
        React.createElement("button", null, "change in settings"),
        React.createElement("div", { className: 'titleButton' },
            React.createElement("h4", null, "Your activity")),
        React.createElement("p", null,
            "snoozes: ",
            props.snoozes,
            " "),
        React.createElement("p", null,
            "dismisses: ",
            props.dismisses,
            " "),
        React.createElement("p", null,
            "wakes: ",
            props.wakes,
            " "),
        React.createElement("button", { onClick: function () { return props.handleClick('activities'); } }, "activities"),
        React.createElement("div", { className: 'titleButton' },
            React.createElement("h4", null, "Your payments")),
        React.createElement("p", null,
            "snoozeSubTotal: $",
            props.snoozeSubtotal),
        React.createElement("p", null,
            "dismissSubTotal: $",
            props.dismissSubtotal),
        React.createElement("p", null,
            "wakeSubTotal: $",
            props.wakeSubtotal),
        React.createElement("button", { onClick: function () { return props.handleClick('payments'); } }, "payments"),
        React.createElement("h4", null, "Total"),
        React.createElement("p", null,
            "total: $",
            props.snoozeSubtotal + props.dismissSubtotal + props.wakeSubtotal)));
}
// HELPER
function convertToProportion(number, max) {
    if (number !== 0) {
        return ((number / max) * 100);
    }
    else {
        return 0;
    }
}
exports.default = GraphWrapper;
//# sourceMappingURL=user-graph.js.map