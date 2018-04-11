"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var help = require("../functions/promise-helpers");
var bcrypt = require("bcrypt");
var mail_config_js_1 = require("../config/mail-config.js");
var database_1 = require("../middleware/database");
var coupons = require("../functions/coupon-helpers");
var mailer = require("../middleware/emailer");
var express = require("express");
var router = express.Router();
// DB IS CURRENTLY USED HERE
router.use('/test-route', mailer.mailer()); // middleware to load email junk
router.get('/test-route', function (req, res) {
    var uuid = '3e792f4c-1f49-4fcd-808c-fee4203ca056', cartContent = [], totalCost = 0, totalItems = 0, price, quantity, card_number, lastFour, discounted = 1, cart_uuid = '530e03ed-28be-47c1-a774-cff6486f0606', email = 'b@b.bb';
    database_1.db.query('SELECT p.product_id, name, price, size, description, discount FROM products p INNER JOIN cart_items c ON p.product_id = c.product_id AND (c.cart_uuid = $1)', [cart_uuid])
        .then(function (result) {
        cartContent = result.rows;
        for (var i = 0; i < cartContent.length; i++) {
            if (cartContent[i].discount === 0) {
                cartContent[i].isDiscount = false;
            }
            else if (cartContent[i].discount > 0) {
                cartContent[i].isDiscount = true;
                cartContent[i].discount = ((cartContent[i].discount) * 100);
            }
            cartContent[i].email = email;
        }
        return database_1.db.query('SELECT * FROM cart_items WHERE cart_uuid = $1', [cart_uuid]);
    })
        .then(function (result) {
        for (var i = 0; i < cartContent.length; i++) {
            for (var j = 0; j < result.rows.length; j++) {
                if (cartContent[i].product_id === result.rows[j].product_id) {
                    cartContent[i].quantity = result.rows[j].quantity;
                }
            }
            var discounted_1 = coupons.percentOff(result.rows[i].discount, cartContent[i].price);
            console.log(discounted_1);
            price = discounted_1;
            quantity = parseInt(cartContent[i].quantity);
            totalCost = totalCost + (price * quantity);
            totalItems = totalItems + quantity;
            console.log(price, quantity, totalCost, totalItems);
        }
        return database_1.db.query('SELECT card_number FROM cart WHERE user_uuid = $1', [uuid]);
    })
        .then(function (result) {
        lastFour = lastFourOnly(result.rows[0].card_number);
        card_number = result.rows[0].card_number;
        return database_1.db.query('SELECT * FROM users', []);
    })
        .then(function (result) {
        var mail = {
            from: 'juliantheberge@gmail.com',
            to: 'fffff@mailinator.com',
            subject: 'Test',
            template: 'email/reciept',
            context: {
                cartContent: cartContent,
                totalCost: totalCost,
                totalItems: totalItems,
                lastFour: lastFour,
                card_number: card_number,
                email: email,
            }
        };
        return req.transporter.sendMail(mail)
            .then(function (info) {
            console.log(info);
            res.render('login', { dbError: 'mail sent, this is not an error' });
        });
    })
        .catch(function (err) {
        console.log('test error', err);
        res.render('login', { dbError: err });
    });
});
// render forgot pass page
router.get('/forgot-password', function (req, res, next) {
    res.render('forgot-password');
});
router.route('/forgot-password/authorized')
    .post(function (req, res) {
    var uuid = '';
    var nonce = '';
    var email = req.body.email;
    database_1.db.query("SELECT * FROM users WHERE email = $1", [email])
        .then(function (result) {
        if (result.rows.length === 0) {
            console.log('should have error');
            throw new Error("Email not found");
        }
        else {
            uuid = result.rows[0].user_uuid;
            return help.randomString;
        }
    })
        .then(function (string) {
        return bcrypt.hash(string, 10);
    })
        .then(function (hash) {
        nonce = hash;
        return database_1.db.query('UPDATE nonce SET nonce = $1, thetime = default WHERE user_uuid = $2', [hash, uuid]);
    })
        .then(function (result) {
        req.session.uuid = uuid;
        req.session.token = nonce;
        mail_config_js_1.mailOptions.to = email;
        // doesn't have any content in the email anymore, use html
        return mail_config_js_1.transporter.sendMail(mail_config_js_1.mailOptions);
    })
        .then(function (result) {
        res.render('forgot-password', {
            forgotPassword: true,
            message: "check your email to authorize new password!"
        });
    })
        .catch(function (error) {
        res.render('login', { forgotPassword: true, dbError: error });
    });
})
    .get(function (req, res) {
    var uuid = req.session.uuid;
    database_1.db.query('SELECT * FROM nonce WHERE user_uuid = $1', [uuid])
        .then(function (result) {
        if (result.rows.length === 0) {
            throw new Error("Account not found.");
        }
        else {
            var outputs = result.rows[0];
            var token = req.session.token;
            return help.isSessionValid(token, outputs);
        }
    })
        .then(function (result) {
        if (result) {
            res.render('new-password', {
                forgotPassword: true,
                email: req.session.uuid,
            });
        }
    })
        .catch(function (error) {
        console.log(error);
        res.render('login', { dbError: error });
    });
})
    .put(function (req, res) {
    var password = req.body.password;
    var uuid = req.session.uuid;
    bcrypt.hash(password, 10)
        .then(function (hash) {
        console.log(hash);
        password = hash;
        return database_1.db.query('UPDATE users SET password = $1 WHERE user_uuid = $2', [password, uuid]);
    })
        .then(function (result) {
        console.log(result);
        res.render('login', {
            message: "try your new password"
        });
    })
        .catch(function (error) {
        res.render('new-password', { forgotPassword: true, dbError: error, email: req.session.uuid });
    });
});
module.exports = router;
//# sourceMappingURL=guest-email.js.map