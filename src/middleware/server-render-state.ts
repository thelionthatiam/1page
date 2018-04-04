function renderState(req, res, next) {
    if (res.locals.permission === 'user') {
        console.log('render state says Im a user', res.locals)
        res.locals.loggedIn = true;
        let userState:any = {};
        req.aQuery.selectUserOrgs([req.session.user.uuid])
            .then((result) => {
                result.rowCount > 0 ? userState.orgs = result.rows : userState.settings = 'n/a';
                return req.aQuery.selectAlarms([req.session.user.uuid])
            })
            .then((result) => {
                result.rowCount > 0 ? userState.alarms = result.rows : userState.settings = 'n/a';
                return req.aQuery.selectUserSettings([req.session.user.uuid])
            })
            .then((result) => {
                result.rowCount > 0 ? userState.settings = result.rows[0] : userState.settings = 'n/a';
                return req.aQuery.selectAuthenticatedUser([req.session.user.uuid])
            })
            .then((result) => {
                result.rowCount > 0 ? userState.profile = result.rows[0] : userState.profile = 'n/a';
                res.locals.userState = userState;
                res.locals.email = req.session.user.email
                res.locals.uuid = req.session.user.uuid
                next()
            })
            .catch(err => {
                console.log(err)
                res.locals.userState = 'n/a';
                res.locals.permission = 'guest';
                res.redirect('/log-out', {dbError:err});
            })
    } else {
        res.locals.loggedIn = false;
        console.log('render state says im a guest')
        next()
    }
}


export default renderState;
