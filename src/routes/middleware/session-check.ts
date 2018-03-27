import * as helper from '../functions/helpers';
import { db } from './database';
import * as session from "express-session";
import * as express from "express";


function check(req:Express.Request, res, next:Function) {
  // console.log('>>>>SESSION CHECK MIDDLEWARE RUNNING')
  if (req.session.user && req.sessionID) {
    db.query('SELECT sessionID FROM session WHERE user_uuid = $1', [req.session.user.uuid])
      .then((result) => {
        if (result.rows[0].sessionid === req.sessionID) {
          return db.query('SELECT permission FROM users WHERE user_uuid = $1', [req.session.user.uuid])
        } else {
          helper.genError(res, 'login', "you were no longer logged in, try to log in again");
        }
      })
      .then((result) => {
        if (result.rows[0].permission === 'admin') {
          next();
        } else if (result.rows[0].permission === 'user') {
          console.log('>>>>USER IS A USER: ', req.session.user)
          next();
        } else if (result.rows[0].permission === 'guest') {
        }
      })
      .catch((error) => {
        console.log(error.stack)
        helper.genError(res, 'login', "you were no longer logged in, try to log in again");
      })
  } else {
    // console.log('>>>>USER IS A GUEST')
    next()
  }
}

// function adminCheck(req:Express.Request, res:ModResponse, next:Function) {
//   if (req.session.user && req.sessionID && req.session.user.permission === 'admin') {
//     db.query('SELECT sessionID FROM session WHERE user_uuid = $1', [req.session.user.uuid])
//       .then((result) => {
//         if (result.rows[0].sessionid === req.sessionID) {
//           return db.query('SELECT permission FROM users WHERE user_uuid = $1', [req.session.user.uuid])
//         } else {
//           helper.genError(res, 'login', "you were no longer logged in, try to log in again");
//         }
//       })
//       .then((result) => {
//         if (result.rows[0].permission === 'admin') {
//           console.log('admin approved')
//           next();
//         } else if (result.rows[0].permission === 'user') {
//           console.log('not admin')
//           helper.genError(res, 'login', "you were no longer logged in, try to log in again");
//         } else if (result.rows[0].permission === 'guest') {
//
//         }
//       })
//       .catch((error) => {
//         console.log(error.stack)
//         helper.genError(res, 'login', "you were no longer logged in, try to log in again");
//       })
//   } else {
//     req.session = null;
//     helper.genError(res, 'login', "you were no longer logged in or you do not have permission to access this page");
//   }
// }
export { check };
