"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var r = require("../services/value-objects");
var gOrgs = express.Router();
// gOrgs.route('/orgs')
//   .post((req, res) => {
//     // all happens via admin
//   })
//   .get((req, res) => {
//     let user = r.UserSession.fromJSON(req.session.user)
//     req.aQuery.selectOrgs([])
//       .then((result) => {
//         let organizationContent = result.rows;
//         for (let i = 0; i < organizationContent.length; i++) {
//           let org = r.OrgsDB.fromJSON(organizationContent[i]) // at least it catches problems
//           organizationContent[i].email = user.email;
//           // organizationContent[i].frontEndID = idMaker(organizationContent[i].name)
//         }
//         res.render('guest/organizations', {
//           organizationContent:organizationContent,
//           email: user.email
//         })
//       })
//       .catch((err) => {
//         console.log(err);
//         res.render('guest/organizations', { dbError: err });
//       });
//   })
gOrgs.route('/')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    req.aQuery.selectOrgs([])
        .then(function (result) {
        var organizationContent = result.rows;
        for (var i = 0; i < organizationContent.length; i++) {
            var org = r.OrgsDB.fromJSON(organizationContent[i]); // at least it catches problems
            // organizationContent[i].frontEndID = idMaker(organizationContent[i].name)
        }
        res.render('guest/organizations', {
            organizationContent: organizationContent
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('guest/organizations', { dbError: err });
    });
});
exports.default = gOrgs;
//# sourceMappingURL=guest-organizations.js.map