"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.use('/', require('./guest/authorization'));
router.use('/', require('./guest/accounts'));
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));
router.use('/app/guest/alarms', require('./guest/alarms'));
router.use('/app/guest/orgs', require('./guest/organizations'));
// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));
// router.use('/accounts', require('./account'));
router.use('/app/accounts/:email/alarms', require('./account/alarms'));
router.use('/app/accounts/:email/orgs', require('./account/organizations'));
// router.use('/accounts/:email', require('./account/payment'));
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/settings'));
// router.use('/accounts/:email', require('./account/transactions'));
// HOME
router.get('/', function (req, res, next) {
    res.render('home');
});
// APP
router.get('/app', function (req, res) {
    if (req.session.user) {
        res.redirect('app/account');
    }
    else {
        res.redirect('app/guest');
    }
});
router.get('/app/account', function (req, res) {
    console.log('app account redirect');
    res.render('account/app');
});
router.get('/app/guest', function (req, res) {
    console.log('app guest redirect');
    res.render('guest/app');
});
// PERMISSION GETTER
router.get('/permission', function (req, res) {
    if (typeof req.session.user === 'undefined') {
        res.json(JSON.stringify({ permission: 'guest' }));
    }
    else {
        res.json(JSON.stringify(req.session.user));
    }
});
router.get('/dummy-route', function (req, res) {
    res.render('dummy');
});
// TO LOGIN PAGE
router.get('/to-login', function (req, res) {
    res.render('login');
});
// NEEDS GUEST AND USER BEHAVIOR
router.get('/contact', function (req, res, next) {
    res.render('contact');
});
module.exports = router;
//# sourceMappingURL=index.js.map