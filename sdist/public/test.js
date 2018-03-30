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
var ReactDOM = require("react-dom");
var Tester = /** @class */ (function (_super) {
    __extends(Tester, _super);
    function Tester(props) {
        var _this = _super.call(this, props) || this;
        _this.user = _this.props.userData;
        return _this;
    }
    Tester.prototype.render = function () {
        console.log(this.props);
        return (React.createElement("div", null,
            React.createElement("p", null, "this is a test that originates from react, with a little sauce"),
            React.createElement("div", null,
                React.createElement("pre", null, JSON.stringify(this.user, null, 2)))));
    };
    return Tester;
}(React.Component));
function test() {
    return ReactDOM.render(React.createElement(Tester, null), document.getElementById('root'));
}
exports.default = Tester;
//# sourceMappingURL=test.js.map