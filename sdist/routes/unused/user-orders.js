"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../../functions/helpers");
var coupons = require("../../functions/coupon");
var inv = require("../../functions/invoice");
var express = require("express");
var database_1 = require("../../middleware/database");
var mailer = require("../../middleware/emailer");
var router = express.Router();
router.use('/orders', mailer.mailer()); // middleware to load email junk
router.route('/orders')
    .post(function (req, res) {
    var card_number = req.body.card_number;
    var order_uuid = '';
    var numberOfOrders = 0;
    var discount;
    var recieptContent;
    database_1.db.query('SELECT * FROM cart_items WHERE cart_uuid = $1', [req.session.user.cart_uuid])
        .then(function (result) {
        if (result.rowCount === 0) {
            res.redirect('/accounts/' + req.session.user.email + '/cart');
        }
        else {
            return database_1.db.query('SELECT * FROM orders WHERE user_uuid = $1', [req.session.user.uuid]);
        }
    })
        .then(function (result) {
        var number = result.rows.length;
        numberOfOrders = number + 1;
        var query = 'INSERT INTO orders (user_uuid, card_number, order_number) VALUES ($1, $2, $3)';
        var input = [req.session.user.uuid, card_number, numberOfOrders];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        var query = 'SELECT order_uuid FROM orders WHERE user_uuid = $1 AND order_number = $2';
        var input = [req.session.user.uuid, numberOfOrders];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        order_uuid = result.rows[0].order_uuid;
        return database_1.db.query('SELECT product_id, quantity, product_history_id, discount FROM cart_items WHERE cart_uuid = $1', [req.session.user.cart_uuid]);
    })
        .then(function (result) {
        discount = result.rows[0].discount;
        var cart_items = helpers_1.addOrderUUIDItemNumber(result.rows, order_uuid);
        var query = 'INSERT INTO order_items (product_id, quantity, product_history_id, discount, order_uuid, item_number) VALUES ($1, $2, $3, $4, $5, $6)';
        var itemArray = [];
        for (var i = 0; i < cart_items.length; i++) {
            var itemProperties = [
                cart_items[i].product_id,
                cart_items[i].quantity,
                cart_items[i].product_history_id,
                cart_items[i].discount,
                cart_items[i].order_uuid,
                cart_items[i].item_number
            ];
            itemArray.push(database_1.db.query(query, itemProperties));
        }
        return Promise.all(itemArray);
    })
        .then(function (result) {
        return database_1.db.query('DELETE FROM cart_items WHERE cart_uuid = $1', [req.session.user.cart_uuid]);
    })
        .then(function (result) {
        var query = 'SELECT p.product_id, name, price, size, description, quantity, discount FROM products p INNER JOIN order_items o ON p.product_id = o.product_id AND (o.order_uuid = $1)';
        var input = [order_uuid];
        return database_1.db.query(query, input);
    })
        .then(function (result) {
        recieptContent = result.rows;
        var totalQuantity = inv.totalItems(recieptContent);
        recieptContent = inv.addDiscount(recieptContent);
        recieptContent = inv.addEmail(recieptContent, req.session.user.email);
        var total = coupons.percentOff(discount, inv.total(inv.invoiceItems(result.rows))).toString();
        var mail = {
            from: 'juliantheberge@gmail.com',
            to: 'fffff@mailinator.com',
            subject: 'Test',
            template: 'email/reciept',
            context: {
                cartContent: recieptContent,
                totalCost: total,
                totalItems: totalQuantity,
                lastFour: 'fake card',
                email: req.session.user.email,
            }
        };
        return req.transporter.sendMail(mail);
    })
        .then(function (info) {
        return database_1.db.query('UPDATE cart_coupons SET used = $1', [true]);
    })
        .then(function (result) {
        res.render('orders/order-sent', {
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.send(error);
    });
});
module.exports = router;
//# sourceMappingURL=user-orders.js.map