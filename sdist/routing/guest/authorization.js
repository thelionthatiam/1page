"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var help = require("../functions/helpers");
var bcrypt = require("bcrypt");
var uuidv4 = require("uuid/v4");
var r = require("../resources/value-objects");
var alarm_1 = require("../functions/alarm");
var database_1 = require("../middleware/database");
var router = express.Router();
router.post('/authorized', function (req, res) {
    var inputs = {
        email: req.body.email,
        password: req.body.password
    };
    var renderObj;
    var user;
    var cart;
    var userSession;
    req.querySvc.getUserViaEmail([inputs.email])
        .then(function (result) {
        if (result.rows.length === 0) {
            throw new Error("Email not found");
        }
        else {
            user = r.UserDB.fromJSON(result.rows[0]);
            return bcrypt.compare(inputs.password, user.password);
        }
    })
        .then(function (result) {
        if (result === false) {
            throw new Error('Password incorrect');
        }
        else {
            return help.regenerateSession(req);
        }
    })
        .then(function () {
        return req.querySvc.updateSessionID([req.sessionID, user.user_uuid]);
    })
        .then(function (result) {
        userSession = r.UserSession.fromJSON({
            email: user.email,
            uuid: user.user_uuid,
            permission: user.permission,
            name: user.name
        });
        req.session.user = userSession;
        // watchAlarms(userSession);
        // Q-ftR0NTm0-ikmeHa6i4RaM955qefD8R
        renderObj = {
            email: user.email,
            name: user.name
        };
        if (user.permission === 'admin') {
            res.render('admin/home');
        }
        else if (user.permission === 'user') {
            console.log(result);
            res.render('app');
            // res.render('home', {
            //   email:req.session.user.email,
            //   name:req.session.user.name
            // })
        }
    })
        .catch(function (error) {
        console.log(error);
        res.render('login', {
            dbError: error
        });
    });
});
router.post('/api/authorized', function (req, res) {
    console.log('start authorized post');
    var inputs = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(inputs);
    var renderObj;
    var user;
    var cart;
    var userSession;
    req.querySvc.getUserViaEmail([inputs.email])
        .then(function (result) {
        if (result.rows.length === 0) {
            throw new Error("Email not found");
        }
        else {
            console.log('select user', result.rows[0]);
            user = r.UserDB.fromJSON(result.rows[0]);
            return bcrypt.compare(inputs.password, user.password);
        }
    })
        .then(function (result) {
        if (result === false) {
            throw new Error('Password incorrect');
        }
        else {
            console.log('pass quick', result);
            return help.regenerateSession(req);
        }
    })
        .then(function () {
        console.log(req.sessionID);
        return req.querySvc.updateSessionID([req.sessionID, user.user_uuid]);
    })
        .then(function (result) {
        console.log(req.sessionID);
        userSession = r.UserSession.fromJSON({
            email: user.email,
            uuid: user.user_uuid,
            permission: user.permission,
            name: user.name
        });
        console.log('user session', userSession);
        req.session.user = userSession;
        console.log('session general', req.session);
        console.log('usersession on session', req.session.user);
        console.log('id', req.sessionID);
        alarm_1.watchAlarms(userSession);
        renderObj = {
            email: user.email,
            name: user.name
        };
        if (user.permission === 'admin') {
            res.render('admin/home');
        }
        else if (user.permission === 'user') {
            console.log(result);
            res.json(result);
        }
    })
        .catch(function (error) {
        console.log(error);
        res.json(error);
    });
});
router.post('/log-out', function (req, res, next) {
    var inactive = uuidv4(); //if its uuidv4 its inactive
    database_1.db.query('UPDATE session SET sessionid = $1 WHERE user_uuid = $2', [inactive, req.session.user.uuid])
        .then(function (result) {
        req.session.destroy(function (err) {
            if (err) {
                res.render('error', { errName: err.message, errMessage: null });
            }
            else {
                console.log("after destory", req.session);
                res.render('login');
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=authorization.js.map