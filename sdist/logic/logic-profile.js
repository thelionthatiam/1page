"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("../services/error-handling");
var bcrypt = require("bcrypt");
var logic_authorization_1 = require("./logic-authorization");
var ProfileSvc = /** @class */ (function () {
    function ProfileSvc(querySvc, user, inputs) {
        this.querySvc = querySvc;
        this.user = user,
            this.inputs = inputs;
    }
    ProfileSvc.prototype.changeContact = function () {
        return this.querySvc.updateContactInformation([this.inputs.name, this.inputs.email, this.inputs.phone, this.user.uuid]);
    };
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
    ProfileSvc.prototype.deleteAccount = function () {
        return this.querySvc.deleteAccount([this.user.uuid]);
    };
    return ProfileSvc;
}());
exports.default = ProfileSvc;
//# sourceMappingURL=logic-profile.js.map