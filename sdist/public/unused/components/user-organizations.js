"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function UserOrgs(props) {
    console.log(props);
    var printableOrgs = JSON.stringify(props.Orgs);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "user orgs"),
        printableOrgs));
}
exports.default = UserOrgs;
//# sourceMappingURL=user-organizations.js.map