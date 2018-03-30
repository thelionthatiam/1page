"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var user_settings_1 = require("../components/user-settings");
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
var SettingsWithActions = react_redux_1.connect(mapStateToProps)(user_settings_1.default);
exports.default = SettingsWithActions;
//# sourceMappingURL=settings-actions.js.map