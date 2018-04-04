import * as express from 'express';
import auth from './routes/guest-authorization';
import accts from './routes/guest-accounts';
import appLayout from './middleware/choose-layout';
import allOrgs from './routes/organizations';

import profile from './routes/user-account'
import allUserData from './routes/user-all';
import alarms from './routes/user-alarms';
import orgs from './routes/user-organizations';
import settings from './routes/user-settings';
import payment from './routes/user-payment';

const router = express.Router();


router.use('/', auth);
router.use('/', accts);
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));

router.use('/app*', appLayout)
router.use('/app/orgs', allOrgs);

// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));

router.use('/app/accounts/:email', profile)
router.use('/app/accounts/:email', allUserData)
router.use('/app/accounts/:email/alarms', alarms);
router.use('/app/accounts/:email/orgs', orgs);
router.use('/app/accounts/:email/settings', settings);
router.use('/app/accounts/:email/payment', payment);
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/transactions'));


// HOME

router.get('/', function (req, res) {
    res.render('home', {home:true})
})

// TO LOGIN PAGE
router.get('/to-login', (req, res) => {
    res.render('login');
})

// APP
router.get('/app', (req, res) => 
    req.session.user ? res.redirect('app/account') : res.redirect('app/guest')
)

router.get('/app/guest', (req, res) => {
  res.render('guest/app')
})

router.get('/app/account', (req, res) => {
    req.session.user ? res.render('account/app') : res.redirect('/app/guest')
})

// NO JS ALARMS

router.get('/app/guest/alarms', (req, res) => {
    res.render('guest/alarms');
})

// TEST
let dummy = {
    "video": [
        {
            "id": "12312412312",
            "name": "Ecuaciones Diferenciales",
            "url": "/video/math/edo/12312412312",
            "author": {
                "data": [
                    {
                        "name_author": "Alejandro Morales",
                        "uri": "/author/alejandro-morales",
                        "type": "master"
                    }
                ]
            }
        }
    ]
}

router.get('/test', (req, res) => {
    res.render('test-page', {
        dummy: JSON.stringify(dummy)
    })
})


router.get('/dummy-route', (req, res) => {
  res.render('dummy');
})

module.exports = router;
