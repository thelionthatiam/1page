"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../middleware/database"); // this goes away
var logic_organizations_1 = require("../logic/logic-organizations");
var R = require("../services/value-objects");
var orgs = express.Router();
orgs.route('/')
    .post(function (req, res) {
    // should valideate user session in session check middelware
    req.OrgSvc = new logic_organizations_1.default(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid);
    req.OrgSvc.addToUserOrgs()
        .then(function () {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs');
    })
        .catch(function (error) {
        console.log(error);
        res.render('account/organizations', error);
    });
})
    .get(function (req, res) {
    // should valideate user session in session check middelware
    req.OrgSvc = new logic_organizations_1.default(req.querySvc, R.UserSession.fromJSON(req.session.user), null);
    req.OrgSvc.getUserOrgsAndActiveOrg()
        .then(function (userOrgDataForRender) {
        res.render('account/organizations', userOrgDataForRender);
    })
        .catch(function (err) {
        console.log(err);
        res.render('account/organizations', { dbError: err });
    });
});
orgs.route('/:sku')
    .put(function (req, res) {
    req.OrgSvc = new logic_organizations_1.default(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid);
    req.OrgSvc.setDefaultOrg()
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
})
    .delete(function (req, res) {
    var org_uuid = req.body.org_uuid;
    database_1.db.query('DELETE FROM user_orgs WHERE user_uuid = $1 AND org_uuid = $2', [req.session.user.uuid, org_uuid])
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/');
    })
        .catch(function (error) {
        console.log(error);
        res.render('accounts/organizations', { error: error, dbError: 'try refreshing the page' });
    });
});
orgs.route('/:sku/remove-default')
    .put(function (req, res) {
    req.OrgSvc = new logic_organizations_1.default(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid);
    req.OrgSvc.unsetDefaultOrg()
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error', { errMessage: error });
    });
});
exports.default = orgs;
//# sourceMappingURL=user-organizations.js.map