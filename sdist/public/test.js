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
var NewTest = /** @class */ (function (_super) {
    __extends(NewTest, _super);
    function NewTest(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: ''
        };
        return _this;
    }
    NewTest.prototype.handleChange = function (event) {
        this.setState({ value: event.target.value });
    };
    NewTest.prototype.handleSubmit = function (event) {
        event.preventDefault();
    };
    NewTest.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "hello react world")));
    };
    return NewTest;
}(React.Component));
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {};
};
var TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewTest);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map