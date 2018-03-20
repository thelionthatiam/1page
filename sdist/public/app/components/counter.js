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
var prop_types_1 = require("prop-types");
var Counter = /** @class */ (function (_super) {
    __extends(Counter, _super);
    function Counter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Counter.prototype.render = function () {
        var _a = this.props, current = _a.current, total = _a.total, onIncrement = _a.onIncrement, onDecrement = _a.onDecrement, onReset = _a.onReset;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                "Current: ",
                current,
                "Total: ",
                total),
            react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: onIncrement }, "INCREMENT"),
                ' ',
                react_1.default.createElement("button", { onClick: onDecrement }, "DECREMENT"),
                ' ',
                react_1.default.createElement("button", { onClick: onReset }, "RESET ALL"))));
    };
    return Counter;
}(react_1.Component));
Counter.propTypes = {
    current: prop_types_1.default.number.isRequired,
    total: prop_types_1.default.number.isRequired,
    onIncrement: prop_types_1.default.func.isRequired,
    onDecrement: prop_types_1.default.func.isRequired,
    onReset: prop_types_1.default.func.isRequired
};
exports.default = Counter;
//# sourceMappingURL=counter.js.map