"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var async_database_1 = require("../../middleware/async-database");
var router = express.Router();
var viewPefix = 'payment/';
router.get('/new-payment', function (req, res) {
    var email = req.session.user.email;
    res.render(viewPefix + 'new-payment', {
        email: email
    });
});
router.route('/payment')
    .get(function (req, res) {
    async_database_1.db.query("SELECT * FROM payment_credit WHERE user_uuid = $1", [req.session.user.uuid])
        .then(function (result) {
        var paymentContent = result.rows;
        res.render(viewPefix + 'payments', {
            paymentContent: paymentContent,
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'payments', {
            dbError: error,
            email: req.session.user.email
        });
    });
})
    .post(function (req, res) {
    var uuid = req.session.user.uuid;
    var email = req.session.user.email;
    var inputs = {
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        expDay: req.body.expDay,
        expMonth: req.body.expMonth,
        cvv: req.body.cvv,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    };
    async_database_1.db.query('SELECT * FROM payment_credit WHERE user_uuid = $1', [uuid])
        .then(function (result) {
        if (result.rows.length > 0) {
            return async_database_1.db.query('UPDATE payment_credit SET active = $1 WHERE user_uuid = $2', [false, uuid]);
        }
    })
        .then(function (result) {
        var query = 'INSERT INTO payment_credit (user_uuid, card_number, name, exp_month, exp_date, cvv, address_1, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        var input = [uuid, inputs.cardNumber, inputs.name, inputs.expMonth, inputs.expDay, inputs.cvv, inputs.address, inputs.city, inputs.state, inputs.zip];
        return async_database_1.db.query(query, input);
    })
        .then(function (result) {
        var query = 'INSERT INTO cart (card_number, user_uuid) VALUES ($1, $2)';
        var input = [inputs.cardNumber, req.session.user.uuid];
        return async_database_1.db.query(query, input);
    })
        .then(function (result) {
        res.render(viewPefix + 'new-payment', {
            success: true,
            name: inputs.name,
            address: inputs.address,
            city: inputs.city,
            state: inputs.state,
            zip: inputs.zip,
            email: email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'new-payment', {
            dbError: error,
            email: req.session.user.email
        });
    });
});
router.route('/payment/active-payment')
    .put(function (req, res) {
    var card_number = req.body.card_number;
    console.log(card_number);
    async_database_1.db.query('UPDATE payment_credit SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
        .then(function (result) {
        var query = 'UPDATE payment_credit SET active = $1 WHERE (card_number, user_uuid) = ($2, $3)';
        var input = [true, card_number, req.session.user.uuid];
        return async_database_1.db.query(query, input);
    })
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'payments', {
            dbError: error,
            email: req.session.user.email
        });
    });
});
router.route('/payment/:card_number')
    .get(function (req, res) {
    var card_number = req.query.card_number;
    var payment;
    console.log('payment get');
    async_database_1.db.query('SELECT * FROM payment_credit WHERE user_uuid = $1 AND card_number = $2', [req.session.user.uuid, card_number])
        .then(function (result) {
        payment = result.rows[0];
        console.log(payment);
        res.render('payment/edit-payment', {
            name: payment.name,
            card_number: payment.card_number,
            exp_date: payment.exp_date,
            exp_month: payment.exp_month,
            cvv: payment.cvv,
            address_1: payment.address_1,
            city: payment.city,
            state: payment.state,
            zip: payment.zip,
            user_uuid: req.session.user.uuid
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'payments', {
            dbError: error,
            email: req.session.user.email
        });
    });
})
    .put(function (req, res) {
    var oldCard = req.body.oldCard;
    var inputs = {
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        expDay: req.body.expDay,
        expMonth: req.body.expMonth,
        cvv: req.body.cvv,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    };
    var query = 'UPDATE payment_credit SET (card_number, name, exp_month, exp_date, cvv, address_1, city, state, zip) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE user_uuid = $10 AND card_number = $11';
    var input = [inputs.cardNumber, inputs.name, inputs.expMonth, inputs.expDay, inputs.cvv, inputs.address, inputs.city, inputs.state, inputs.zip, req.session.user.uuid, oldCard];
    async_database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'payments', {
            dbError: error,
            email: req.session.user.email
        });
    });
})
    .delete(function (req, res) {
    var card_number = req.body.card_number;
    var query = 'DELETE FROM payment_credit WHERE user_uuid = $1 AND card_number =$2';
    var input = [req.session.user.uuid, card_number];
    async_database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPefix + 'payments', {
            dbError: error,
            email: req.session.user.email
        });
    });
});
module.exports = router;
//# sourceMappingURL=payment.js.map