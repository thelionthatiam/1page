"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var alarms_1 = require("../actions/alarms");
var alarm_clock_1 = require("../components/alarm-clock");
var mapStateToProps = function (state, ownProps) {
    return {
        alarms: state.getAlarms.alarms,
        permission: state.getPermissions.permission
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        alarmGetter: function () { return dispatch(alarms_1.fetchAlarms()); }
    };
};
var AlarmsWithActions = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(alarm_clock_1.default);
exports.default = AlarmsWithActions;
//# sourceMappingURL=alarm-actions.js.map