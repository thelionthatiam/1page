import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { db } from '../middleware/async-database';
var router = express.Router();
var viewPrefix = 'account/';
router.route('/:email')
    .get(function (req, res) {
    res.render(viewPrefix + 'my-account', {
        email: req.session.user.email,
    });
})
    .delete(function (req, res) {
    db.query('DELETE FROM users WHERE user_uuid = $1', [req.session.user.uuid])
        .then(function (result) {
        res.render('login', {
            message: "account was deleted, please make a new one to enter"
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'my-account', { dbError: err.stack });
    });
});
router.route('/:email/contact')
    .get(function (req, res) {
    res.render(viewPrefix + 'my-contact', {
        email: req.session.user.email,
        phone: req.session.user.phone
    });
})
    .put(function (req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    var query = 'UPDATE users SET (email, phone) = ($1, $2) WHERE user_uuid = $3';
    var input = [email, phone, req.session.user.uuid];
    db.query(query, input)
        .then(function (result) {
        req.session.user.email = email;
        req.session.user.phone = phone;
        res.render(viewPrefix + 'my-account', {
            title: "account updated",
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'my-account', { dbError: err.stack });
    });
});
router.route('/:email/password')
    .get(function (req, res) {
    res.render(viewPrefix + 'new-password', {
        email: req.session.user.email
    });
})
    .post(function (req, res) {
    var inputs = {
        password: req.body.password,
        oldPassword: req.body.oldPassword
    };
    db.query("SELECT * FROM users WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        console.log(result);
        return bcrypt.compare(req.body.oldPassword, result.rows[0].password);
    })
        .then(function (result) {
        if (result === false) {
            throw new Error('Password incorrect');
        }
        else {
            return bcrypt.hash(inputs.password, 10);
        }
    })
        .then(function (hash) {
        inputs.password = hash;
        var query = 'UPDATE users SET password = $1 WHERE user_uuid = $2';
        var input = [inputs.password, req.session.user.uuid];
        return db.query(query, input);
    })
        .then(function (result) {
        res.render(viewPrefix + 'new-password', {
            success: true,
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPrefix + 'new-password', { dbError: error });
    });
});
module.exports = router;
//# sourceMappingURL=account.js.map