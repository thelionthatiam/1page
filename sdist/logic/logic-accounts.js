"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var R = require("../services/value-objects");
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
            var user = R.UserDB.fromJSON({
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
//# sourceMappingURL=logic-accounts.js.map