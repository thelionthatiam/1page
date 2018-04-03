import * as express from 'express';
import { dbErrTranslator, compare } from '../functions/helpers';
import { watchAlarms } from '../functions/alarm'
import { db } from '../middleware/database';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('guest/alarms')
    })

module.exports = router;
