"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_accounts_1 = require("../logic/logic-accounts");
var error_handling_1 = require("../services/error-handling");
var express = require("express");
var accts = express.Router();
//to sign up page
accts.get('/new-account', function (req, res) { return res.render('new-account'); });
// this seems to do nothing
accts.post('/delete', function (req, res, next) {
    res.render('login', {
        accountDelete: true
    });
});
accts.route('/accounts')
    .post(function (req, res) {
    var inputs = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        name: req.body.name,
    };
    req.CreateAcctSvc = new logic_accounts_1.default(req.querySvc, inputs, req.sessionID);
    req.CreateAcctSvc.createAcct()
        .then(function (result) {
        res.render('login');
    })
        .catch(function (err) {
        var stack = new Error().stack;
        console.log('error', err, 'stack', stack);
        res.render('new-account', {
            dbError: error_handling_1.dbErrTranslator(err)
        });
    });
});
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
exports.default = accts;
//# sourceMappingURL=guest-accounts.js.map