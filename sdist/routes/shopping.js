"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../functions/helpers");
var express = require("express");
var database_1 = require("../middleware/database");
var router = express.Router();
var viewPrefix = 'shopping/';
router.route('/products')
    .post(function (req, res) {
    // all happens via admin
})
    .get(function (req, res) {
    var email = req.session.user.email;
    database_1.db.query('SELECT * FROM products', [])
        .then(function (result) {
        var productContent = result.rows;
        for (var i = 0; i < productContent.length; i++) {
            productContent[i].email = email;
        }
        res.render(viewPrefix + 'products', {
            productContent: productContent,
            email: email
        });
    })
        .catch(function (err) {
        console.log(err);
        var userError = helpers_1.dbErrTranslator(err.message);
        res.render(viewPrefix + 'products', { dbError: userError });
    });
});
module.exports = router;
//# sourceMappingURL=shopping.js.map