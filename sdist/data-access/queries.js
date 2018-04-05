"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("../services/value-objects");
var QuerySvc = /** @class */ (function () {
    function QuerySvc(conn) {
        this.conn = conn;
    }
    // select
    QuerySvc.prototype.getUserViaEmail = function (values) {
        var text = "SELECT * FROM users WHERE email = $1";
        return this.conn.query(text, values)
            .then(function (res) { return R.UserDB.fromJSON(res.rows[0]); })
            .catch(function (e) { return e; });
    };
    QuerySvc.prototype.getOrgsViaEmail = function (values) {
        var text = "SELECT * FROM user_orgs WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getUser = function (values) {
        var text = "SELECT * FROM users WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getOrder = function (values) {
        var text = "SELECT * FROM orders WHERE user_uuid = $1";
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getCart = function (values) {
        var text = 'SELECT * FROM cart WHERE user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getOrgs = function (values) {
        var text = 'SELECT * FROM orgs';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getAlarms = function (values) {
        var text = 'SELECT * FROM alarms WHERE user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getUnpaidSnoozes = function (values) {
        var text = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getUnpaidDismisses = function (values) {
        var text = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getUnpaidWakes = function (values) {
        var text = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getSettingsViaEmail = function (values) {
        var text = 'SELECT * FROM user_settings where user_uuid = $1';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.getPendingPayments = function (values) {
        var text = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
        return this.conn.query(text, values);
    };
    // insert
    // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
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
    // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
    QuerySvc.prototype.insertSnooze = function (values) {
        var text = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(text, values);
    };
    // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
    QuerySvc.prototype.insertTransaction = function (values) {
        var text = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses, wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        return this.conn.query(text, values);
    };
    // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
    QuerySvc.prototype.insertOrgPayment = function (values) {
        var text = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
        return this.conn.query(text, values);
    };
    // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
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
        return this.conn.query(text, values)
            .then(function () { }) // DO I NEED THIS FOR A VOID FUNCTION?
            .catch(function (e) { return e; });
    };
    QuerySvc.prototype.updateSnoozeToPaid = function (values) {
        var text = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.updateDismissesToPaid = function (values) {
        var text = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.updateWakesToPaid = function (values) {
        var text = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
        return this.conn.query(text, values);
    };
    QuerySvc.prototype.updateOrgToPaid = function (values) {
        var text = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
        return this.conn.query(text, values);
    };
    return QuerySvc;
}());
exports.default = QuerySvc;
;
//# sourceMappingURL=queries.js.map