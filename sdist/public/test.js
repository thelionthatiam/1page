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
var Transition_1 = require("react-transition-group/Transition");
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var NewTest = /** @class */ (function (_super) {
    __extends(NewTest, _super);
    function NewTest(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.componentDidMount = _this.componentDidMount.bind(_this);
        return _this;
    }
    NewTest.prototype.componentDidMount = function () {
        this.props.getTestData();
    };
    NewTest.prototype.handleSubmit = function (event) {
        event.preventDefault();
        console.log('handlesubmit', this.props.getTestData());
        this.props.getTestData();
    };
    NewTest.prototype.render = function () {
        console.log(this.props.test, this.props.test.length);
        var duration = 200;
        var transitionStyles = {
            entering: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            entered: {
                opacity: 1,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exiting: {
                opacity: .8,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exited: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            }
        };
        var items = React.createElement("h1", null, "nothing here yet!");
        if (this.props.test.length !== 0) {
            items = this.props.test.map(function (item) {
                return React.createElement("div", { key: item.id, title: item.test },
                    React.createElement("p", null, item.id),
                    React.createElement("p", null, item.test),
                    React.createElement("p", null, item.test_uuid),
                    React.createElement("p", null, item.date));
            });
        }
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h1", null, "hello react world"),
                React.createElement("form", { action: '/test', method: "post" },
                    React.createElement("input", { type: 'text' }),
                    React.createElement("button", { type: "submit" }, "test"))),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.handleSubmit }, "test")),
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, function (state) {
                return React.createElement("div", { style: transitionStyles[state] }, items);
            })));
    };
    return NewTest;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        test: state.test.test
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        getTestData: function () { return dispatch(actions_1.fetchTestData()); }
    };
};
var TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewTest);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map