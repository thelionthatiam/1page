"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authorization_1 = require("./guest/authorization");
var choose_layout_1 = require("./middleware/choose-layout");
var router = express.Router();
router.use('/', authorization_1.default);
router.use('/', require('./guest/accounts'));
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));
router.use('/app*', choose_layout_1.default);
router.use('/app/guest/alarms', require('./guest/alarms'));
router.use('/app/guest/orgs', require('./guest/organizations'));
// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));
// router.use('/accounts', require('./account'));
router.use('/app/accounts/:email', require('./account/all'));
router.use('/app/accounts/:email/alarms', require('./account/alarms'));
router.use('/app/accounts/:email/orgs', require('./account/organizations'));
// router.use('/accounts/:email', require('./account/payment'));
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/settings'));
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
    req.session.user ? res.render('account/app') : res.redirect('/app/guest');
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
    res.render('test-page', {
        dummy: JSON.stringify(dummy)
    });
});
router.get('/dummy-route', function (req, res) {
    res.render('dummy');
});
module.exports = router;
//# sourceMappingURL=index.js.map