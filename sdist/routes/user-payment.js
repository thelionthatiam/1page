"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logic_payments_1 = require("../logic/logic-payments");
var payment = express.Router();
payment.route('/')
    .get(function (req, res) {
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, null);
    req.PaymentsSvc.getFormsOfPayment()
        .then(function (paymentContent) {
        res.render('payment/payments', {
            paymentContent: paymentContent,
        });
    })
        .catch(function (error) {
        console.log(error);
        res.render('payment/payments', { dbError: error, });
    });
})
    .post(function (req, res) {
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, req.body);
    req.PaymentsSvc.addNewFormOfPayment()
        .then(function (result) {
        return res.redirect('/app/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render('payment/new-payment', { dbError: error });
    });
});
payment.get('/new-payment', function (req, res) { return res.render('payment/new-payment'); });
payment.route('/active-payment')
    .put(function (req, res) {
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, req.body);
    req.PaymentsSvc.changeActivePayement()
        .then(function (result) { return res.redirect('/app/accounts/' + req.session.user.email + '/payment'); })
        .catch(function (error) {
        console.log(error);
        res.render('payment/payments', { dbError: error });
    });
});
payment.route('/:card_number')
    .get(function (req, res) {
    console.log(req.query);
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, req.query);
    req.PaymentsSvc.getFormOfPayement()
        .then(function (result) { return res.render('payment/edit-payment', result); })
        .catch(function (error) {
        console.log(error);
        res.render('payment/payments', { dbError: error });
    });
})
    .put(function (req, res) {
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, req.body);
    console.log(req.body);
    req.PaymentsSvc.updateFormOfPayment()
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render('payment/payments', { dbError: error });
    });
})
    .delete(function (req, res) {
    req.PaymentsSvc = new logic_payments_1.default(req.querySvc, req.session.user, req.body);
    req.PaymentsSvc.deleteFormOfPayment()
        .then(function (result) {
        res.redirect('/app/accounts/' + req.session.user.email + '/payment');
    })
        .catch(function (error) {
        console.log(error);
        res.render('payment/payments', { dbError: error });
    });
});
exports.default = payment;
//# sourceMappingURL=user-payment.js.map