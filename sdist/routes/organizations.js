"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var allOrgs = express.Router();
allOrgs.route('/all')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    var email;
    res.locals.loggedIn ? email = req.session.user.email : email = undefined;
    req.querySvc.getOrgs([])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            organizationContent[i].loggedIn = res.locals.loggedIn;
            organizationContent[i].email = email;
        }
        res.render('all-organizations', {
            organizationContent: organizationContent,
            loggedIn: res.locals.loggedIn
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('all-organizations', { dbError: err });
    });
});
exports.default = allOrgs;
//# sourceMappingURL=organizations.js.map