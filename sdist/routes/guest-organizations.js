"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var allOrgs = express.Router();
allOrgs.route('/all')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    req.querySvc.getOrgs([])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            organizationContent[i].loggedIn = res.locals.loggedIn;
        }
        res.render('account/all-organizations', {
            organizationContent: organizationContent,
            loggedIn: res.locals.loggedIn
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('account/all-organizations', { dbError: err });
    });
});
exports.default = allOrgs;
//# sourceMappingURL=guest-organizations.js.map