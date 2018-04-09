import { SessionCheckSvc } from '../logic/logic-middleware';
import * as session from "express-session";
import * as express from "express";


function sessionCheck(req:Express.Request, res, next:Function) {
  console.log('session check running. user is:', req.session.user)

  if (req.session.user && req.sessionID) {
    if (req.session.user.permission === 'user') {
      console.log('user and session id exist', req.session.user, req.sessionID)
      req.SessionCheckSvc = new SessionCheckSvc(req.querySvc, req.session.user)

      req.SessionCheckSvc.getPermissions()
        .then((permission) => {
          res.locals.permission = permission; // SEEMS THAT PERMISSION IS UNDEFINED
          // move the following to server-render-state maybe
          res.locals.loggedIn = true;
          res.locals.email = req.session.user.email
          res.locals.uuid = req.session.user.uuid
          next();          
        })
        .catch((error) => {
          console.log(error.stack)
          // move the following to server-render-state maybe
          res.locals.permission = 'guest';
          res.locals.loggedIn = false;
          res.locals.email = null;
          res.locals.uuid = null;
          res.render( 'login', {dbError: "you were no longer logged in, try to log in again"});
        })
    } else {
      console.log('session check says Im a guest')
      res.locals.permission = 'guest';
      next()
    }
  } else {
    console.log('session check says Im a guest')
    res.locals.permission = 'guest';
    next()
  }
}

export default sessionCheck;
