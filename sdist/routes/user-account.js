"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logic_profile_1 = require("../logic/logic-profile");
var database_1 = require("../middleware/database");
var profile = express.Router();
profile.route('/')
    .get(function (req, res) { return res.render('account/my-account'); })
    .delete(function (req, res) {
    database_1.db.query('DELETE FROM users WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        res.render('home', {
            message: "account was deleted, please make a new one to enter"
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/my-account', { dbError: err.stack });
    });
});
profile.route('/contact')
    .get(function (req, res) {
    res.render('account/my-contact');
})
    .put(function (req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    var query = 'UPDATE users SET (email, phone) = ($1, $2) WHERE user_uuid = $3';
    var input = [email, phone, req.session.user.uuid];
    database_1.db.query(query, input)
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email); })
        .catch(function (err) {
        console.log(err.stack);
        res.render('account/my-contact', { dbError: err });
    });
});
profile.route('/password')
    .get(function (req, res) { return res.render('account/new-password'); })
    .post(function (req, res) {
    var inputs = {
        password: req.body.password,
        oldPassword: req.body.oldPassword
    };
    req.ProfileSvc = new logic_profile_1.default(req.querySvc, req.session.user, inputs);
    req.ProfileSvc.changePassword()
        .then(function () { return res.redirect('/app/accounts/' + req.session.user.email); })
        .catch(function (err) {
        console.log(err);
        res.render('account/new-password', { dbError: err });
    });
});
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
exports.default = profile;
//# sourceMappingURL=user-account.js.map