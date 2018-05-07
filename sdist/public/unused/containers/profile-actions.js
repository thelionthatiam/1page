"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var user_profile_1 = require("../components/user-profile");
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
var ProfileWithActions = react_redux_1.connect(mapStateToProps)(user_profile_1.default);
exports.default = ProfileWithActions;
//# sourceMappingURL=profile-actions.js.map