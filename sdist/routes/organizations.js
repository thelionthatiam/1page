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
    console.log('all orgs get route running');
    res.locals.loggedIn ? email = req.session.user.email : email = undefined;
    req.querySvc.getOrgs([])
        .then(function (orgs) {
        for (var i = 0; i < orgs.length; i++) {
            orgs[i].loggedIn = res.locals.loggedIn;
            orgs[i].email = email;
        }
        res.render('all-organizations', {
            organizationContent: orgs
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('all-organizations', { dbError: err });
    });
});
exports.default = allOrgs;
//# sourceMappingURL=organizations.js.map