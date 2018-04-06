"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_middleware_1 = require("../logic/logic-middleware");
function sessionCheck(req, res, next) {
    if (req.session.user && req.sessionID) {
        req.SessionCheckSvc = new logic_middleware_1.SessionCheckSvc(req.querySvc, req.session.user);
        req.SessionCheckSvc.getPermissions()
            .then(function (permission) {
            res.locals.permission = permission;
            next();
        })
            .catch(function (error) {
            console.log(error.stack);
            res.render('login', { dbError: "you were no longer logged in, try to log in again" });
        });
    }
    else {
        res.locals.permission = 'guest';
        next();
    }
}
exports.default = sessionCheck;
//# sourceMappingURL=session-check.js.map