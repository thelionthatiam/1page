"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var E = require("../services/error-handling");
var logic_authorization_1 = require("./logic-authorization");
var ProfileSvc = /** @class */ (function () {
    function ProfileSvc(querySvc, user, inputs) {
        this.querySvc = querySvc;
        this.user = user,
            this.inputs = inputs;
    }
    ProfileSvc.prototype.changePassword = function () {
        var _this = this;
        return this.querySvc.getUser([this.user.uuid])
            .then(function (user) {
            return logic_authorization_1.default.checkPassword(_this.inputs.oldPassword, user.password);
        })
            .then(function (boolean) {
            return E.passChecker(_this.inputs.password);
        })
            .then(function () {
            return bcrypt.hash(_this.inputs.password, 10);
        })
            .then(function (hash) { return _this.querySvc.updatePassword([hash, _this.user.uuid]); });
    };
    return ProfileSvc;
}());
exports.default = ProfileSvc;
//# sourceMappingURL=logic-profile.js.map