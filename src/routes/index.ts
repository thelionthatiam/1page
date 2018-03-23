import * as express from 'express';
import * as bcrypt from 'bcrypt';
const router = express.Router();

router.use('/', require('./authorization'));
router.use('/', require('./email'));
router.use('/', require('./accounts'));
router.use('/', require('./shopping'));
router.use('/', require('./organizations'));

router.use('/admin', require('./admin/products'));
router.use('/admin', require('./admin/coupons'));
router.use('/admin', require('./admin/accounts'));

router.use('/accounts', require('./account'));
router.use('/accounts/:email', require('./account/alarms'));
router.use('/accounts/:email', require('./account/payment'));
router.use('/accounts/:email', require('./account/organizations'));
router.use('/accounts/:email', require('./account/cart'));
router.use('/accounts/:email', require('./account/coupons'));
router.use('/accounts/:email', require('./account/orders'));

router.use('/accounts/:email', require('./account/settings'));
router.use('/accounts/:email', require('./account/transactions'));

// HOME
router.get('/', function (req, res, next) {
  console.log('--------------ROOT : ', req.session);
  console.log('--------------ROOT user information: ', req.session.user);
  res.render('home')
})

// APP
router.get('/app', (req, res) => {
  console.log('--------------APP : ', req.session);
  console.log('--------------APP user information: ', req.session.user);

  res.render('app');
})

// PERMISSION GETTER

router.get('/permission', (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  console.log('permission: ', req.session.user)
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")

  if (req.session.user === 'undefined') {
    req.session.user = {permission: 'guest'}
    console.log('after default def: ', req.session.user)
    res.json(JSON.stringify(req.session.user))
  }
  res.json(JSON.stringify(req.session.user));

})

// router.get('/permission-test', (req, res) => {
//   let data = JSON.stringify(req.session.user)
//   console.log('--------------TEST-PERMISSION :', data)
//   res.json(data);
// })

router.get('/dummy-route', (req, res) => {
  res.render('dummy');
})


// TO LOGIN PAGE

router.get('/to-login', (req, res) => {
  res.render('login');
})

// NEEDS GUEST AND USER BEHAVIOR
router.get('/contact', function (req, res, next) {
  res.render('contact');
})

router.get('/splash', function (req, res, next) {
  res.render('splash');
})

router.get('/home', (req, res) => {
  res.render('home', {
    email:req.session.user.email,
    name: req.session.user.name
  })
})

module.exports = router;
