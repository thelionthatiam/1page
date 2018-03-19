import * as express from 'express';
import * as help from '../functions/helpers';
import * as bcrypt from 'bcrypt';
import * as uuidv4 from 'uuid/v4';
import * as r from '../resources/value-objects'
import { watchAlarms } from '../functions/alarm'
import { BaseRequestHandler } from '../resources/handlers';
import { db } from '../middleware/database';
const router = express.Router();



router.post('/authorized', (req, res) => {

  console.log('start authorized post')

  let inputs = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(inputs)

  let renderObj:AuthRender;
  let user:r.UserDB;
  let cart:r.CartDB;
  let userSession:r.UserSession;

  req.aQuery.selectUser([inputs.email])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error("Email not found");
      } else {
        console.log('select user', result.rows[0])
        user = r.UserDB.fromJSON(result.rows[0]);
        return bcrypt.compare(inputs.password, user.password);
      }
    })
    .then((result : boolean) => {
      if (result === false) {
        throw new Error('Password incorrect');
      } else {
        console.log('pass quick', result)
        return help.regenerateSession(req);
      }
    })
    .then(() => {
      console.log(req.sessionID)
      return req.aQuery.updateSessionID([req.sessionID, user.user_uuid]);
    })
    .then((result ) => {
      console.log(req.sessionID)
      userSession = r.UserSession.fromJSON({
        email:user.email,
        uuid:user.user_uuid,
        permission:user.permission,
        name:user.name
      })
      console.log('user session', userSession)
      req.session.user = userSession;
      console.log('session general', req.session)
      console.log('usersession on session',req.session.user)
      console.log('id', req.sessionID)
      watchAlarms(userSession);

      renderObj = {
        email:user.email,
        name:user.name
       };

      if (user.permission === 'admin') {
        res.render('admin/home')
      } else if (user.permission === 'user') {
        console.log(result)
        res.render('home', {
          email:req.session.user.email,
          name:req.session.user.name
        })
      }
    })
    .catch((error:Error) => {
      console.log(error)
      res.json(error)
    })
})

router.post('/api/authorized', (req, res) => {

  console.log('start authorized post')

  let inputs = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(inputs)

  let renderObj:AuthRender;
  let user:r.UserDB;
  let cart:r.CartDB;
  let userSession:r.UserSession;

  req.aQuery.selectUser([inputs.email])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error("Email not found");
      } else {
        console.log('select user', result.rows[0])
        user = r.UserDB.fromJSON(result.rows[0]);
        return bcrypt.compare(inputs.password, user.password);
      }
    })
    .then((result : boolean) => {
      if (result === false) {
        throw new Error('Password incorrect');
      } else {
        console.log('pass quick', result)
        return help.regenerateSession(req);
      }
    })
    .then(() => {
      console.log(req.sessionID)
      return req.aQuery.updateSessionID([req.sessionID, user.user_uuid]);
    })
    .then((result ) => {
      console.log(req.sessionID)
      userSession = r.UserSession.fromJSON({
        email:user.email,
        uuid:user.user_uuid,
        permission:user.permission,
        name:user.name
      })
      console.log('user session', userSession)
      req.session.user = userSession;
      console.log('session general', req.session)
      console.log('usersession on session',req.session.user)
      console.log('id', req.sessionID)
      watchAlarms(userSession);

      renderObj = {
        email:user.email,
        name:user.name
       };

      if (user.permission === 'admin') {
        res.render('admin/home')
      } else if (user.permission === 'user') {
        console.log(result)
        res.json(result)
      }
    })
    .catch((error:Error) => {
      console.log(error)
      res.json(error)
    })
})

router.get('/home-redirect', (req, res) => {
  console.log('session general redirect', req.session)
  console.log('id redirect', req.sessionID)
  let userSession = r.UserSession.fromJSON({
    email: req.session.user.email,
    uuid:req.session.user.user_uuid,
    permission:req.session.user.permission,
    name:req.session.user.name
  })

  res.render('home', {email:req.session.user.email, name:req.session.user.name})
})

router.post('/log-out', function(req, res, next) {
    let inactive = uuidv4(); //if its uuidv4 its inactive
    db.query('UPDATE session SET sessionid = $1 WHERE user_uuid = $2', [inactive, req.session.user.uuid])
    .then((result) => {
      req.session.destroy(function(err:Error) {
        if (err) {
          res.render('error', { errName: err.message, errMessage: null });
        } else {
          console.log("after destory", req.session)
          res.render('login');
        }
      });
    })
  });

module.exports = router;
