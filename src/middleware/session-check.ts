import { SessionCheckSvc } from '../logic/logic-middleware';
import * as session from "express-session";
import * as express from "express";


function sessionCheck(req:Express.Request, res, next:Function) {
  if (req.session.user && req.sessionID) {

    if (req.session.user.permission === 'user') {
      req.SessionCheckSvc = new SessionCheckSvc(req.querySvc, req.session.user)

      req.SessionCheckSvc.getPermissions()
        .then((permission) => {
          res.locals.permission = permission; // SEEMS THAT PERMISSION IS UNDEFINED
          res.locals.loggedIn = true;
          res.locals.email = req.session.user.email
          res.locals.uuid = req.session.user.uuid
          next();          
        })
        .catch((error) => {
          console.log(error.stack)
          res.locals.permission = 'guest';
          res.locals.loggedIn = false;
          res.locals.email = null;
          res.locals.uuid = null;
          res.render( 'login', {dbError: "you were no longer logged in, try to log in again"});
        })
    } else {
      res.locals.permission = 'guest';
      next()
    }
  } else {
    res.locals.permission = 'guest';
    next()
  }
}

export default sessionCheck;
