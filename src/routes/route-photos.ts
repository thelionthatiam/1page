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

export default photoRouter;