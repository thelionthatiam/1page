"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var nonZeroRow = function (user, result, object) { return result.rowCount > 0 ? user[object] = result.rows : user[object] = 'n/a'; };
router.get('/all', function (req, res, next) {
    var user = {};
    req.querySvc.getOrgsViaEmail([req.session.user.uuid])
        .then(function (result) {
        nonZeroRow(user, result, "orgs");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.querySvc.getAlarms([req.session.user.uuid]);
    })
        .then(function (result) {
        nonZeroRow(user, result, "alarms");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.querySvc.getSettingsViaEmail([req.session.user.uuid]);
    })
        .then(function (result) {
        nonZeroRow(user, result, "settings");
        console.log('^^^^^^^^^^^^^^^');
        console.log(user);
        console.log('^^^^^^^^^^^^^^^');
        return req.querySvc.getUser([req.session.user.uuid]);
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
//# sourceMappingURL=user-all.js.map