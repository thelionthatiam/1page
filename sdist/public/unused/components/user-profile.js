"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function UserProfile(props) {
    console.log(props);
    var printableProfile = JSON.stringify(props.profile);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "user profile"),
        printableProfile));
}
exports.default = UserProfile;
//# sourceMappingURL=user-profile.js.map