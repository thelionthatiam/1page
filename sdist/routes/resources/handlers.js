"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var r = require("../resources/value-objects");
var router = express.Router();
exports.router = router;
var BaseRequestHandler = /** @class */ (function () {
    function BaseRequestHandler(req, res, nextPage, errPage) {
        this.req = req;
        this.res = res;
        this.inputs = req.query;
        this.aQuery = req.aQuery;
        this.nextPage = nextPage;
        this.errPage = errPage;
    }
    BaseRequestHandler.prototype.handler = function () {
        var _this = this;
        this.aQuery.selectUser([this.inputs.email])
            .then(function (result) {
            return r.UserDB.fromJSON(result.rows[0]);
        })
            .then(function (result) {
            _this.onSuccess(result);
        })
            .catch(function (error) {
            _this.onFailure(error);
        });
    };
    BaseRequestHandler.prototype.onSuccess = function (renderObj) {
        return this.res.render(this.nextPage, renderObj);
    };
    BaseRequestHandler.prototype.onFailure = function (error) {
        return this.res.render(this.errPage, { dbError: error });
    };
    return BaseRequestHandler;
}());
exports.BaseRequestHandler = BaseRequestHandler;
//# sourceMappingURL=handlers.js.map