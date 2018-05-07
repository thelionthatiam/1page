import * as express from 'express';
import * as request from 'request';
const index = express.Router()


index.route('/')
    .get( (req, res) => {
        res.render('home')
    })


export default index;