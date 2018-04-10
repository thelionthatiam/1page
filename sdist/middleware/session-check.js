"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_middleware_1 = require("../logic/logic-middleware");
function sessionCheck(req, res, next) {
    if (req.session.user && req.sessionID) {
        if (req.session.user.permission === 'user') {
            req.SessionCheckSvc = new logic_middleware_1.SessionCheckSvc(req.querySvc, req.session.user);
            req.SessionCheckSvc.getPermissions()
                .then(function (permission) {
                res.locals.permission = permission; // SEEMS THAT PERMISSION IS UNDEFINED
                // move the following to server-render-state maybe
                res.locals.loggedIn = true;
                res.locals.email = req.session.user.email;
                res.locals.uuid = req.session.user.uuid;
                next();
            })
                .catch(function (error) {
                console.log(error.stack);
                // move the following to server-render-state maybe
                res.locals.permission = 'guest';
                res.locals.loggedIn = false;
                res.locals.email = null;
                res.locals.uuid = null;
                res.render('login', { dbError: "you were no longer logged in, try to log in again" });
            });
        }
        else {
            console.log('session check says Im a guest');
            res.locals.permission = 'guest';
            next();
        }
    }
    else {
        console.log('session check says Im a guest');
        res.locals.permission = 'guest';
        next();
    }
}
exports.default = sessionCheck;
//# sourceMappingURL=session-check.js.map