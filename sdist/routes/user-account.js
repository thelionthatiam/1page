"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logic_authorization_1 = require("../logic/logic-authorization");
var logic_profile_1 = require("../logic/logic-profile");
var profile = express.Router();
profile.route('/')
    .get(function (req, res) { return res.render('account/my-account'); })
    .delete(function (req, res) {
    req.ProfileSvc = new logic_profile_1.default(req.querySvc, req.session.user, null);
    req.ProfileSvc.deleteAccount()
        .then(function () { return logic_authorization_1.destroySession(req.session); })
        .then(function () { return res.redirect('/'); })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/my-account', { dbError: err });
    });
});
profile.route('/contact')
    .get(function (req, res) { return res.render('account/my-contact'); })
    .put(function (req, res) {
    req.ProfileSvc = new logic_profile_1.default(req.querySvc, req.session.user, req.body);
    req.ProfileSvc.changeContact()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email); })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/my-contact', { dbError: err });
    });
});
profile.route('/password')
    .get(function (req, res) { return res.render('account/new-password'); })
    .post(function (req, res) {
    req.ProfileSvc = new logic_profile_1.default(req.querySvc, req.session.user, req.body);
    req.ProfileSvc.changePassword()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email); })
        .catch(function (err) {
        console.log(err);
        res.render('account/new-password', { dbError: err });
    });
});
exports.default = profile;
//# sourceMappingURL=user-account.js.map