import AuthSvc, { regenerateSession, updateToInactiveSessionID, destroySession } from '../logic/logic-authorization';

import * as express from 'express';
const auth = express.Router();

auth.post('/authorized', (req, res) => {
  let inputs = {
    email: req.body.email,
    password: req.body.password
  }

  regenerateSession(req.session)
    .then(() => {
      req.AuthSvc = new AuthSvc(req.querySvc, inputs, req.sessionID)
      return req.AuthSvc.doAuth()
    })
    .then((userDataForSession) => {
      req.session.user = userDataForSession
      res.redirect('/app')
    })
    .catch((err:Error) => {
      console.log(err)
      console.log('the final erro', err)
      res.render('login', { dbError:err })
    })
})


auth.post('/log-out', (req, res) => {
  updateToInactiveSessionID(req.querySvc, req.session.user_uuid)
    .then(() => destroySession(req.session))
    .then(()=> {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
      res.render('error', { errName: err.message, errMessage: null });
    })
  });

export default auth;