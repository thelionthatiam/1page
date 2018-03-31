"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderState(req, res, next) {
    console.log('render state running');
    console.log(res.locals.permission);
    if (res.locals.permission === 'user') {
        var userState_1 = {};
        req.aQuery.selectUserOrgs([req.session.user.uuid])
            .then(function (result) {
            result.rowCount > 0 ? userState_1.orgs = result.rows : userState_1.settings = 'n/a';
            return req.aQuery.selectAlarms([req.session.user.uuid]);
        })
            .then(function (result) {
            result.rowCount > 0 ? userState_1.alarms = result.rows : userState_1.settings = 'n/a';
            return req.aQuery.selectUserSettings([req.session.user.uuid]);
        })
            .then(function (result) {
            result.rowCount > 0 ? userState_1.settings = result.rows[0] : userState_1.settings = 'n/a';
            return req.aQuery.selectAuthenticatedUser([req.session.user.uuid]);
        })
            .then(function (result) {
            result.rowCount > 0 ? userState_1.profile = result.rows[0] : userState_1.profile = 'n/a';
            res.locals.userState = userState_1;
            console.log(res.locals.userState);
            next();
        })
            .catch(function (err) {
            console.log(err);
            res.locals.userState = 'n/a';
            res.locals.permission = 'guest';
            res.redirect('/log-out', { dbError: err });
        });
    }
    else {
        console.log('render state says im a guest');
        next();
    }
}
exports.default = renderState;
//# sourceMappingURL=server-render-state.js.map