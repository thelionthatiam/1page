"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const helper = require("../functions/helpers");
const app = express();
//to sign up page
app.get('/to-create', function (req, res, next) {
    console.log('/to-create');
    res.render('create-account', { success: false });
});
//sends user information to database,
app.post('/create', function (req, res, next) {
    console.log('/create');
    var thisPage = 'create-account';
    var nextPage = 'create-account';
    var inputs = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        user_uuid: "",
        nonce: ""
    };
    helper.passHash(inputs.password, function (err, hash) {
        if (err) {
            helper.genError(res, thisPage, err); // u
        }
        else {
            inputs.password = hash;
            req.querySvc.insertNewUser(inputs, function (err, result) {
                if (err) {
                    helper.dbError(res, thisPage, err);
                }
                else {
                    helper.makeHashedString(function (err, hash) {
                        if (err) {
                            helper.genError(res, thisPage, "Password encryption error"); // u
                        }
                        else {
                            inputs.user_uuid = result.rows[0].user_uuid;
                            inputs.nonce = hash;
                            req.querySvc.insertNewNonce(inputs, function (err, result) {
                                if (err) {
                                    helper.dbError(res, thisPage, err); // u
                                }
                                else {
                                    res.render(nextPage, {
                                        success: true,
                                        email: inputs.email,
                                        phone: inputs.phone,
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
app.post('/delete', function (req, res, next) {
    console.log('/delete');
    var thisPage = 'account-actions';
    var nextPage = 'login';
    res.render(nextPage, {
        accountDelete: true,
    });
});
module.exports = app;
//# sourceMappingURL=account.js.map