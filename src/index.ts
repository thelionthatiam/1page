import * as express from 'express';
import * as request from 'request';
import photoRouter from './routes/route-photos';
const index = express.Router()

index.use('/content', photoRouter)

index.route('/dreams')
    .get((req, res) => {    
        res.render('dreams')
    })


index.route('/movement')
    .get((req, res) => {
        res.render('movement')
    })


index.route('/objects')
    .get((req, res) => {
        res.render('objects')
    })

index.route('/photos')
    .get((req, res) => {
        res.render('photos')
    })

index.route('/sketches')
    .get((req, res) => {
        res.render('sketches')
    })

index.route('/social')
    .get((req, res) => {
        res.render('social')
    })

index.route('/videos')
    .get((req, res) => {
        res.render('videos')
    })

index.route('/writing')
    .get((req, res) => {
        res.render('writing')
    })

index.route('/')
    .get((req, res) => {
        res.render('home')
    })

index.route('/about')
    .get((req, res,) => {
        res.render('about')
    })

index.route('/test')
    .get((req, res) => {
        res.render('test')
    })

index.route('/current')
    .get((req, res) => {
        res.render('current')
    })
export default index;