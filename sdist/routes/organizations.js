import * as express from 'express';
import * as r from '../resources/value-objects';
import { dbErrTranslator, idMaker } from '../functions/helpers';
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
            organizationContent[i].frontEndID = idMaker(organizationContent[i].name);
        }
        res.render('shopping/organizations', {
            organizationContent: organizationContent,
            email: user.email
        });
    })
        .catch(function (err) {
        console.log(err);
        var userError = dbErrTranslator(err.message);
        res.render('shopping/organizations', { dbError: userError });
    });
});
module.exports = router;
//# sourceMappingURL=organizations.js.map