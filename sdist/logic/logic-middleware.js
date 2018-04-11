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
            .then(function (result) {
            return _this.querySvc.getUser([_this.user.uuid]);
        })
            .then(function (result) { return result.permission; });
    };
    return SessionCheckSvc;
}());
exports.SessionCheckSvc = SessionCheckSvc;
var RenderStateSvc = /** @class */ (function () {
    function RenderStateSvc(querySvc, sessionUser) {
        this.querySvc = querySvc;
        this.sessionUser = sessionUser;
        this.user = {};
    }
    RenderStateSvc.prototype.getEverything = function () {
        var _this = this;
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%start get everything', this);
        return this.querySvc.getUser([this.sessionUser.uuid])
            .then(function (profile) {
            _this.user.profile = profile;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%one', _this.user);
            return _this.querySvc.getUserAlarms([_this.sessionUser.uuid]);
        })
            .then(function (alarms) {
            _this.user.alarms = alarms;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%five', _this.user);
            return _this.user;
        });
    };
    return RenderStateSvc;
}());
exports.RenderStateSvc = RenderStateSvc;
// NOT CURRENTLY USING THIS CONCEPT
// .then(result => {
//     this.userData.formsOfPayment = result
//     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%two', this.userData)
//     return this
//         .querySvc
//         .getUserSettings([this.user.uuid])
// })
// NOT CURRENLTY USING THIS CONCEPT
// .then(result => {
//     this.userData.settings = result;
//     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%three', this.userData)
//     return this
//         .querySvc
//         .getUserOrgs([this.user.uuid])
// })
// NOT CURRENTLY USING THIS CONCEPT
// .then(result => {
//     this.userData.orgs = result
//     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%four', this.userData)
//     return this
//         .querySvc
//         .getUserAlarms([this.user.uuid]) // wrong
// })
//# sourceMappingURL=logic-middleware.js.map