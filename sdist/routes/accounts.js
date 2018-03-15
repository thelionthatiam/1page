"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helper = require("../functions/helpers");
var bcrypt = require("bcrypt");
var database_1 = require("../middleware/database");
var router = express.Router();
//to sign up page
router.get('/new-account', function (req, res, next) {
    res.render('new-account', { success: false });
});
router.post('/delete', function (req, res, next) {
    res.render('login', {
        accountDelete: true,
    });
});
router.route('/accounts')
    .post(function (req, res) {
    console.log('BODY', req.body);
    var inputs = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
        uuid: '',
        nonce: ''
    };
    bcrypt.hash(inputs.password, 10)
        .then(function (hash) {
        inputs.password = hash;
        var query = 'INSERT INTO users(email, phone, password, name) VALUES($1, $2, $3, $4) RETURNING *';
        var input = [inputs.email, inputs.phone, inputs.password, inputs.name];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        inputs.uuid = result.rows[0].user_uuid;
        return helper.randomString;
    })
        .then(function (string) {
        return bcrypt.hash(string, 10);
    })
        .then(function (hash) {
        inputs.nonce = hash;
        return database_1.db.query('INSERT INTO nonce(user_uuid, nonce) VALUES ($1, $2) RETURNING *', [inputs.uuid, inputs.nonce]);
    })
        .then(function (result) {
        var query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
        var input = [inputs.uuid, req.sessionID];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        return database_1.db.query('INSERT INTO cart (user_uuid, card_number) VALUES ($1, $2)', [inputs.uuid, '42424242424242']);
    })
        .then(function (result) {
        return database_1.db.query('INSERT INTO user_settings(user_uuid) VALUES ($1)', [inputs.uuid]);
    })
        .then(function (result) {
        return database_1.db.query('UPDATE users SET permission = $1 WHERE user_uuid = $2', ['user', inputs.uuid]);
    })
        .then(function (result) {
        console.log(result.rows);
        res.render('new-account', {
            success: true,
            email: inputs.email,
            phone: inputs.phone,
        });
    })
        .catch(function (err) {
        console.log(err);
        database_1.db.query('DELETE FROM users WHERE user_uuid = $1', [inputs.uuid])
            .then(function (result) {
            return database_1.db.query('DELETE FROM nonce WHERE user_uuid = $1', [inputs.uuid]);
        })
            .then(function (result) {
            return database_1.db.query('DELETE FROM cart WHERE user_uuid = $1', [inputs.uuid]);
        })
            .then(function (result) {
            return database_1.db.query('DELETE FROM session WHERE user_uuid = $1', [inputs.uuid]);
        })
            .then(function (result) {
            return database_1.db.query('DELETE FROM user_settings WHERE user_uuid = $1', [inputs.uuid]);
        })
            .then(function (result) {
            res.render('new-account', {
                dbError: err.message
            });
        })
            .catch(function (err) {
            console.log(err);
            res.json(err);
        });
    });
});
module.exports = router;
//# sourceMappingURL=accounts.js.map