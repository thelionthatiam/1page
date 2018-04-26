import {
    payPal,
    ach,
    aliPay,
    googlePlay,
    stripe
} from '../services/transaction-helpers';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import TransSvc from '../logic/logic-trans';
import * as express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    console.log('transaction started', req.session.user)
    let transSvc = new TransSvc(req.querySvc, req.session.user)
    transSvc.transact()
        .then(() => res.redirect('/app/account'))
        .catch(err => {
            console.log(err)
            res.redirect('/app/account')
        })
})

export default router;