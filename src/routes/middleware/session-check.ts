import * as helper from '../functions/helpers';
import { db } from './database';
import * as session from "express-session";
import * as express from "express";


// console.log('>>>>SESSION CHECK MIDDLEWARE RUNNING')
function sessionCheck(req:Express.Request, res, next:Function) {
  if (req.session.user && req.sessionID) {
    // console.log('>>>>>>>>>>>..session check', req.sessionID)
    db.query('SELECT sessionid FROM session WHERE user_uuid = $1', [req.session.user.uuid])
      .then((result) => {
        // console.log('>>>>>>>>>>>>session check before sending query', result, result.rows[0].sessionid, req.sessionID)
        if (result.rows[0].sessionid === req.sessionID) {
          console.log('>>>>>>>>>>>>session check before sending query', req.session.user.uuid)
          return db.query('SELECT permission FROM users WHERE user_uuid = $1', [req.session.user.uuid])
        } else {
          throw new Error ("Your session does not match the saved sesesion. Try to log in again");
        }
      })
      .then((result) => {
        // console.log('>>>>>>>session check middleware result of select permission from users', result)
        if (result.rows[0].permission === 'admin') {
          res.locals.permission = 'admin'
          next();
        } else if (result.rows[0].permission === 'user') {
          // console.log('>>>>USER IS A USER: ', req.session.user)
          res.locals.permission = 'user'
          next();
        } else if (result.rows[0].permission === 'guest') {
          res.locals.psermission = 'guest'
          next();
        }
      })
      .catch((error) => {
        console.log(error.stack)
        helper.genError(res, 'login', "you were no longer logged in, try to log in again");
      })
  } else {
    res.locals.permission = 'guest'
    next()
  }
}

export default sessionCheck;
