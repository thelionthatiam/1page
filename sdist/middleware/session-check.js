"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper = require("../functions/helpers");
var async_database_1 = require("../middleware/async-database");
var express = require("express");
var router = express.Router();
function check(req, res, next) {
    console.log('SESSION CHECK MIDDLEWARE RUNNING');
    if (req.session.user && req.sessionID) {
        console.log('SESSION USER AND SESSION ID EXIST');
        async_database_1.db.query('SELECT sessionID FROM session WHERE user_uuid = $1', [req.session.user.uuid])
            .then(function (result) {
            if (result.rows[0].sessionid === req.sessionID) {
                console.log('SESSIONID MATCHES DATABASE');
                return async_database_1.db.query('SELECT permission FROM users WHERE user_uuid = $1', [req.session.user.uuid]);
            }
            else {
                helper.genError(res, 'login', "you were no longer logged in, try to log in again");
            }
        })
            .then(function (result) {
            if (result.rows[0].permission === 'admin') {
                next();
            }
            else if (result.rows[0].permission === 'user') {
                console.log('USER IS A USER');
                next();
            }
            else if (result.rows[0].permission === 'guest') {
            }
        })
            .catch(function (error) {
            console.log(error.stack);
            helper.genError(res, 'login', "you were no longer logged in, try to log in again");
        });
    }
    else {
        console.log('USER IS A GUEST');
        next();
    }
}
exports.check = check;
//# sourceMappingURL=session-check.js.map