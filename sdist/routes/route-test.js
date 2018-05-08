"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_test_1 = require("../logic/logic-test");
var express = require("express");
var testRouter = express.Router();
testRouter.route('/test')
    .post(function (req, res) {
    var svc = new logic_test_1.default(req.querySvc, req.body);
    svc.testPost()
        .then(function () {
        res.json({ status: "OK" });
    })
        .catch(function (e) {
        console.log(e);
        res.json({
            status: "FAILED",
            error: e
        });
    });
})
    .get(function (req, res) {
    var svc = new logic_test_1.default(req.querySvc, req.body);
    svc.testGet()
        .then(function (result) {
        res.json(result);
    })
        .catch(function (e) {
        console.log(e);
        res.json({
            status: "FAILED",
            error: e
        });
    });
});
exports.default = testRouter;
//# sourceMappingURL=route-test.js.map