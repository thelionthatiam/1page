"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var guest_authorization_1 = require("./routes/guest-authorization");
var guest_accounts_1 = require("./routes/guest-accounts");
var choose_layout_1 = require("./middleware/choose-layout");
var organizations_1 = require("./routes/organizations");
var user_account_1 = require("./routes/user-account");
var user_all_1 = require("./routes/user-all");
var user_alarms_1 = require("./routes/user-alarms");
var user_organizations_1 = require("./routes/user-organizations");
var user_settings_1 = require("./routes/user-settings");
var user_payment_1 = require("./routes/user-payment");
var router = express.Router();
router.use('/', guest_authorization_1.default);
router.use('/', guest_accounts_1.default);
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));
router.use('/app*', choose_layout_1.default);
router.use('/app/orgs', organizations_1.default);
// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));
router.use('/app/accounts/:email', user_account_1.default);
router.use('/app/accounts/:email', user_all_1.default);
router.use('/app/accounts/:email/alarms', user_alarms_1.default);
router.use('/app/accounts/:email/orgs', user_organizations_1.default);
router.use('/app/accounts/:email/settings', user_settings_1.default);
router.use('/app/accounts/:email/payment', user_payment_1.default);
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/transactions'));
// HOME
router.get('/', function (req, res) {
    res.render('home', { home: true });
});
// TO LOGIN PAGE
router.get('/to-login', function (req, res) {
    res.render('login');
});
// APP
router.get('/app', function (req, res) {
    return req.session.user ? res.redirect('app/account') : res.redirect('app/guest');
});
router.get('/app/guest', function (req, res) {
    res.render('guest/app');
});
router.get('/app/account', function (req, res) {
    req.session.user ? res.render('app') : res.redirect('/app/guest');
});
// NO JS ALARMS
router.get('/app/guest/alarms', function (req, res) {
    res.render('guest/alarms');
});
// TEST
var dummy = {
    "video": [
        {
            "id": "12312412312",
            "name": "Ecuaciones Diferenciales",
            "url": "/video/math/edo/12312412312",
            "author": {
                "data": [
                    {
                        "name_author": "Alejandro Morales",
                        "uri": "/author/alejandro-morales",
                        "type": "master"
                    }
                ]
            }
        }
    ]
};
router.get('/test', function (req, res) {
    res.render('test-page');
});
router.get('/dummy-route', function (req, res) {
    res.render('dummy');
});
module.exports = router;
//# sourceMappingURL=index.js.map