"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("../services/value-objects");
var QuerySvc = /** @class */ (function () {
    function QuerySvc(conn) {
        this.conn = conn;
    }
    // select
    QuerySvc.prototype.returnUser = function (values) {
        var text = "SELECT * FROM users WHERE email = $1";
        this.conn.query(text, values)
            .then(function (res) { return R.UserDB.fromJSON(res.rows[0]); })
            .catch(function (e) { return e; });
    };
    QuerySvc.prototype.selectAuthenticatedUser = function (values) {
        var text = "SELECT * FROM users WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectUserOrgs = function (values) {
        var text = "SELECT * FROM user_orgs WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectOrder = function (values) {
        var text = "SELECT * FROM orders WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectCart = function (values) {
        var text = 'SELECT * FROM cart WHERE user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectOrgs = function (values) {
        var text = 'SELECT * FROM orgs';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectAlarms = function (values) {
        var text = 'SELECT * FROM alarms WHERE user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectUnpaidSnoozes = function (values) {
        var text = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectUnpaidDismisses = function (values) {
        var text = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectUnpaidWakes = function (values) {
        var text = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectUserSettings = function (values) {
        var text = 'SELECT * FROM user_settings where user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.selectPendingPayments = function (values) {
        var text = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
        return this.conn.query(text, values);
    };
    // insert
    QuerySvc.prototype.insertUser = function (values) {
        var text = 'INSERT INTO users(email, phone, password, name, permission) VALUES($1, $2, $3, $4, $5) RETURNING *';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertNonce = function (values) {
        var text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertSession = function (values) {
        var text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertSettings = function (values) {
        var text = 'INSERT INTO user_settings(user_uuid) VALUES ($1)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertSnooze = function (values) {
        var text = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertTransaction = function (values) {
        var text = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses, wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertOrgPayment = function (values) {
        var text = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertRevenue = function (values) {
        var text = 'INSERT INTO revenue(trans_uuid, user_uuid, trans_revenue_total) VALUES ($1, $2, $3)';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.insertUserOrgs = function (values) {
        var text = 'INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)';
        return this.conn.query(text, values);
    };
    // update
    QuerySvc.prototype.updateSessionID = function (values) {
        var text = 'UPDATE session SET sessionid = $1 WHERE user_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.snoozesToPaid = function (values) {
        var text = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.dismissesToPaid = function (values) {
        var text = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.wakesToPaid = function (values) {
        var text = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.orgToPaid = function (values) {
        var text = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
        return this.conn.query(text, values);
    };
    return QuerySvc;
}());
exports.default = QuerySvc;
;
//# sourceMappingURL=new-queries.js.map