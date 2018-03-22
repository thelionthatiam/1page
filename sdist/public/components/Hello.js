"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var Hello = function (_a) {
    var onClick = _a.onClick, reset = _a.reset, message = _a.message;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, message),
        react_1.default.createElement("button", { onClick: onClick }, "Click"),
        "\u00A0",
        react_1.default.createElement("button", { onClick: reset }, "Reset")));
};
Hello.propTypes = {
    onClick: prop_types_1.default.func.isRequired,
    reset: prop_types_1.default.func.isRequired,
    message: prop_types_1.default.string.isRequired
};
exports.default = Hello;
//# sourceMappingURL=Hello.js.map