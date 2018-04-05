"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// DATA ACCESS TIER
var Query = /** @class */ (function () {
    function Query(conn) {
        this.conn = conn;
    }
    // select
    Query.prototype.getUserViaEmail = function (values) {
        var query = "SELECT * FROM users WHERE email = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.getUser = function (values) {
        var query = "SELECT * FROM users WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.getOrgsViaEmail = function (values) {
        var query = "SELECT * FROM user_orgs WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.getOrder = function (values) {
        var query = "SELECT * FROM orders WHERE user_uuid = $1";
        return this.conn.query(query, values);
    };
    Query.prototype.getCart = function (values) {
        var query = 'SELECT * FROM cart WHERE user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.getOrgs = function (values) {
        var query = 'SELECT * FROM orgs';
        return this.conn.query(query, values);
    };
    Query.prototype.getAlarms = function (values) {
        var query = 'SELECT * FROM alarms WHERE user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.getUnpaidSnoozes = function (values) {
        var query = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.getUnpaidDismisses = function (values) {
        var query = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.getUnpaidWakes = function (values) {
        var query = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.getSettingsViaEmail = function (values) {
        var query = 'SELECT * FROM user_settings where user_uuid = $1';
        return this.conn.query(query, values);
    };
    Query.prototype.getPendingPayments = function (values) {
        var query = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
        return this.conn.query(query, values);
    };
    // insert
    Query.prototype.insertUser = function (values) {
        var query = 'INSERT INTO users(email, phone, password, name, permission) VALUES($1, $2, $3, $4, $5) RETURNING *';
        return this.conn.query(query, values);
    };
    Query.prototype.insertNonce = function (values) {
        var query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
        return this.conn.query(query, values);
    };
    Query.prototype.insertSession = function (values) {
        var query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
        return this.conn.query(query, values);
    };
    Query.prototype.insertSettings = function (values) {
        var query = 'INSERT INTO user_settings(user_uuid) VALUES ($1)';
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
    Query.prototype.updateSnoozeToPaid = function (values) {
        var query = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.updateDismissesToPaid = function (values) {
        var query = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.updateWakesToPaid = function (values) {
        var query = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
        return this.conn.query(query, values);
    };
    Query.prototype.updateOrgToPaid = function (values) {
        var query = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
        return this.conn.query(query, values);
    };
    return Query;
}());
exports.Query = Query;
;
//# sourceMappingURL=queries.js.map