import TestSvc from '../logic/logic-test';
import * as express from 'express';
const testRouter = express.Router();

testRouter.route('/test')
    .post((req, res) => {
        let svc = new TestSvc(req.querySvc, req.body)
        svc.testPost()
            .then(() => {
                res.json({status:"OK"})
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status:"FAILED",
                    error:e
                })
            })
    })
    .get((req, res) => {
        let svc = new TestSvc(req.querySvc, req.body)
        svc.testGet()
            .then(result => {
                res.json(result)
            })
            .catch(e => {
                console.log(e)
                res.json({
                    status:"FAILED",
                    error:e
                })
            })
    })

export default testRouter;