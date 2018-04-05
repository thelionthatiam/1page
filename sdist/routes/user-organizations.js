"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../middleware/database");
var logic_organizations_1 = require("../logic/logic-organizations");
var R = require("../services/value-objects");
var orgs = express.Router();
orgs.route('/')
    .post(function (req, res) {
    var org = req.body.org_uuid;
    var userSession = R.UserSession.fromJSON(req.session.user);
    // db.query('SELECT * FROM user_orgs WHERE user_uuid = $1', [req.session.user.uuid])
    // .then((result) => {
    //   userOrgs = result.rows
    //   for (let i = 0; i < userOrgs.length; i++) {
    //     if (userOrgs[i].org_uuid === org) {
    //       throw new Error('You have already added this org!')
    //     }
    //   }
    //   if (result.rowCount >= 2) {
    //     throw new Error('You can only save 2 organizations to favorites right now.')
    //   }  else {
    //     console.log(req.session.user.uuid, org)
    //     db.query('INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)', [req.session.user.uuid, org])
    //   }
    // })
    req.OrgSvc = new logic_organizations_1.OrgSvc(req.querySvc, userSession, org);
    req.OrgSvc.addToUserOrgs()
        .then(function () {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs');
    })
        .catch(function (error) {
        console.trace('HEY YOU');
        console.log(error);
        res.render('account/organizations', error);
    });
})
    .get(function (req, res) {
    var name, description, cause, link, defaultSet = false, img, uuid;
    var email = req.session.user.email;
    database_1.db.query('SELECT x.org_uuid, name, description, link, cause, active, img, org_sku, user_uuid FROM orgs x INNER JOIN user_orgs y ON x.org_uuid = y.org_uuid AND (user_uuid = $1)', [req.session.user.uuid])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            organizationContent[i].email = email;
            organizationContent[i].user_orgs = true;
            organizationContent[i].loggedIn = res.locals.loggedIn;
            if (organizationContent[i].active) {
                defaultSet = true;
                name = organizationContent[i].name;
                description = organizationContent[i].description;
                link = organizationContent[i].link;
                cause = organizationContent[i].cause;
                img = organizationContent[i].img;
                uuid = organizationContent[i].org_uuid;
            }
        }
        // console.log('get user organizations', organizationContent)
        res.render('account/organizations', {
            organizationContent: organizationContent,
            email: email,
            name: name,
            description: description,
            cause: cause,
            link: link,
            defaultSet: defaultSet,
            img: img,
            uuid: uuid
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('account/organizations', { dbError: err });
    });
});
// MUST FLIP BOOL
orgs.route('/:sku')
    .put(function (req, res) {
    var addingOrg = req.body.org_uuid;
    // console.log('put change default donation', addingOrg)
    database_1.db.query('SELECT FROM user_orgs WHERE org_uuid = $1', [addingOrg])
        .then(function (result) {
        if (result.rowCount === 0) {
            console.log('case where the org isnt even added to the user orgs yet');
            return database_1.db.query('INSERT INTO user_orgs (org_uuid, active, user_uuid) VALUES ($1, $2, $3)', [addingOrg, true, req.session.user.uuid]);
        }
        else {
            database_1.db.query('SELECT active, org_uuid FROM user_orgs where active = $1 AND user_uuid = $2', [true, req.session.user.uuid])
                .then(function (result) {
                if (result.rowCount === 0) {
                    // console.log('case where nothing is saved to the database with active')
                    // console.log('case where they are different')
                    return database_1.db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
                        .then(function (result) {
                        // console.log('all are set to false')
                        return database_1.db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [true, req.session.user.uuid, addingOrg]);
                    });
                }
                else if (result.rows[0].org_uuid === addingOrg) {
                    // console.log('case where uuid is the same as being added')
                    return database_1.db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [false, req.session.user.uuid, addingOrg]);
                }
                else {
                    // console.log('case where they are different')
                    return database_1.db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
                        .then(function (result) {
                        // console.log('all are set to false')
                        return database_1.db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [true, req.session.user.uuid, addingOrg]);
                    });
                }
            });
        }
    })
        .then(function (result) {
        console.log('result res redirect');
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/');
    })
        .catch(function (error) {
        console.log('err case');
        console.log(error);
        res.render('accounts/organizations', error);
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
        res.render('accounts/organizations', error);
    });
});
exports.default = orgs;
//# sourceMappingURL=user-organizations.js.map