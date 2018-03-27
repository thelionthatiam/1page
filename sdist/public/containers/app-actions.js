"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var permissions_1 = require("../actions/permissions");
var user_data_1 = require("../actions/user-data");
var spa_1 = require("../spa");
var mapStateToProps = function (state, ownProps) {
    console.log('state', state.getUserData.user.profile.email);
    return {
        permission: state.getPermissions.permission,
        email: state.getUserData.user.profile
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    console.log('dispatch function');
    return {
        permissionChecker: function () { return dispatch(permissions_1.fetchPermissions()); },
        getUserData: function () { return dispatch(user_data_1.fetchUserData()); }
    };
};
var AppWithActions = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(spa_1.default);
exports.default = AppWithActions;
//# sourceMappingURL=app-actions.js.map