"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var R = require("../services/value-objects");
var uuidv4 = require("uuid/v4");
// AUTHORIZATION
var AuthSvc = /** @class */ (function () {
    function AuthSvc(querySvc, inputs, sessionID) {
        this.sessionID = sessionID;
        this.querySvc = querySvc;
        this.inputs = inputs;
        this.user;
        this.checkPassword = this.checkPassword.bind(this);
        this.defineSessionData = this.defineSessionData.bind(this);
        this.doAuth = this.doAuth.bind(this);
    }
    AuthSvc.prototype.checkPassword = function () {
        bcrypt.compare(this.inputs.password, this.user.password)
            .then(function (result) {
            if (result === false) {
                throw new Error('Password incorrect');
            }
            else {
                return result;
            }
        })
            .catch(function (err) { return err; });
    };
    AuthSvc.prototype.defineSessionData = function () {
        var session = R.UserSession.fromJSON({
            email: this.user.email,
            uuid: this.user.user_uuid,
            permission: this.user.permission,
            name: this.user.name
        });
        return session;
    };
    AuthSvc.prototype.doAuth = function () {
        var _this = this;
        return this.querySvc.getUserViaEmail([this.inputs.email])
            .then(function (result) {
            _this.user = result;
            return _this.checkPassword();
        })
            .then(function () { return _this.querySvc.updateSessionID([_this.sessionID, _this.user.user_uuid]); })
            .then(function () {
            var userDataForSession = _this.defineSessionData();
            return userDataForSession;
        })
            .catch(function (err) { return err; });
    };
    return AuthSvc;
}());
exports.default = AuthSvc;
function regenerateSession(session) {
    return new Promise(function (resolve, reject) {
        session.regenerate(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.regenerateSession = regenerateSession;
// LOGOUT
function updateToInactiveSessionID(querySvc, uuid) {
    var inactive = uuidv4();
    return querySvc.updateSessionID([inactive, uuid])
        .then(function () { })
        .catch(function (err) { return err; });
}
exports.updateToInactiveSessionID = updateToInactiveSessionID;
function destroySession(session) {
    return new Promise(function (resolve, reject) {
        session.destroy(function (err) { return err ? reject(err) : resolve(); });
    });
}
exports.destroySession = destroySession;
//# sourceMappingURL=logic-authorization.js.map