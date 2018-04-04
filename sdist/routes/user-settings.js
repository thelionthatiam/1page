"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var merge_1 = require("../services/merge");
var database_1 = require("../middleware/database");
var settings = express.Router();
settings.route('/')
    .get(function (req, res) {
    database_1.db.query('SELECT * FROM user_settings WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        var renderObj = merge_1.deepMerge(result.rows[0], req.session.user);
        res.render('account/settings', renderObj);
    })
        .catch(function (error) {
        console.log(error);
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    });
});
settings.put('/payment-scheme', function (req, res) {
    var input = [
        req.body.payment_scheme,
        req.session.user.uuid
    ];
    var query = 'UPDATE user_settings SET payment_scheme = $1 WHERE user_uuid = $2';
    database_1.db.query(query, input)
        .then(function (result) {
        console.log(result);
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    })
        .catch(function (error) {
        console.log(error);
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    });
});
settings.put('/monthly-max', function (req, res) {
    var input = [
        req.body.month_max,
        req.session.user.uuid
    ];
    var query = 'UPDATE user_settings SET month_max = $1 WHERE user_uuid = $2';
    var renderObj;
    database_1.db.query('SELECT * FROM user_settings WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        renderObj = merge_1.deepMerge(result.rows[0], req.session.user);
        if (req.body.month_max < result.rows[0].dismiss_price) {
            throw new Error('You should probably select a monthly max that is more than the dismiss price');
        }
        else {
            return database_1.db.query(query, input);
        }
    })
        .then(function (result) {
        console.log(result);
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    })
        .catch(function (error) {
        console.log(error);
        error = { error: error };
        renderObj = merge_1.deepMerge(renderObj, error);
        res.render('account/settings', renderObj);
    });
});
settings.put('/price-per-snooze', function (req, res) {
    var input = [
        req.body.snooze_price,
        req.session.user.uuid
    ];
    var query = 'UPDATE user_settings SET snooze_price = $1 WHERE user_uuid = $2';
    var renderObj;
    database_1.db.query('SELECT * FROM user_settings WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        renderObj = merge_1.deepMerge(result.rows[0], req.session.user);
        if (req.body.snooze_price > result.rows[0].dismiss_price) {
            throw new Error('You should probably select a snooze price that is less than the dismiss price');
        }
        else {
            return database_1.db.query(query, input);
        }
    })
        .then(function (result) {
        console.log(result);
        res.redirect('/accounts/' + req.session.user.email + '/settings');
    })
        .catch(function (error) {
        console.log(error);
        error = { error: error };
        renderObj = merge_1.deepMerge(renderObj, error);
        res.render('account/settings', renderObj);
    });
});
settings.put('/price-per-dismiss', function (req, res) {
    var input = [
        req.body.dismiss_price,
        req.session.user.uuid
    ];
    var query = 'UPDATE user_settings SET dismiss_price = $1 WHERE user_uuid = $2';
    var renderObj;
    database_1.db.query('SELECT * FROM user_settings WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        renderObj = merge_1.deepMerge(result.rows[0], req.session.user);
        if (req.body.dismiss_price > result.rows[0].month_max) {
            throw new Error('You should probably select a dismiss price that is less than the dismiss price');
        }
        else {
            return database_1.db.query(query, input);
        }
    })
        .then(function (result) {
        console.log(result);
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    })
        .catch(function (error) {
        console.log(error);
        error = { error: error };
        renderObj = merge_1.deepMerge(renderObj, error);
        res.render('account/settings', renderObj);
    });
});
exports.default = settings;
//# sourceMappingURL=user-settings.js.map