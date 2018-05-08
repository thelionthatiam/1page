import * as express from 'express';
import * as request from 'request';
import testRouter from './routes/route-test';
const index = express.Router()

index.use('/', testRouter)

index.route('/')
    .get((req, res) => {
        res.render('home')
    })

export default index;