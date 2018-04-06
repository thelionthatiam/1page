import * as express from 'express';
import { db } from '../middleware/database'; // this goes away
import OrgSvc from '../logic/logic-organizations';
import * as R from '../services/value-objects';
const orgs = express.Router();

orgs.route('/')
  .post((req, res) => {
    // should valideate user session in session check middelware
    req.OrgSvc = new OrgSvc(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid)
    req.OrgSvc.addToUserOrgs()
      .then(() => {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs')
      })
      .catch((error) => {
        console.log(error);
        res.render('account/organizations', error)
      })
  })
  .get((req, res) => {
      // should valideate user session in session check middelware
      req.OrgSvc = new OrgSvc(req.querySvc, R.UserSession.fromJSON(req.session.user), null)

      req.OrgSvc.getUserOrgsAndActiveOrg()
        .then((userOrgDataForRender) => {
          res.render('account/organizations', userOrgDataForRender)
      })
      .catch((err) => {
        console.log(err);
        res.render('account/organizations', { dbError: err });
      });
  })


orgs.route('/:sku')
  .put((req,res) => {
    req.OrgSvc = new OrgSvc(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid)

    req.OrgSvc.setDefaultOrg()
      .then((result) => {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage:error })
      })
  })
  .delete((req,res) => {
    let org_uuid = req.body.org_uuid;
    db.query('DELETE FROM user_orgs WHERE user_uuid = $1 AND org_uuid = $2', [req.session.user.uuid, org_uuid])
    .then((result) => {
      res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
    })
    .catch((error) => {
      console.log(error)
      res.render('accounts/organizations', {error:error, dbError:'try refreshing the page'})
    })
  })

orgs.route('/:sku/remove-default')
  .put((req, res) => {
    req.OrgSvc = new OrgSvc(req.querySvc, R.UserSession.fromJSON(req.session.user), req.body.org_uuid)
    req.OrgSvc.unsetDefaultOrg()
      .then((result) => {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage:error })
      })
  })


export default orgs;


