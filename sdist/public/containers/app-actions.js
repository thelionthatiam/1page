"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var permissions_1 = require("../actions/permissions");
var spa_1 = require("../components/spa");
var mapStateToProps = function (state, ownProps) {
    return {
        permission: state.getPermissions.permission
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        permissionChecker: function () { return dispatch(permissions_1.fetchPermissions()); }
    };
};
var AppWithActions = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(spa_1.default);
exports.default = AppWithActions;
//# sourceMappingURL=app-actions.js.map