"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var R = require("../services/value-objects");
var uuidv4 = require("uuid/v4");
// AUTHORIZATION
var AuthSvc = /** @class */ (function () {
    function AuthSvc(client, user, inputs, sessionID) {
        this.sessionID = sessionID;
        this.client = client;
        this.user = user;
        this.inputs = inputs;
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.defineSession = this.defineSession.bind(this);
        this.doAuth = this.doAuth.bind(this);
    }
    AuthSvc.prototype.checkEmail = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.selectUser([_this.inputs.email])
                .then(function (result) {
                if (result.rows.length === 0) {
                    throw new Error("Email not found");
                }
                else {
                    resolve(R.UserDB.fromJSON(result.rows[0]));
                }
            })
                .catch(function (err) { return reject(err); });
        });
    };
    AuthSvc.prototype.checkPassword = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            bcrypt.compare(_this.inputs.password, _this.user.password)
                .then(function (result) {
                if (result === false) {
                    throw new Error('Password incorrect');
                }
                else {
                    resolve(result);
                }
            })
                .catch(function (err) { return reject(err); });
        });
    };
    AuthSvc.prototype.updateSession = function () {
        var _this = this;
        // console.log('~~~~~~ session id after regnerate', this.sessionID)
        return new Promise(function (resolve, reject) {
            _this.client.updateSessionID([_this.sessionID, _this.user.user_uuid])
                .then(function (result) {
                resolve(result);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    AuthSvc.prototype.defineSession = function () {
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
        // console.log('%%%%%%%%%%%1', this)
        return new Promise(function (resolve, reject) {
            // console.log('%%%%%%%%%%%2', this)
            _this.checkEmail()
                .then(function (result) {
                // console.log('%%%%%%%%%%%3', this)
                _this.user = result;
                return _this.checkPassword();
            })
                .then(function () {
                // console.log('%%%%%%%%after regen', this.sessionID)
                return _this.updateSession();
            })
                .then(function (result) {
                var userSession = _this.defineSession();
                // console.log('final promise do auth', this.sessionID)
                resolve(userSession);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    return AuthSvc;
}());
exports.AuthSvc = AuthSvc;
function regenerateSession(session) {
    // console.log('~~~~~~ session id before regnerate', session.id)
    return new Promise(function (resolve, reject) {
        session.regenerate(function (err) {
            if (err) {
                reject(err);
            }
            else {
                // console.log('~~~~~~ session id after regnerate', session.id)
                resolve();
            }
        });
    });
}
exports.regenerateSession = regenerateSession;
// LOGOUT
function updateToInactiveSessionID(client, uuid) {
    return new Promise(function (resolve, reject) {
        var inactive = uuidv4();
        client.updateSessionID([inactive, uuid])
            .then(function (result) { return resolve(); })
            .catch(function (err) { return reject(err); });
    });
}
exports.updateToInactiveSessionID = updateToInactiveSessionID;
function destroySession(session) {
    return new Promise(function (resolve, reject) {
        session.destroy(function (err) {
            err ? reject(err) : resolve();
        });
    });
}
exports.destroySession = destroySession;
//# sourceMappingURL=logic-authorization.js.map