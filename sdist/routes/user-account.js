"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bcrypt = require("bcrypt");
var database_1 = require("../middleware/database");
var profile = express.Router();
profile.route('/')
    .get(function (req, res) {
    console.log('get my acount');
    res.render('account/account/my-account', {
        email: req.session.user.email,
    });
})
    .delete(function (req, res) {
    database_1.db.query('DELETE FROM users WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        res.render('home', {
            message: "account was deleted, please make a new one to enter"
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/account/my-account', { dbError: err.stack });
    });
});
profile.route('/contact')
    .get(function (req, res) {
    res.render('account/account/my-contact', {
        email: req.session.user.email,
        phone: req.session.user.phone
    });
})
    .put(function (req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    var query = 'UPDATE users SET (email, phone) = ($1, $2) WHERE user_uuid = $3';
    var input = [email, phone, req.session.user.uuid];
    database_1.db.query(query, input)
        .then(function (result) {
        req.session.user.email = email;
        req.session.user.phone = phone;
        res.render('account/account/my-account', {
            title: "account updated",
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/account/my-account', { dbError: err.stack });
    });
});
profile.route('/password')
    .get(function (req, res) {
    res.render('account/account/new-password', {
        email: req.session.user.email
    });
})
    .post(function (req, res) {
    var inputs = {
        password: req.body.password,
        oldPassword: req.body.oldPassword
    };
    database_1.db.query("SELECT * FROM users WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        console.log(result);
        return bcrypt.compare(req.body.oldPassword, result.rows[0].password);
    })
        .then(function (result) {
        if (result === false) {
            throw new Error('Password incorrect');
        }
        else {
            return bcrypt.hash(inputs.password, 10);
        }
    })
        .then(function (hash) {
        inputs.password = hash;
        var query = 'UPDATE users SET password = $1 WHERE user_uuid = $2';
        var input = [inputs.password, req.session.user.uuid];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        res.render('account/account/new-password', {
            success: true,
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render('account/account/new-password', { dbError: error });
    });
});
exports.default = profile;
//# sourceMappingURL=user-account.js.map