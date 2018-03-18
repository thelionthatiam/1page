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
var button_generic_1 = require("./button-generic");
var React = require("react");
var FormWrapperUnc = /** @class */ (function (_super) {
    __extends(FormWrapperUnc, _super);
    function FormWrapperUnc(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            submitted: false,
            submitable: false,
            data: {}
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.testObj = {};
        return _this;
    }
    FormWrapperUnc.prototype.handleSubmit = function (event) {
        event.preventDefault();
    };
    FormWrapperUnc.prototype.skipValidation = function () {
        this.setState({
            submitable: true
        });
    };
    FormWrapperUnc.prototype.render = function () {
        var _this = this;
        var childWithProp = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                sendData: _this.getData,
                submitted: _this.state.submitted
            });
        });
        return (React.createElement("div", { className: 'formWrapper' },
            React.createElement("form", { action: this.props.url, method: this.props.method },
                React.createElement("input", { type: 'text', ref: function (input) { return _this.input = input; } }),
                React.createElement("input", { type: 'text', ref: function (input) { return _this.input = input; } }),
                React.createElement(button_generic_1.default, { buttonText: this.props.buttonText, type: 'submit' }))));
    };
    return FormWrapperUnc;
}(React.Component));
exports.default = FormWrapperUnc;
//# sourceMappingURL=form-wrapper-uncontrolled.js.map