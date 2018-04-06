"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionCheckSvc = /** @class */ (function () {
    function SessionCheckSvc(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
    }
    SessionCheckSvc.prototype.getPermissions = function () {
        var _this = this;
        return this.querySvc.getSessionID([this.user.uuid])
            .then(function (result) { return _this.querySvc.getUser([_this.user.uuid]); })
            .then(function (result) { return result.permission; });
    };
    return SessionCheckSvc;
}());
exports.SessionCheckSvc = SessionCheckSvc;
//# sourceMappingURL=logic-middleware.js.map