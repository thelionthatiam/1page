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
var Stuff = /** @class */ (function (_super) {
    __extends(Stuff, _super);
    function Stuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stuff.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "STUFF"),
            react_1.default.createElement("p", null, "Mauris sem velit, vehicula eget sodales vitae, rhoncus eget sapien:"),
            react_1.default.createElement("ol", null,
                react_1.default.createElement("li", null, "Nulla pulvinar diam"),
                react_1.default.createElement("li", null, "Facilisis bibendum"),
                react_1.default.createElement("li", null, "Vestibulum vulputate"),
                react_1.default.createElement("li", null, "Eget erat"),
                react_1.default.createElement("li", null, "Id porttitor"))));
    };
    return Stuff;
}(react_1.Component));
exports.default = Stuff;
//# sourceMappingURL=spa-stuff.js.map