"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_test_1 = require("../logic/logic-test");
const express = require("express");
const testRouter = express.Router();
testRouter.route('/test')
    .post((req, res) => {
    let svc = new logic_test_1.default(req.querySvc, req.body);
    svc.testPost()
        .then(() => {
        res.json({ status: "OK" });
    })
        .catch(e => {
        console.log(e);
        res.json({
            status: "FAILED",
            error: e
        });
    });
})
    .get((req, res) => {
    let svc = new logic_test_1.default(req.querySvc, req.body);
    svc.testGet()
        .then(result => {
        res.json(result);
    })
        .catch(e => {
        console.log(e);
        res.json({
            status: "FAILED",
            error: e
        });
    });
});
exports.default = testRouter;
//# sourceMappingURL=route-test.js.map