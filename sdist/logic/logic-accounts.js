"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var E = require("../services/error-handling");
var CreateAcctSvc = /** @class */ (function () {
    function CreateAcctSvc(querySvc, inputs, sessionID) {
        this.querySvc = querySvc;
        this.inputs = inputs;
        this.sessionID = sessionID;
        this.user;
        this.hash = this.hash.bind(this);
        this.randomString = this.randomString.bind(this);
    }
    CreateAcctSvc.prototype.hash = function () {
        var _this = this;
        return bcrypt.hash(this.inputs.password, 10)
            .then(function (hash) {
            console.log('hashed completed,', hash);
            _this.inputs.hashedPassword = hash;
            return null;
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
                console.log('err', err);
                reject(err);
            }
            console.log('random string completed,', string);
            resolve(string);
        });
    };
    CreateAcctSvc.prototype.createAcct = function () {
        var _this = this;
        return E.passChecker(this.inputs.password)
            .then(function () { return _this.hash(); })
            .then(function () { return _this.querySvc.insertUser([
            _this.inputs.email,
            _this.inputs.phone,
            _this.inputs.hashedPassword,
            _this.inputs.name,
            'user'
        ]); })
            .then(function (user) {
            console.log('user inserted', user);
            _this.user = user;
            return _this.randomString();
        })
            .then(function (nonce) {
            console.log('nonce created', nonce);
            _this.querySvc.insertNonce([_this.user.user_uuid, nonce]);
        })
            .then(function () {
            console.log('nonce inserted');
            console.log('session inputs', _this.user.user_uuid, _this.sessionID);
            _this.querySvc.insertSession([_this.user.user_uuid, _this.sessionID]);
        })
            .then(function (sessionInDB) {
            console.log('insert session completed', sessionInDB);
            _this.querySvc.insertSettings([_this.user.user_uuid]);
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
// export function saveUserInformation(querySvc, email, phone, password, name) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertUser([email, phone, password, name, 'user'])
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
// export function insertUserNonce(querySvc, uuid, nonce) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertNonce([uuid, nonce])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
// export function createUserSessionStorage(querySvc, uuid, sessionID) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertSession([uuid, sessionID])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
// export function createUserSettings(querySvc, uuid) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertSettings([uuid])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
//# sourceMappingURL=logic-accounts.js.map