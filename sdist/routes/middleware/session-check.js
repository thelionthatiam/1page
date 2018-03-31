"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper = require("../functions/helpers");
var database_1 = require("./database");
// console.log('>>>>SESSION CHECK MIDDLEWARE RUNNING')
function sessionCheck(req, res, next) {
    if (req.session.user && req.sessionID) {
        database_1.db.query('SELECT sessionID FROM session WHERE user_uuid = $1', [req.session.user.uuid])
            .then(function (result) {
            if (result.rows[0].sessionid === req.sessionID) {
                return database_1.db.query('SELECT permission FROM users WHERE user_uuid = $1', [req.session.user.uuid]);
            }
            else {
                helper.genError(res, 'login', "you were no longer logged in, try to log in again");
            }
        })
            .then(function (result) {
            if (result.rows[0].permission === 'admin') {
                res.locals.permission = 'admin';
                next();
            }
            else if (result.rows[0].permission === 'user') {
                console.log('>>>>USER IS A USER: ', req.session.user);
                res.locals.permission = 'user';
                next();
            }
            else if (result.rows[0].permission === 'guest') {
                res.locals.psermission = 'guest';
                next();
            }
        })
            .catch(function (error) {
            console.log(error.stack);
            helper.genError(res, 'login', "you were no longer logged in, try to log in again");
        });
    }
    else {
        res.locals.permission = 'guest';
        next();
    }
}
exports.default = sessionCheck;
//# sourceMappingURL=session-check.js.map