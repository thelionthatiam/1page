import * as e from './services/error-handling';
import * as express from 'express';
const err = express.Router()

err.use(function (req, res, next) {
    res.status(404);
    res.render('error', {
        errName: null,
        errMessage: "We couldn't find this page.",
        layout: 'react'
    });
});

err.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err.name === 'PayloadTooLargeError') {
        res.status(413);
        res.render('error', {
            errName: err.message,
            errMessage: "You entered something over 50kb. Please make your inputs are smaller and try again.",
            layout: 'react'
        });
    } else if (err.name === 'ReferenceError') {
        res.status(500);
        res.render('error', {
            errName: err.message,
            errMessage: "Something was missing.",
            layout: 'react'
        });
    } else if (e.serverErrorFileNotFound.test(err.message)) {
        res.status(404)
        res.render('error', {
            number: "404", // only because 404 is well-known to users
            errName: err.message,
            errMessage: "Could not find this page!",
            layout: 'react'
        })
    } else {
        res.status(500);
        res.render('error', {
            errName: err.message,
            errMessage: null,
            layout: 'react'
        });
    }
})


export default err;