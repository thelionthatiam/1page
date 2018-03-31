import * as express from 'express';
import * as r from '../resources/value-objects'
import { checkEmail,
  checkPassword,
  regenerateSession,
  updateSession,
  defineSession,
  updateToInactiveSessionID,
  destroySession } from '../functions/business-logic'
import { watchAlarms } from '../functions/alarm'
const router = express.Router();



router.post('/authorized', (req, res) => {

  let inputs = {
    email: req.body.email,
    password: req.body.password
  }

  let user:r.UserDB;
  let userSession:r.UserSession;

  checkEmail(req.aQuery, inputs.email)
    .then((result) => {
      user = result;
      return checkPassword(inputs.password, user.password)
    })
    .then((boolean) => {
      console.log('before regen', req.sessionID)
      return regenerateSession(req.session)
    })
    .then(() => {
      console.log('after regen', req.sessionID)
      return updateSession(req.aQuery, req.sessionID, user.user_uuid);
    })
    .then((result ) => {
      req.session.user = defineSession(user)
      res.redirect('/app')
    })
    .catch((err:Error) => {
      console.log(err)
      res.render('login', {dbError:err})
    })
})

// router.post('/authorized', (req, res) => {

//   console.log('start authorized post')

//   let inputs = {
//     email: req.body.email,
//     password: req.body.password
//   }
//   console.log(inputs)

//   let renderObj:AuthRender;
//   let user:r.UserDB;
//   let cart:r.CartDB;
//   let userSession:r.UserSession;

//   req.aQuery.selectUser([inputs.email])
//     .then((result) => {
//       if (result.rows.length === 0) {
//         throw new Error("Email not found");
//       } else {
//         console.log('select user', result.rows[0])
//         user = r.UserDB.fromJSON(result.rows[0]);
//         return bcrypt.compare(inputs.password, user.password);
//       }
//     })
//     .then((result : boolean) => {
//       if (result === false) {
//         throw new Error('Password incorrect');
//       } else {
//         console.log('pass quick', result)
//         return help.regenerateSession(req);
//       }
//     })
//     .then(() => {
//       console.log(req.sessionID)
//       return req.aQuery.updateSessionID([req.sessionID, user.user_uuid]);
//     })
//     .then((result ) => {

//      userSession = r.UserSession.fromJSON({
//         email:user.email,
//         uuid:user.user_uuid,
//         permission:user.permission,
//         name:user.name
//       })
//       req.session.user = userSession;]

//       // watchAlarms(userSession);

//       renderObj = {
//         email:user.email,
//         name:user.name
//        };

//       if (user.permission === 'admin') {
//         res.render('admin/home')
//       } else if (user.permission === 'user') {
//         console.log(result)
//         res.json(result)
//       }
//     })
//     .catch((error:Error) => {
//       console.log(error)
//       res.json(error)
//     })
// })


// LOGOUT WILL NOT WORK BECAUSE DB IS A FAIL

router.post('/log-out', (req, res) => {
  updateToInactiveSessionID(req.aQuery, req.session.user_uuid)
    .then(() => destroySession(req.session))
    .then(()=> {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err.stack)
      console.log(err)
      res.render('error', { errName: err.message, errMessage: null });
    })
  });

// router.post('/log-out', function(req, res, next) {
//     let inactive = uuidv4(); //if its uuidv4 its inactive
//     db.query('UPDATE session SET sessionid = $1 WHERE user_uuid = $2', [inactive, req.session.user.uuid])
//     .then((result) => {
//       req.session.destroy(function(err:Error) {
//         if (err) {
//           res.render('error', { errName: err.message, errMessage: null });
//         } else {
//           console.log("after destory", req.session)
//           res.render('login');
//         }
//       });
//     })
//   });

module.exports = router;
