"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var nonZeroRow = function (user, result, object) { return result.rowCount > 0 ? user[object] = result.rows : user[object] = 'n/a'; };
router.get('/all', function (req, res, next) {
    var user = {};
    req.aQuery.selectUserOrgs([req.session.user.uuid])
        .then(function (result) {
        nonZeroRow(user, result, "orgs");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.aQuery.selectAlarms([req.session.user.uuid]);
    })
        .then(function (result) {
        nonZeroRow(user, result, "alarms");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.aQuery.selectUserSettings([req.session.user.uuid]);
    })
        .then(function (result) {
        nonZeroRow(user, result, "settings");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.aQuery.selectAuthenticatedUser([req.session.user.uuid]);
    })
        .then(function (result) {
        nonZeroRow(user, result, "profile");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(user);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
        res.json(user);
    })
        .catch(function (err) { return console.log(err); });
});
module.exports = router;
//# sourceMappingURL=all.js.map