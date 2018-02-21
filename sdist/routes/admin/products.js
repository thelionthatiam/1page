import { dbErrTranslator } from '../../functions/helpers';
import * as express from 'express';
import { db } from '../../middleware/async-database';
var router = express.Router();
router.route('/products')
    .post(function (req, res) {
    var product_id = req.body.product_id, universal_id = req.body.universal_id, price = req.body.price, name = req.body.name, description = req.body.description, size = req.body.size, img = req.body.img;
    var query = 'INSERT INTO products(product_id, universal_id, price, name, description, size, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    var input = [product_id, universal_id, price, name, description, size, img];
    db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/products');
    })
        .catch(function (err) {
        console.log(err);
        var userError = dbErrTranslator(err.message);
        res.render('error', { dbError: userError });
    });
})
    .get(function (req, res) {
    db.query("SELECT * FROM products", [])
        .then(function (result) {
        var productContent = result.rows;
        res.render('admin/products/products', {
            productContent: productContent
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
router.get('/new-product', function (req, res, next) {
    res.render('admin/products/new-product', {});
});
router.route('/products/:product_id')
    .get(function (req, res) {
    var product_id = req.query.product_id;
    db.query("SELECT * FROM products WHERE product_id = $1", [product_id])
        .then(function (result) {
        var product = result.rows[0];
        res.render('admin/products/edit-product', {
            original_product_id: product_id,
            product_id: product.product_id,
            universal_id: product.universal_id,
            price: product.price,
            name: product.name,
            description: product.description,
            size: product.size,
            img: product.img,
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var product_id = req.body.product_id, universal_id = req.body.universal_id, price = parseInt(req.body.price), name = req.body.name, description = req.body.description, size = req.body.size, img = req.body.img, original_product_id = req.body.original_product_id;
    // console.log("product_id: \n",product_id, "universal_id: \n",universal_id, "price: \n",price, "name: \n",name, "description: \n",description, "size: \n",size, "img: \n",img, "original_product_id: \n",original_product_id)
    var query = 'UPDATE products SET (product_id, universal_id, price, name, description, size, image) = ($1, $2, $3, $4, $5, $6, $7) WHERE product_id = $8';
    var input = [product_id, universal_id, price, name, description, size, img, original_product_id];
    db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/products');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var product_id = req.body.product_id;
    db.query('DELETE FROM products WHERE product_id = $1', [product_id])
        .then(function (result) {
        res.redirect('/admin/products');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
module.exports = router;
//# sourceMappingURL=products.js.map