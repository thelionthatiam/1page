"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var r = require("../resources/value-objects");
var helpers_1 = require("../functions/helpers");
var router = express.Router();
router.route('/organizations')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    var user = r.UserSession.fromJSON(req.session.user);
    req.aQuery.selectOrgs([])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            var org = r.OrgsDB.fromJSON(organizationContent[i]); // at least it catches problems
            organizationContent[i].email = user.email;
            organizationContent[i].frontEndID = helpers_1.idMaker(organizationContent[i].name);
        }
        res.render('shopping/organizations', {
            organizationContent: organizationContent,
            email: user.email
        });
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render('shopping/organizations', { dbError: userError });
    });
});
router.route('/app/guest/orgs')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    var user = r.UserSession.fromJSON(req.session.user);
    req.aQuery.selectOrgs([])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            var org = r.OrgsDB.fromJSON(organizationContent[i]); // at least it catches problems
            organizationContent[i].frontEndID = helpers_1.idMaker(organizationContent[i].name);
        }
        res.json(organizationContent);
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render('shopping/organizations', { dbError: userError });
    });
});
module.exports = router;
//# sourceMappingURL=organizations.js.map