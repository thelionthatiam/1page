"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var user_alarms_1 = require("../components/user-alarms");
console.log('ALARM ACTIONS:', window.userData);
var mapStateToProps = function (state, ownProps) {
    return {
        userData: state.getPermissions,
        profile: state.getPermissions.profile,
        alarms: state.getPermissions.alarms,
        settings: state.getPermissions.settings,
        orgs: state.getPermissions.orgs,
        permission: state.getPermissions.permission
    };
};
var AlarmsWithActions = react_redux_1.connect(mapStateToProps)(user_alarms_1.default);
exports.default = AlarmsWithActions;
//# sourceMappingURL=alarm-actions.js.map