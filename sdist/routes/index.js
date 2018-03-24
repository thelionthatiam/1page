"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.use('/', require('./authorization'));
router.use('/', require('./email'));
router.use('/', require('./accounts'));
router.use('/', require('./shopping'));
router.use('/', require('./organizations'));
router.use('/admin', require('./admin/products'));
router.use('/admin', require('./admin/coupons'));
router.use('/admin', require('./admin/accounts'));
router.use('/accounts', require('./account'));
router.use('/accounts/:email', require('./account/alarms'));
router.use('/accounts/:email', require('./account/payment'));
router.use('/accounts/:email', require('./account/organizations'));
router.use('/accounts/:email', require('./account/cart'));
router.use('/accounts/:email', require('./account/coupons'));
router.use('/accounts/:email', require('./account/orders'));
router.use('/accounts/:email', require('./account/settings'));
router.use('/accounts/:email', require('./account/transactions'));
// HOME
router.get('/', function (req, res, next) {
    res.render('home');
});
// APP
router.get('/app', function (req, res) {
    res.render('app');
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
router.get('/splash', function (req, res, next) {
    res.render('splash');
});
router.get('/home', function (req, res) {
    res.render('home', {
        email: req.session.user.email,
        name: req.session.user.name
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map