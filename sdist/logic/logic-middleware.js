"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionCheckSvc = /** @class */ (function () {
    function SessionCheckSvc(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
    }
    SessionCheckSvc.prototype.getPermissions = function () {
        var _this = this;
        return this
            .querySvc
            .getSessionID([this.user.uuid])
            .then(function (result) { return _this.querySvc.getUser([_this.user.uuid]); })
            .then(function (result) { return result.permission; });
    };
    return SessionCheckSvc;
}());
exports.SessionCheckSvc = SessionCheckSvc;
var RenderStateSvc = /** @class */ (function () {
    function RenderStateSvc(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
        this.userData = {};
    }
    RenderStateSvc.prototype.getEverything = function () {
        var _this = this;
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%start get everything', this);
        return this
            .querySvc
            .getUser([this.user.uuid])
            .then(function (result) {
            _this.userData.user = result;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%one', _this.userData);
            return _this
                .querySvc
                .getUserFormsOfPayment([_this.user.uuid]);
        })
            .then(function (result) {
            _this.userData.formsOfPayment = result;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%two', _this.userData);
            return _this
                .querySvc
                .getUserSettings([_this.user.uuid]);
        })
            .then(function (result) {
            _this.userData.settings = result;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%three', _this.userData);
            return _this
                .querySvc
                .getUserOrgs([_this.user.uuid]);
        })
            .then(function (result) {
            _this.userData.orgs = result;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%four', _this.userData);
            return _this
                .querySvc
                .getUserAlarms([_this.user.uuid]);
        })
            .then(function (result) {
            _this.userData.alarms = result;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%five', _this.userData);
            return _this.userData;
        });
    };
    return RenderStateSvc;
}());
exports.RenderStateSvc = RenderStateSvc;
//# sourceMappingURL=logic-middleware.js.map