import * as R from '../services/value-objects';
import CreateAcctSvc from '../logic/logic-accounts';

import * as express from 'express';
const accts = express.Router();

//to sign up page
accts.get('/new-account', function(req, res, next) {
  res.locals.something = 'test';
  res.render('new-account');
});


accts.post('/delete', function (req, res, next) {
  res.render('login', {
    accountDelete:true
  });
});

accts.route('/accounts')
  .post((req,res) => {
    let inputs = {
      email: req.body.email,
      phone: req.body.phone,
      password:req.body.password,
      name:req.body.name,
    };
    
    let user:R.UserDB;

    req.CreateAcctSvc = new CreateAcctSvc(req.aQuery, inputs, user, req.sessionID)
    
    req.CreateAcctSvc.createAcct()
      .then((result)=> {
        res.render('login');
      })
      .catch((err) => {
        console.log(err)
        res.render('new-account', {
          dbError:err
        })
      })
  })


// router.route('/accounts')
//   .post((req,res) => {
//     let inputs = {
//       email: req.body.email,
//       phone: req.body.phone,
//       password:req.body.password,
//       name:req.body.name,
//       uuid:'',
//       nonce:''
//     };

//     bcrypt.hash(inputs.password, 10)
//       .then((hash) => {
//         inputs.password = hash;
//         let query = 'INSERT INTO users(email, phone, password, name) VALUES($1, $2, $3, $4) RETURNING *';
//         let input = [inputs.email, inputs.phone, inputs.password, inputs.name];
//         return db.query(query, input)
//       })
//       .then((result) => {
//         inputs.uuid = result.rows[0].user_uuid;

//         return helper.randomString;
//       })
//       .then((string) => {
//         return bcrypt.hash(string, 10)
//       })
//       .then((hash)=> {
//         inputs.nonce = hash;
//         return db.query('INSERT INTO nonce(user_uuid, nonce) VALUES ($1, $2) RETURNING *', [inputs.uuid, inputs.nonce])
//       })
//       .then((result) => {
//         let query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
//         let input = [inputs.uuid, req.sessionID];
//         return db.query(query, input);
//       })
//       .then((result)=> {
//         return db.query('INSERT INTO user_settings(user_uuid) VALUES ($1)', [inputs.uuid])
//       })
//       .then((result) => {
//         return db.query('UPDATE users SET permission = $1 WHERE user_uuid = $2', ['user', inputs.uuid])
//       })
//       .then((result)=> {
//         console.log(result.rows)
//         res.render('new-account', {
//           success: true,
//           email: inputs.email,
//           phone: inputs.phone,
//         });
//       })
//       .catch((err) => {
//         let error = dbErrTranslator(err)
//         console.log(error, err)
//         res.render('new-account', {
//           dbError:error
//         })
//       })
//   })

export default accts;
