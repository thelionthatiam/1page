import * as express from 'express';
import * as request from 'request';
import photoRouter from './routes/route-photos';
const index = express.Router()

index.use('/', photoRouter)

index.route('/photo')
    .get((req, res) => {    
        res.render('photos')
    })

index.route('/')
    .get((req, res) => {
        res.render('home')
    })

index.route('/about')
    .get((req, res,) => {
        res.render('about')
    })
export default index;