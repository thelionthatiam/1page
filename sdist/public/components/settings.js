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
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Settings.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Settings?"),
            react_1.default.createElement("p", null,
                "The easiest thing to do is post on our ",
                react_1.default.createElement("a", { href: "http://forum.kirupa.com" }, "forums"),
                ".")));
    };
    return Settings;
}(react_1.Component));
exports.default = Settings;
//# sourceMappingURL=settings.js.map