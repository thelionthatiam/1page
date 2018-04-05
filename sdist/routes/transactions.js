"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const r = require("../resources/value-objects");
const express = require("express");
let router = express.Router();
router.route('/finish-month')
    .post((req, res) => {
    let dismisses;
    let snoozes;
    let wakes;
    let total;
    let payment_uuid;
    let recipient;
    let user = r.UserSession.fromJSON(req.session.user);
    req.querySvc.selectSnoozes([user.uuid, false])
        .then((result) => {
        snoozes = result.rowCount;
        return req.querySvc.selectDismisses([user.uuid, false]);
    })
        .then((result) => {
        dismisses = result.rowCount;
        return req.querySvc.selectWakes([user.uuid, false]);
    })
        .then((result) => {
        wakes = result.rowCount;
        return req.querySvc.selectSnoozes([user.uuid, false]);
    });
});
module.exports = router;
//# sourceMappingURL=transactions.js.map