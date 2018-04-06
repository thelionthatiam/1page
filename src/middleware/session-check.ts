import { SessionCheckSvc } from '../logic/logic-middleware';
import * as session from "express-session";
import * as express from "express";


function sessionCheck(req:Express.Request, res, next:Function) {
  if (req.session.user && req.sessionID) {
    req.SessionCheckSvc = new SessionCheckSvc(req.querySvc, req.session.user)
    req.SessionCheckSvc.getPermissions()
      .then((permission) => {
        res.locals.permission = permission;
        next();          
      })
      .catch((error) => {
        console.log(error.stack)
        res.render( 'login', {dbError:"you were no longer logged in, try to log in again"});
      })
  } else {
    res.locals.permission = 'guest';
    next()
  }
}

export default sessionCheck;
