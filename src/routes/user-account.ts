import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { destroySession } from '../logic/logic-authorization';
import ProfileSvc from '../logic/logic-profile'


const profile = express.Router();

profile.route('/')
  .get((req,res) => res.render( 'account/my-account'))
  .delete((req, res) => {
    req.ProfileSvc = new ProfileSvc(req.querySvc, req.session.user, null)

    req.ProfileSvc.deleteAccount()
      .then(() => destroySession(req.session))
      .then(() => res.redirect('/'))
      .catch((err) => {
        console.log(err.stack)
        res.render('account/my-account', { dbError: err })
      });
  })

profile.route('/contact')
  .get((req,res) => res.render( 'account/my-contact'))
  .put((req, res) => {
    req.ProfileSvc = new ProfileSvc(req.querySvc, req.session.user, req.body)
    req.ProfileSvc.changeContact()
      .then(() => res.redirect('/app/accounts/' + req.session.user.email))
      .catch((err) => {
        console.log(err.stack)
        res.render('account/my-contact', { dbError: err })
      });
  })

profile.route('/password')
  .get((req, res) => res.render('account/new-password'))
  .post((req, res) => {
    req.ProfileSvc = new ProfileSvc(req.querySvc, req.session.user, req.body)
    req.ProfileSvc.changePassword()
      .then(() => res.redirect('/app/accounts/' + req.session.user.email))
      .catch((err) => {
        console.log(err)
        res.render('account/new-password', { dbError: err })
      })
  })

export default profile;
