import PhotoSvc from '../logic/logic-photos';
import * as express from 'express';
const photoRouter = express.Router();

photoRouter.route('/photos')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)

        svc.getPhotos()
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })

    /// TEST FOR DIFFERENT ROUTE
photoRouter.route('/videos')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('videos')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })

photoRouter.route('/dreams')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('dreams')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })
photoRouter.route('/movement')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('movement')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })

photoRouter.route('/objects')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('objects')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })    

// photoRouter.route('/photos')
//     .get((req, res) => {
//         let svc = new PhotoSvc(req.querySvc)
//         console.log('this is the new route chosen from the html load this is the most important test')
//         svc.getPhotos('photos')
//             .then(albums => {
//                 res.json(albums)
//             })
//             .catch(e => {
//                 console.log(e)
//                 res.json({
//                     status: "FAILED",
//                     error: e
//                 })
//             })
//     })

photoRouter.route('/sketches')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('sketches')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })
photoRouter.route('/social')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('social')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })

photoRouter.route('/writing')
    .get((req, res) => {
        let svc = new PhotoSvc(req.querySvc)
        console.log('this is the new route chosen from the html load this is the most important test')
        svc.getPhotos('writing')
            .then(albums => {
                res.json(albums)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status: "FAILED",
                    error: e
                })
            })
    })    

export default photoRouter;