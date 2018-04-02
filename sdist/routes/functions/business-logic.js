"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var R = require("../resources/value-objects");
var uuidv4 = require("uuid/v4");
asdfasdf;
// AUTHORIZATION
var BusinessLogic = /** @class */ (function () {
    function BusinessLogic(client) {
        this.client = client;
    }
    BusinessLogic.prototype.checkEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.selectUser([email])
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
    return BusinessLogic;
}());
function checkEmail(client, email) {
    return new Promise(function (resolve, reject) {
        client.selectUser([email])
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
}
exports.checkEmail = checkEmail;
function checkPassword(inputPass, realPass) {
    console.log(inputPass, realPass);
    return new Promise(function (resolve, reject) {
        bcrypt.compare(inputPass, realPass)
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
}
exports.checkPassword = checkPassword;
function regenerateSession(session) {
    return new Promise(function (resolve, reject) {
        session.regenerate(function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
exports.regenerateSession = regenerateSession;
function updateSession(client, sessionID, uuid) {
    return new Promise(function (resolve, reject) {
        client.updateSessionID([sessionID, uuid])
            .then(function (result) {
            resolve(result);
        })
            .catch(function (err) { return reject(err); });
    });
}
exports.updateSession = updateSession;
function defineSession(user) {
    var session = r.UserSession.fromJSON({
        email: user.email,
        uuid: user.user_uuid,
        permission: user.permission,
        name: user.name
    });
    return session;
}
exports.defineSession = defineSession;
// NEW ACCOUNT
function hash(input) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(input, 10)
            .then(function (hash) { return resolve(hash); })
            .catch(function (err) { return reject(err); });
    });
}
exports.hash = hash;
function saveUserInformation(client, email, phone, password, name) {
    return new Promise(function (resolve, reject) {
        client.insertUser([email, phone, password, name, 'user'])
            .then(function (result) {
            console.log(result);
            var u = result.rows[0];
            console.log(u);
            var user = r.UserDB.fromJSON({
                email: u.email,
                user_uuid: u.user_uuid,
                permission: u.permission,
                phone: u.phone,
                name: u.name,
                password: u.password
            });
            console.log(user);
            resolve(user);
        })
            .catch(function (err) { return reject(err); });
    });
}
exports.saveUserInformation = saveUserInformation;
exports.randomString = new Promise(function (resolve, reject) {
    var string = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,." +
        "<>/?;:'{}[]|";
    for (var i = 0; i <= 40; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (typeof string === "undefined") {
        var err = new Error("randomString failed to create anything ");
        return reject(err);
    }
    return resolve(string);
});
function insertUserNonce(client, uuid, nonce) {
    return new Promise(function (resolve, reject) {
        client.insertNonce([uuid, nonce])
            .then(function (result) { return resolve(result); })
            .catch(function (err) { return reject(err); });
    });
}
exports.insertUserNonce = insertUserNonce;
function createUserSessionStorage(client, uuid, sessionID) {
    return new Promise(function (resolve, reject) {
        client.insertSession([uuid, sessionID])
            .then(function (result) { return resolve(result); })
            .catch(function (err) { return reject(err); });
    });
}
exports.createUserSessionStorage = createUserSessionStorage;
function createUserSettings(client, uuid) {
    return new Promise(function (resolve, reject) {
        client.insertSettings([uuid])
            .then(function (result) { return resolve(result); })
            .catch(function (err) { return reject(err); });
    });
}
exports.createUserSettings = createUserSettings;
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
//# sourceMappingURL=business-logic.js.map