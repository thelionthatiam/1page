import * as express from 'express';
const allUserData = express.Router();

let nonZeroRow = (user, result, object) => result.rowCount > 0 ? user[object] = result.rows : user[object] = 'n/a'

allUserData.get('/all', (req, res, next) => {
    let user = {};
    req.querySvc.getOrgsViaEmail([req.session.user.uuid])
        .then((result) => {
            nonZeroRow(user, result, "orgs")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.querySvc.getAlarms([req.session.user.uuid])
        })
        .then((result) => {
            nonZeroRow(user, result, "alarms")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.querySvc.getSettingsViaEmail([req.session.user.uuid])
        })
        .then((result) => {
            nonZeroRow(user, result, "settings")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.querySvc.getUser([req.session.user.uuid])
        })
        .then((result) => {
            nonZeroRow(user, result, "profile")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')

            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(user)
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
            res.json(user)
        })
        .catch(err => console.log(err))
})


export default allUserData;