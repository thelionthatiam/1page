"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_authorization_1 = require("../logic/logic-authorization");
var express = require("express");
var auth = express.Router();
auth.post('/authorized', function (req, res) {
    var inputs = {
        email: req.body.email,
        password: req.body.password
    };
    logic_authorization_1.regenerateSession(req.session)
        .then(function () {
        req.AuthSvc = new logic_authorization_1.default(req.querySvc, inputs, req.sessionID);
        return req.AuthSvc.doAuth();
    })
        .then(function (userDataForSession) {
        req.session.user = userDataForSession;
        res.redirect('/app');
    })
        .catch(function (err) {
        console.log(err);
        res.render('login', { dbError: err });
    });
});
auth.post('/log-out', function (req, res) {
    logic_authorization_1.updateToInactiveSessionID(req.querySvc, req.session.user_uuid)
        .then(function () { return logic_authorization_1.destroySession(req.session); })
        .then(function () {
        res.redirect('/');
    })
        .catch(function (err) {
        console.log(err);
        res.render('error', { errName: err.message, errMessage: null });
    });
});
exports.default = auth;
//# sourceMappingURL=guest-authorization.js.map