"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var permissions_1 = require("../actions/permissions");
var spa_1 = require("../spa");
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
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        // getUserData: () => dispatch(fetchUserData()),
        permissionChecker: function () { return dispatch(permissions_1.reqPermissions()); },
    };
};
var AppWithActions = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(spa_1.default);
exports.default = AppWithActions;
//# sourceMappingURL=app-actions.js.map