"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function UserSettings(props) {
    console.log(props);
    var printableSettings = JSON.stringify(props.settings);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "user settings"),
        printableSettings));
}
exports.default = UserSettings;
//# sourceMappingURL=user-settings.js.map