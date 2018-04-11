import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as url from 'url';
import ProfileSvc from '../logic/logic-profile'
import { db } from '../middleware/database';

const profile = express.Router();

profile.route('/')
  .get((req,res) => res.render( 'account/my-account'))
  .delete((req, res) => {
    db.query('DELETE FROM users WHERE user_uuid = $1', [req.session.user.uuid])
      .then((result) => {
        res.render('home', {
          message:"account was deleted, please make a new one to enter"
        })
      })
      .catch((err) => {
        console.log(err.stack)
        res.render( 'account/my-account', { dbError: err.stack });
      });
  })


profile.route('/contact')
  .get((req,res) => {
    res.render( 'account/my-contact')
  })
  .put((req, res) => {
    let email = req.body.email;
    let phone = req.body.phone;
    let query = 'UPDATE users SET (email, phone) = ($1, $2) WHERE user_uuid = $3';
    let input = [email, phone, req.session.user.uuid];

    db.query(query, input)
      .then(() => res.redirect('/app/accounts/' + req.session.user.email))
      .catch((err) => {
        console.log(err.stack)
        res.render('account/my-contact', { dbError: err })
      });
  })

profile.route('/password')
  .get((req, res) => res.render('account/new-password'))
  .post((req, res) => {
    let inputs = {
      password: req.body.password,
      oldPassword: req.body.oldPassword
    }
    req.ProfileSvc = new ProfileSvc(req.querySvc, req.session.user, inputs)

    req.ProfileSvc.changePassword()
      .then(() => res.redirect('/app/accounts/' + req.session.user.email))
      .catch((err) => {
        console.log(err)
        res.render('account/new-password', { dbError: err })
      })
  })


// profile.route('/password')
//   .get((req, res) => res.render('account/new-password'))
//   .post((req, res) => {
//     let inputs = {
//       password:req.body.password,
//       oldPassword:req.body.oldPassword
//     }
//     db.query("SELECT * FROM users WHERE user_uuid = $1", [req.session.user.uuid])
//       .then((result) => {
//         console.log(result)
//         return bcrypt.compare(req.body.oldPassword, result.rows[0].password)
//       })
//       .then((result) => {

//         if (result === false) {
//           throw new Error('Password incorrect');
//         } else {
//           return bcrypt.hash(inputs.password, 10)
//         }
//       })
//       .then((hash) => {
//         inputs.password = hash;
//         let query = 'UPDATE users SET password = $1 WHERE user_uuid = $2'
//         let input = [inputs.password, req.session.user.uuid]
//         return db.query(query, input)
//       })
//       .then((result) => {
//         res.render( 'account/new-password', {
//           success:true,
//           email:req.session.user.email
//         })
//       })
//       .catch((error) => {
//         console.log(error)
//         res.render( 'account/new-password', { dbError: error })
//       })
//   })

export default profile;
