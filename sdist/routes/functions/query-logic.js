"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var r = require("../resources/value-objects");
// AUTHORIZATION
function checkEmail(client, email) {
    return new Promise(function (resolve, reject) {
        client.getUserViaEmail([email])
            .then(function (result) {
            if (result.rows.length === 0) {
                throw new Error("Email not found");
            }
            else {
                resolve(r.UserDB.fromJSON(result.rows[0]));
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
//# sourceMappingURL=query-logic.js.map