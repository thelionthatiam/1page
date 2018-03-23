"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var permissions_1 = require("../actions/permissions");
var async_permissions_1 = require("../actions/async-permissions");
var spa_1 = require("../components/spa");
var mapStateToProps = function (state, ownProps) {
    return {
        message: state.permissionCheck.message
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        isLoggedIn: function () { return dispatch(permissions_1.user()); },
        isNotLoggedIn: function () { return dispatch(permissions_1.guest()); },
        permissionChecker: function () { return dispatch(async_permissions_1.fetchPermissions()); }
    };
};
var AppWithActions = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(spa_1.default);
exports.default = AppWithActions;
//# sourceMappingURL=appActions.js.map