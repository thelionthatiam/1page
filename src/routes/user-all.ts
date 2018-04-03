import * as express from 'express';
const allUserData = express.Router();

let nonZeroRow = (user, result, object) => result.rowCount > 0 ? user[object] = result.rows : user[object] = 'n/a'

allUserData.get('/all', (req, res, next) => {
    let user = {};
    req.aQuery.selectUserOrgs([req.session.user.uuid])
        .then((result) => {
            nonZeroRow(user, result, "orgs")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.aQuery.selectAlarms([req.session.user.uuid])
        })
        .then((result) => {
            nonZeroRow(user, result, "alarms")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.aQuery.selectUserSettings([req.session.user.uuid])
        })
        .then((result) => {
            nonZeroRow(user, result, "settings")
            console.log('^^^^^^^^^^^^^^^')
            console.log(user)
            console.log('^^^^^^^^^^^^^^^')
            return req.aQuery.selectAuthenticatedUser([req.session.user.uuid])
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