import * as express from 'express';
import { db } from '../../middleware/async-database';
var router = express.Router();
router.route('/coupons')
    .post(function (req, res) {
    // admin side
})
    .get(function (req, res) {
    var couponContent = [];
    db.query('SELECT c.coupon_uuid, name, expires_on, description, discount, applied, used FROM coupons c inner JOIN cart_coupons cc ON c.coupon_uuid = cc.coupon_uuid AND (cart_uuid = $1) AND (used = $2)', [req.session.user.cart_uuid, false])
        .then(function (result) {
        couponContent = result.rows;
        var _loop_1 = function (i) {
            couponContent[i].email = req.session.user.email;
            if (result.rows[i].used === true) {
                couponContent = result.rows.filter(function (e) { return e !== result.rows[i]; });
            }
        };
        for (var i = 0; i < couponContent.length; i++) {
            _loop_1(i);
        }
        res.render('coupons/coupons', {
            couponContent: couponContent,
            email: req.session.user.email
        });
    })
        .catch(function (error) {
        console.log(error);
        res.redirect('/accounts/' + req.session.user.email + '/cart');
    });
});
router.route('/coupons/:coupon_uuid')
    .put(function (req, res) {
    var couponID = req.body.coupon_uuid;
    var discount = 0;
    var applies_to;
    console.log(true, req.session.user.cart_uuid, couponID);
    db.query('SELECT applied FROM cart_coupons WHERE cart_uuid = $1 AND coupon_uuid = $2', [req.session.user.cart_uuid, couponID])
        .then(function (result) {
        if (result.rows[0].applied) {
            db.query('UPDATE cart_coupons SET applied = $1 WHERE cart_uuid = $2 AND coupon_uuid = $3', [false, req.session.user.cart_uuid, couponID])
                .then(function (result) {
                return db.query('SELECT discount, applies_to FROM coupons WHERE coupon_uuid = $1', [couponID]);
            })
                .then(function (result) {
                discount = 0;
                applies_to = result.rows[0].applies_to;
                if (applies_to === 'order') {
                    return db.query('UPDATE cart_items SET discount = $1 WHERE cart_uuid = $2', [discount, req.session.user.cart_uuid]);
                }
                else {
                    return db.query('UPDATE cart_items SET discount = $1 WHERE cart_uuid = $2 AND product_id = $3', [discount, req.session.user.cart_uuid, applies_to]);
                }
            })
                .then(function (result) {
                // res.render('home')
                res.redirect('/accounts/' + req.session.user.email + '/coupons');
            })
                .catch(function (error) {
                console.log(error);
                res.redirect('/accounts/' + req.session.user.email + '/cart');
            });
        }
        else {
            db.query('UPDATE cart_coupons SET applied = $1 WHERE cart_uuid = $2 AND coupon_uuid = $3', [true, req.session.user.cart_uuid, couponID])
                .then(function (result) {
                return db.query('SELECT discount, applies_to FROM coupons WHERE coupon_uuid = $1', [couponID]);
            })
                .then(function (result) {
                discount = result.rows[0].discount;
                applies_to = result.rows[0].applies_to;
                if (applies_to === 'order') {
                    return db.query('UPDATE cart_items SET discount = $1 WHERE cart_uuid = $2', [discount, req.session.user.cart_uuid]);
                }
                else {
                    return db.query('UPDATE cart_items SET discount = $1 WHERE cart_uuid = $2 AND product_id = $3', [discount, req.session.user.cart_uuid, applies_to]);
                }
            })
                .then(function (result) {
                // res.render('home')
                res.redirect('/accounts/' + req.session.user.email + '/coupons');
            })
                .catch(function (error) {
                console.log(error);
                res.redirect('/accounts/' + req.session.user.email + '/cart');
            });
        }
    });
});
module.exports = router;
//# sourceMappingURL=coupons.js.map