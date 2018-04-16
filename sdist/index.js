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
var push_notifications_1 = require("./routes/push-notifications");
var index = express.Router();
index.use('/', guest_authorization_1.default);
index.use('/', guest_accounts_1.default);
index.use('/', push_notifications_1.default);
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));
index.use('/app*', choose_layout_1.default);
index.use('/app/orgs', organizations_1.default);
// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));
index.use('/app/accounts/:email', user_account_1.default);
index.use('/app/accounts/:email', user_all_1.default);
index.use('/app/accounts/:email/alarms', user_alarms_1.default);
index.use('/app/accounts/:email/orgs', user_organizations_1.default);
index.use('/app/accounts/:email/settings', user_settings_1.default);
index.use('/app/accounts/:email/payment', user_payment_1.default);
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/transactions'));
// subscribe to push this is working poorly
index.post('/subscribe', function (req, res) {
    // console.log('this is from the subscribe route', req.body, req.session.user)
    req.querySvc.checkUserSubscriptions([req.session.user.uuid])
        .then(function (boolean) {
        if (boolean) {
            console.log('no record of this users subscription');
            res.setHeader('Content-Type', 'applications/json');
            res.send(JSON.stringify({ data: { success: true, inDB: false } }));
        }
        else {
            console.log('this user is already subscribed');
            res.setHeader('Content-Type', 'applications/json');
            res.send(JSON.stringify({ data: { success: true, inDB: true } }));
        }
    })
        .catch(function (e) {
        console.log(e);
        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            error: {
                id: 'unable-to-save-subscription',
                message: 'The subscription was recieved but we were unable to save it to our database.',
                e: e
            }
        }));
    });
    // check if user already has subscription
    // if not, add 
    // else move on to check
    // let uuid = '58354c53-18cf-4f36-bdea-571d5e9d59df'
    // if (req.session.user.uuid === 'user') {
    //     uuid = req.session.user.uuid
    // }
    // req.querySvc.insertPushSubs([uuid, req.body.keys.p256dh, req.body.keys.auth, req.body.expirationTime, req.body.endpoint])
    //     .then(() => {
    //         res.setHeader('Content-Type', 'applications/json')
    //         res.send(JSON.stringify({ data: { success: true } }))
    //     })
    //     .catch(e => {
    //         console.log(e)
    //         res.status(500)
    //         res.setHeader('Content-Type', 'application/json')
    //         res.send(JSON.stringify({
    //             error: {
    //                 id: 'unable-to-save-subscription',
    //                 message: 'The subscription was recieved but we were unable to save it to our database.',
    //                 e: e
    //             }
    //         }))
    //     })
});
// HOME
index.get('/', function (req, res) {
    res.render('home', { home: true });
});
// TO LOGIN PAGE
index.get('/to-login', function (req, res) {
    res.render('login');
});
// APP
index.get('/app', function (req, res) {
    return req.session.user ? res.redirect('app/account') : res.redirect('app/guest');
});
index.get('/app/guest', function (req, res) {
    res.render('guest/app');
});
index.get('/app/account', function (req, res) {
    req.session.user ? res.render('app') : res.redirect('/app/guest');
});
// NO JS ALARMS
index.get('/app/guest/alarms', function (req, res) {
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
index.get('/test', function (req, res) {
    res.render('test-page');
});
index.get('/dummy-route', function (req, res) {
    res.render('dummy');
});
exports.default = index;
//# sourceMappingURL=index.js.map