"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var E = require("../services/error-handling");
var R = require("../services/value-objects");
var CreateAcctSvc = /** @class */ (function () {
    function CreateAcctSvc(querySvc, inputs, sessionID) {
        console.log('constructor of create account', inputs);
        this.querySvc = querySvc;
        this.inputs = R.UserInputs.fromJSON(inputs);
        this.sessionID = sessionID;
        this.user;
        this.hash = this.hash.bind(this);
        this.randomString = this.randomString.bind(this);
    }
    CreateAcctSvc.prototype.hash = function () {
        return bcrypt.hash(this.inputs.password, 10);
    };
    CreateAcctSvc.prototype.formatInputs = function (hashPass) {
        var hashPassUserInputs;
        hashPassUserInputs = [
            this.inputs.email,
            this.inputs.phone,
            this.inputs.name,
            hashPass,
            'user'
        ];
        return hashPassUserInputs;
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
                reject(err);
            }
            resolve(string);
        });
    };
    CreateAcctSvc.prototype.createAcct = function () {
        var _this = this;
        return E.passChecker(this.inputs.password)
            .then(function () { return _this.hash(); })
            .then(function (hash) { return _this.querySvc.insertUser(_this.formatInputs(hash)); })
            .then(function (user) {
            _this.user = user;
            return _this.randomString();
        })
            .then(function (nonce) { _this.querySvc.insertNonce([_this.user.user_uuid, nonce]); })
            .then(function () { _this.querySvc.insertSession([_this.user.user_uuid, _this.sessionID]); })
            .then(function (sessionInDB) { _this.querySvc.insertSettings([_this.user.user_uuid]); });
    };
    return CreateAcctSvc;
}());
exports.default = CreateAcctSvc;
//# sourceMappingURL=logic-accounts.js.map