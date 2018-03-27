import * as express from 'express';
const router = express.Router();

let nonZeroRow = (user, result, object) => result.rowCount > 0 ? user[object] = result.rows : user[object] = 'n/a'

router.get('/all', (req, res, next) => {
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


module.exports = router;