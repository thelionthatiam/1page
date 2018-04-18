"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logic_settings_1 = require("../logic/logic-settings");
var settings = express.Router();
// group routes
settings.route('/alarm-prices')
    .get(function (req, res) {
    // validate user at session check
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, null);
    req.SettingsSvc.getUserSettingsAndRender()
        .then(function (renderObj) {
        res.render('settings/alarm-prices', renderObj);
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
})
    .put(function (req, res) {
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, req.body);
    req.SettingsSvc.changeAlarmPrices()
        .then(function () {
        res.redirect('/app/accounts/' + req.session.user.email + '/settings/alarm-prices');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.route('/alarm-setting')
    .get(function (req, res) {
    // validate user at session check
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, null);
    req.SettingsSvc.getUserSettingsAndRender()
        .then(function (renderObj) {
        res.render('settings/alarm-settings', renderObj);
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
})
    .put(function (req, res) {
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, req.body);
    req.SettingsSvc.changeAlarmSettings()
        .then(function () {
        res.redirect('/app/accounts/' + req.session.user.email + '/settings/alarm-settings');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
// individual routes
settings.route('/')
    .get(function (req, res) {
    // validate user at session check
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, null);
    req.SettingsSvc.getUserSettingsAndRender()
        .then(function (renderObj) {
        res.render('settings', renderObj);
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/payment-scheme', function (req, res) {
    var inputs = { payment_scheme: req.body.payment_scheme };
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, inputs);
    req.SettingsSvc.changePaymentScheme()
        .then(function () {
        res.redirect('/app/accounts/' + req.session.user.email + '/settings');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/monthly-max', function (req, res) {
    var inputs = { month_max: req.body.month_max };
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, inputs);
    req.SettingsSvc.changeMonthMax()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/settings'); })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/price-per-snooze', function (req, res) {
    var inputs = { snooze_price: req.body.snooze_price };
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, inputs);
    req.SettingsSvc.changePricePerSnooze()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/settings'); })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/price-per-dismiss', function (req, res) {
    var inputs = { dismiss_price: req.body.dismiss_price };
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, inputs);
    req.SettingsSvc.changePricePerDismiss()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/settings'); })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/quiet-after', function (req, res) {
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, req.body);
    req.SettingsSvc.changeQuietAfter()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/settings'); })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
settings.put('/snooze-length', function (req, res) {
    req.SettingsSvc = new logic_settings_1.default(req.querySvc, req.session.user, req.body);
    req.SettingsSvc.changeSnoozeDuration()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email + '/settings'); })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
exports.default = settings;
//# sourceMappingURL=user-settings.js.map