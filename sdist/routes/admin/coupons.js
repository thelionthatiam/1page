"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../../functions/helpers");
var express = require("express");
var async_database_1 = require("../../middleware/async-database");
var router = express.Router();
var cpn = {
    name: '',
    description: '',
    discount: 0,
    expires_on: '',
    applies_to: '',
    uuid: ''
};
router.route('/coupons')
    .post(function (req, res) {
    cpn.name = req.body.name;
    cpn.description = req.body.description;
    cpn.discount = req.body.discount;
    cpn.expires_on = req.body.expires_on;
    cpn.applies_to = req.body.applies_to;
    var query = 'INSERT INTO coupons(name, description, discount, expires_on, applies_to) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    var input = [cpn.name, cpn.description, cpn.discount, cpn.expires_on, cpn.applies_to];
    async_database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/coupons');
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render('error', { dbError: userError });
    });
})
    .get(function (req, res) {
    async_database_1.db.query("SELECT * FROM coupons", [])
        .then(function (result) {
        var couponContent = result.rows;
        res.render('admin/coupons/coupons', {
            couponContent: couponContent
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('error', {
            errName: err.message,
            errMessage: null
        });
    });
});
router.get('/new-coupon', function (req, res, next) {
    res.render('admin/coupons/new-coupon', {});
});
router.route('/coupons/:uuid')
    .get(function (req, res) {
    var uuid = req.query.uuid;
    async_database_1.db.query("SELECT * FROM coupons WHERE coupon_uuid = $1", [uuid])
        .then(function (result) {
        var coupon = result.rows[0];
        cpn.uuid = uuid;
        cpn.name = coupon.name;
        cpn.description = coupon.description;
        cpn.discount = coupon.discount;
        cpn.expires_on = coupon.expires_on;
        cpn.applies_to = coupon.applies_to;
        res.render('admin/coupons/edit-coupon', cpn);
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    cpn.name = req.body.name;
    cpn.description = req.body.description;
    cpn.discount = req.body.discount;
    cpn.expires_on = req.body.expires_on;
    cpn.applies_to = req.body.applies_to;
    cpn.uuid = req.body.uuid;
    var query = 'UPDATE coupons SET (name, description, discount, expires_on, applies_to) = ($1, $2, $3, $4, $5, $6, $7) WHERE coupon_uuidname = $8';
    var input = [cpn.name, cpn.description, cpn.discount, cpn.expires_on, cpn.applies_to, cpn.uuid];
    async_database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/coupons');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    cpn.uuid = req.body.uuid;
    async_database_1.db.query('DELETE FROM coupons WHERE coupon_uuid = $1', [cpn.uuid])
        .then(function (result) {
        res.redirect('/admin/coupons');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
router.post('/coupons/issue-coupon', function (req, res) {
    var coupon_uuid = req.body.uuid;
    async_database_1.db.query('SELECT cart_uuid FROM cart', [])
        .then(function (result) {
        var cart_uuids = result.rows;
        var promiseArray = [];
        for (var i = 0; i < cart_uuids.length; i++) {
            promiseArray.push(async_database_1.db.query('INSERT INTO cart_coupons(coupon_uuid, cart_uuid) VALUES ($1, $2)', [coupon_uuid, cart_uuids[i].cart_uuid]));
        }
        return Promise.all(promiseArray);
    })
        .then(function (result) {
        console.log(result);
        res.redirect('admin/coupons');
    })
        .catch(function (error) {
        console.log(error);
        res.render('error');
    });
});
module.exports = router;
//# sourceMappingURL=coupons.js.map