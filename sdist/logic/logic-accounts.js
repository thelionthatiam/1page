"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var R = require("../services/value-objects");
var CreateAcctSvc = /** @class */ (function () {
    function CreateAcctSvc(client, inputs, user, sessionID) {
        this.client = client;
        this.inputs = inputs;
        this.user = user;
        this.sessionID = sessionID;
        this.hash = this.hash.bind(this);
        this.saveUserInformation = this.saveUserInformation.bind(this);
        this.randomString = this.randomString.bind(this);
        this.insertUserNonce = this.insertUserNonce.bind(this);
        this.createUserSessionStorage = this.createUserSessionStorage.bind(this);
        this.createUserSettings = this.createUserSettings.bind(this);
    }
    CreateAcctSvc.prototype.hash = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            bcrypt.hash(_this.inputs.password, 10)
                .then(function (hash) { return resolve(hash); })
                .catch(function (err) { return reject(err); });
        });
    };
    CreateAcctSvc.prototype.saveUserInformation = function (hashedPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.insertUser([_this.inputs.email, _this.inputs.phone, hashedPassword, _this.inputs.name, 'user'])
                .then(function (result) {
                console.log(result);
                var u = result.rows[0];
                console.log(u);
                _this.user = R.UserDB.fromJSON({
                    email: u.email,
                    user_uuid: u.user_uuid,
                    permission: u.permission,
                    phone: u.phone,
                    name: u.name,
                    password: u.password
                });
                console.log(_this.user);
                resolve(_this.user);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    CreateAcctSvc.prototype.randomString = function () {
        return new Promise(function (resolve, reject) {
            var string = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,.<>/?;:'{}[]|";
            for (var i = 0; i <= 40; i++) {
                string += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            if (typeof string === "undefined") {
                var err = new Error("randomString failed to create anything ");
                return reject(err);
            }
            return resolve(string);
        });
    };
    CreateAcctSvc.prototype.insertUserNonce = function (nonce) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.insertNonce([_this.user.user_uuid, nonce])
                .then(function (result) { return resolve(result); })
                .catch(function (err) { return reject(err); });
        });
    };
    CreateAcctSvc.prototype.createUserSessionStorage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.insertSession([_this.user.user_uuid, _this.sessionID])
                .then(function (result) { return resolve(result); })
                .catch(function (err) { return reject(err); });
        });
    };
    CreateAcctSvc.prototype.createUserSettings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.insertSettings([_this.user.user_uuid])
                .then(function (result) { return resolve(result); })
                .catch(function (err) { return reject(err); });
        });
    };
    CreateAcctSvc.prototype.createAcct = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.hash()
                .then(function (hashedPassword) { return _this.saveUserInformation(hashedPassword); })
                .then(function () { return _this.randomString(); })
                .then(function (nonce) { return _this.insertUserNonce(nonce); })
                .then(function () { return _this.createUserSessionStorage(); })
                .then(function () { return _this.createUserSettings(); })
                .then(function () { return resolve(); })
                .catch(function (e) { return reject(e); });
        });
    };
    return CreateAcctSvc;
}());
exports.default = CreateAcctSvc;
// export function hash(input) {
//     return new Promise (
//         (resolve, reject) => {
//             bcrypt.hash(input, 10)
//             .then(hash => resolve(hash))
//             .catch(err => reject(err))
//         }
//     )
// }
// export function saveUserInformation(client, email, phone, password, name) {
//     return new Promise (
//         (resolve, reject) => {
//             client.insertUser([email, phone, password, name, 'user'])
//             .then((result) => {
//                 console.log(result)
//                 let u = result.rows[0]
//                 console.log(u)
//                 let user = R.UserDB.fromJSON({
//                     email:u.email,
//                     user_uuid:u.user_uuid,
//                     permission:u.permission,
//                     phone:u.phone,
//                     name:u.name,
//                     password:u.password
//                 })
//                 console.log(user)
//                 resolve(user)
//             })
//             .catch(err => reject(err))
//         }
//     )
// }
// export const randomString = new Promise((resolve, reject) => {
//     let string = "";
//     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,." +
//             "<>/?;:'{}[]|";
//     for (let i = 0; i <= 40; i++) {
//         string += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     if (typeof string === "undefined") {
//         let err = new Error ("randomString failed to create anything ")
//         return reject(err)
//     }
//     return resolve(string);
// })
// export function insertUserNonce(client, uuid, nonce) {
//     return new Promise (
//         (resolve, reject) => {
//             client.insertNonce([uuid, nonce])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
// export function createUserSessionStorage(client, uuid, sessionID) {
//     return new Promise (
//         (resolve, reject) => {
//             client.insertSession([uuid, sessionID])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
// export function createUserSettings(client, uuid) {
//     return new Promise (
//         (resolve, reject) => {
//             client.insertSettings([uuid])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
//# sourceMappingURL=logic-accounts.js.map