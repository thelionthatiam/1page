"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./test");
var React = require("react");
var ReactDOM = require("react-dom");
function test() {
    return ReactDOM.render(React.createElement(test_1.default, { name: "anything else" }), document.getElementById('HelloWorld'));
}
exports.default = test;
//# sourceMappingURL=test-page.js.map