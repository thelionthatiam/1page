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

const index = express.Router();


index.use('/', auth);
index.use('/', accts);
// router.use('/', require('./guest/email'));
// router.use('/guest', require('./guest/shopping'));

index.use('/app*', appLayout)
index.use('/app/orgs', allOrgs);

// router.use('/admin', require('./admin/products'));
// router.use('/admin', require('./admin/coupons'));
// router.use('/admin', require('./admin/accounts'));

index.use('/app/accounts/:email', profile)
index.use('/app/accounts/:email', allUserData)
index.use('/app/accounts/:email/alarms', alarms);
index.use('/app/accounts/:email/orgs', orgs);
index.use('/app/accounts/:email/settings', settings);
index.use('/app/accounts/:email/payment', payment);
// router.use('/accounts/:email', require('./account/cart'));
// router.use('/accounts/:email', require('./account/coupons'));
// router.use('/accounts/:email', require('./account/orders'));
// router.use('/accounts/:email', require('./account/transactions'));


// HOME

index.get('/', function (req, res) {
    res.render('home', {home:true})
})

// TO LOGIN PAGE
index.get('/to-login', (req, res) => {
    res.render('login');
})

// APP
index.get('/app', (req, res) => 
    req.session.user ? res.redirect('app/account') : res.redirect('app/guest')
)

index.get('/app/guest', (req, res) => {
  res.render('guest/app')
})

index.get('/app/account', (req, res) => {
    req.session.user ? res.render('app') : res.redirect('/app/guest')
})

// NO JS ALARMS

index.get('/app/guest/alarms', (req, res) => {
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

index.get('/test', (req, res) => {
    res.render('test-page')
})


index.get('/dummy-route', (req, res) => {
  res.render('dummy');
})

export default index;
