var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as express from 'express';
import * as help from '../functions/helpers';
import * as bcrypt from 'bcrypt';
import * as uuidv4 from 'uuid/v4';
import * as r from '../resources/value-objects';
import { watchAlarms } from '../functions/alarm';
import { BaseRequestHandler } from '../resources/handlers';
import { db } from '../middleware/database';
var router = express.Router();
var AuthHandler = /** @class */ (function (_super) {
    __extends(AuthHandler, _super);
    function AuthHandler(req, res, nextPage, errPage) {
        var _this = _super.call(this, req, res, nextPage, errPage) || this;
        _this.inputs = req.body;
        return _this;
    }
    AuthHandler.prototype.handler = function () {
        var _this = this;
        var renderObj;
        var user;
        var cart;
        var userSession;
        this.aQuery.selectUser([this.inputs.email])
            .then(function (result) {
            if (result.rows.length === 0) {
                throw new Error("Email not found");
            }
            else {
                user = r.UserDB.fromJSON(result.rows[0]);
                return bcrypt.compare(_this.inputs.password, user.password);
            }
        })
            .then(function (result) {
            if (result === false) {
                throw new Error('Password incorrect');
            }
            else {
                return help.regenerateSession(_this.req);
            }
        })
            .then(function () {
            return _this.aQuery.updateSessionID([_this.req.sessionID, user.user_uuid]);
        })
            .then(function (result) {
            userSession = r.UserSession.fromJSON({
                email: user.email,
                uuid: user.user_uuid,
                permission: user.permission,
                name: user.name
            });
            _this.req.session.user = userSession;
            watchAlarms(userSession);
            renderObj = {
                email: user.email,
                name: user.name
            };
            if (user.permission === 'admin') {
                _this.res.render('admin/home');
            }
            else if (user.permission === 'user') {
                _this.onSuccess(renderObj);
            }
        })
            .catch(function (error) {
            console.log(error);
            _this.onFailure(error);
        });
    };
    return AuthHandler;
}(BaseRequestHandler));
router.post('/authorized', function (req, res) {
    var auth = new AuthHandler(req, res, 'home', 'login');
    auth.handler();
});
router.post('/log-out', function (req, res, next) {
    var inactive = uuidv4(); //if its uuidv4 its inactive
    db.query('UPDATE session SET sessionid = $1 WHERE user_uuid = $2', [inactive, req.session.user.uuid])
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