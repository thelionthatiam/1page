"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DATA ACCESS TIER
var Query = /** @class */ (function () {
    function Query(conn) {
        this.conn = conn;
    }
    // select
    Query.prototype.selectUser = function (values) {
        var query = "SELECT * FROM users WHERE email = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.selectAuthenticatedUser = function (values) {
        var query = "SELECT * FROM users WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.selectUserOrgs = function (values) {
        var query = "SELECT * FROM user_orgs WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.selectOrder = function (values) {
        var query = "SELECT * FROM orders WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.selectCart = function (values) {
        var query = 'SELECT * FROM cart WHERE user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.selectOrgs = function (values) {
        var query = 'SELECT * FROM orgs';
        return this.conn.query(query, values);
    };
    Query.prototype.selectAlarms = function (values) {
        var query = 'SELECT * FROM alarms WHERE user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.selectUnpaidSnoozes = function (values) {
        var query = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.selectUnpaidDismisses = function (values) {
        var query = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.selectUnpaidWakes = function (values) {
        var query = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.selectUserSettings = function (values) {
        var query = 'SELECT * FROM user_settings where user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.selectPendingPayments = function (values) {
        var query = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
        return this.conn.query(query, values);
    };
    // insert
    Query.prototype.insertUser = function (values) {
        var query = 'INSERT INTO users(email, phone, password, name) VALUES($1, $2, $3, $4) RETURNING *';
        return this.conn.query(query, values);
    };
    Query.prototype.insertSnooze = function (values) {
        var query = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(query, values);
    };
    Query.prototype.insertTransaction = function (values) {
        var query = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses, wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return this.conn.query(query, values);
    };
    Query.prototype.insertOrgPayment = function (values) {
        var query = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(query, values);
    };
    Query.prototype.insertRevenue = function (values) {
        var query = 'INSERT INTO revenue(trans_uuid, user_uuid, trans_revenue_total) VALUES ($1, $2, $3)';
        return this.conn.query(query, values);
    };
    // update
    Query.prototype.updateSessionID = function (values) {
        var query = 'UPDATE session SET sessionid = $1 WHERE user_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.snoozesToPaid = function (values) {
        var query = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.dismissesToPaid = function (values) {
        var query = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.wakesToPaid = function (values) {
        var query = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.orgToPaid = function (values) {
        var query = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
        return this.conn.query(query, values);
    };
    return Query;
}());
exports.Query = Query;
;
//# sourceMappingURL=queries.js.map