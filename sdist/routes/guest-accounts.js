"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_accounts_1 = require("../logic/logic-accounts");
var error_handling_1 = require("../services/error-handling");
var express = require("express");
var accts = express.Router();
//to sign up page
accts.get('/new-account', function (req, res) { return res.render('new-account'); });
// this seems to do nothing
accts.route('/accounts')
    .post(function (req, res) {
    var inputs = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
    };
    req.CreateAcctSvc = new logic_accounts_1.default(req.querySvc, inputs, req.sessionID);
    req.CreateAcctSvc.createAcct()
        .then(function (result) {
        res.render('login');
    })
        .catch(function (err) {
        var stack = new Error().stack;
        console.log('error', err, 'stack', stack);
        res.render('new-account', {
            dbError: error_handling_1.dbErrTranslator(err)
        });
    });
});
exports.default = accts;
//# sourceMappingURL=guest-accounts.js.map