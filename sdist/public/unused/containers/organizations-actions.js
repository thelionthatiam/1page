"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var user_organizations_1 = require("../components/user-organizations");
var mapStateToProps = function (state, ownProps) {
    return {
        userData: state.getUserData,
        profile: state.getUserData.profile,
        alarms: state.getUserData.alarms,
        settings: state.getUserData.settings,
        orgs: state.getUserData.orgs,
        permission: state.getPermissions.permission
    };
};
var OrgsWithActions = react_redux_1.connect(mapStateToProps)(user_organizations_1.default);
exports.default = OrgsWithActions;
//# sourceMappingURL=organizations-actions.js.map