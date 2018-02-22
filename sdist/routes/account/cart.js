"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helpers_1 = require("../../functions/helpers");
var coupons = require("../../functions/coupon");
var database_1 = require("../../middleware/database");
var router = express.Router();
var viewPrefix = 'cart/';
router.route('/cart')
    .post(function (req, res) {
    var product = req.body.product.split(',');
    var inputs = {
        product_id: product[0],
        name: product[1],
        price: product[2],
        size: product[3],
        uuid: req.session.user.uuid,
        quantity: req.body.quantity,
        cart_uuid: '',
        card_number: '',
        product_history_id: ''
    };
    console.log('post to cart');
    database_1.db.query('SELECT card_number FROM payment_credit WHERE (user_uuid, active) = ($1, $2)', [inputs.uuid, true])
        .then(function (result) {
        inputs.card_number = result.rows[0].card_number;
        return database_1.db.query('SELECT cart_uuid FROM cart WHERE user_uuid = $1', [req.session.user.uuid]);
    })
        .then(function (result) {
        inputs.cart_uuid = result.rows[0].cart_uuid;
        return database_1.db.query('SELECT product_history_id FROM product_history p WHERE updated_timestamp = (SELECT MAX(updated_timestamp) FROM product_history WHERE product_id = $1)', [inputs.product_id]);
    })
        .then(function (result) {
        inputs.product_history_id = result.rows[0].product_history_id;
        return database_1.db.query('SELECT product_id FROM cart_items WHERE cart_uuid = $1 and product_id = $2', [inputs.cart_uuid, inputs.product_id]);
    })
        .then(function (result) {
        if (result.rows.length === 0) {
            database_1.db.query('SELECT cc.coupon_uuid, discount, applies_to, applied FROM cart_coupons cc INNER JOIN coupons c ON c.coupon_uuid = cc.coupon_uuid AND (cc.cart_uuid = $1)', [req.session.user.cart_uuid])
                .then(function (result) {
                if (result.rows[0].applied === true && (result.rows[0].applies_to === inputs.product_id || result.rows[0].applies_to === 'order')) {
                    var query = 'INSERT INTO cart_items(product_id, cart_uuid, quantity, product_history_id, discount) VALUES ($1, $2, $3, $4, $5)';
                    var input = [inputs.product_id, inputs.cart_uuid, inputs.quantity, inputs.product_history_id, result.rows[0].discount];
                    return database_1.db.query(query, input);
                }
                else {
                    var query = 'INSERT INTO cart_items(product_id, cart_uuid, quantity, product_history_id) VALUES ($1, $2, $3, $4)';
                    var input = [inputs.product_id, inputs.cart_uuid, inputs.quantity, inputs.product_history_id];
                    return database_1.db.query(query, input);
                }
            });
        }
        else {
            var query = 'UPDATE cart_items SET quantity = quantity+$1 WHERE cart_uuid = $2 AND product_id = $3';
            var input = [inputs.quantity, inputs.cart_uuid, inputs.product_id];
            return database_1.db.query(query, input);
        }
    })
        .then(function (result) {
        res.redirect('../../products');
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render('shopping/products', { dbError: userError });
    });
})
    .get(function (req, res) {
    var uuid = req.session.user.uuid, cartContent = [], totalCost = 0, totalItems = 0, price, quantity, card_number, lastFour, discounted = 1;
    database_1.db.query('SELECT p.product_id, name, price, size, description FROM products p INNER JOIN cart_items c ON p.product_id = c.product_id AND (c.cart_uuid = $1)', [req.session.user.cart_uuid])
        .then(function (result) {
        cartContent = result.rows;
        for (var i = 0; i < cartContent.length; i++) {
            cartContent[i].email = req.session.user.email;
        }
        return database_1.db.query('SELECT * FROM cart_items WHERE cart_uuid = $1', [req.session.user.cart_uuid]);
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
        return database_1.db.query('SELECT card_number FROM cart WHERE user_uuid = $1', [req.session.user.uuid]);
    })
        .then(function (result) {
        lastFour = helpers_1.lastFourOnly(result.rows[0].card_number);
        card_number = result.rows[0].card_number;
        return database_1.db.query('SELECT * FROM users', []);
    })
        .then(function (result) {
        res.render(viewPrefix + 'cart', {
            cartContent: cartContent,
            totalCost: totalCost,
            totalItems: totalItems,
            lastFour: lastFour,
            card_number: card_number,
            email: req.session.user.email,
        });
    })
        .catch(function (err) {
        console.log('get cart error', err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render(viewPrefix + 'cart', { dbError: userError });
    });
});
router.route('/cart/:product_id')
    .get(function (req, res) {
    var cart_uuid = req.session.user.cart_uuid;
    database_1.db.query('SELECT * FROM cart_items WHERE cart_uuid = $1 AND product_id = $2', [cart_uuid, req.query.product_id])
        .then(function (result) {
        res.render(viewPrefix + 'edit-cart-item', {
            name: result.rows[0].name,
            product_id: result.rows[0].product_id,
            quantity: result.rows[0].quantity,
            uuid: cart_uuid,
            email: req.session.user.email
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'cart', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var quantity = parseInt(req.body.quantity);
    var product_id = req.body.product_id;
    var cart_uuid = req.session.user.cart_uuid;
    if (req.body.quantity === 0) {
        database_1.db.query('DELETE FROM cart_items WHERE product_id = $1 AND cart_uuid = $2', [req.query.product_id, cart_uuid])
            .then(function (result) {
            res.redirect('/acccounts/:email/cart');
        })
            .catch(function (err) {
            console.log(err.stack);
            res.render(viewPrefix + 'cart', { dbError: err.stack });
        });
    }
    database_1.db.query('UPDATE cart_items SET quantity = $1 WHERE cart_uuid = $2 AND product_id = $3', [quantity, cart_uuid, product_id])
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/cart');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'cart', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var cart_uuid = req.session.user.cart_uuid;
    database_1.db.query('DELETE FROM cart_items WHERE product_id = $1 AND cart_uuid = $2', [req.body.product_id, cart_uuid])
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/cart');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render(viewPrefix + 'cart', { dbError: err.stack });
    });
});
router.route('/payment-select')
    .get(function (req, res) {
    var uuid = req.session.user.uuid;
    var paymentContent;
    database_1.db.query("SELECT * FROM payment_credit WHERE user_uuid = $1", [uuid])
        .then(function (result) {
        paymentContent = result.rows;
        return database_1.db.query('SELECT card_number FROM cart WHERE user_uuid = $1', [req.session.user.uuid]);
    })
        .then(function (result) {
        var lastFour = helpers_1.lastFourOnly(result.rows[0].card_number);
        res.render(viewPrefix + 'payments-cart-select', {
            paymentContent: paymentContent,
            activeCard: lastFour,
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.redirect('./cart');
    });
})
    .post(function (req, res) {
    var card_number = req.body.card_number;
    database_1.db.query('UPDATE cart SET card_number = $1 WHERE user_uuid = $2', [card_number, req.session.user.uuid])
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/cart');
    })
        .catch(function (error) {
        console.log(error);
        res.render(viewPrefix + 'payments-cart-select', {
            dbError: error
        });
    });
});
module.exports = router;
//# sourceMappingURL=cart.js.map