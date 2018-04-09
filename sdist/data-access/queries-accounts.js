"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserData(values) {
    var text = "SELECT * FROM users WHERE email = $1";
    return this.conn.query(text, values)
        .then(function (res) {
        if (res.rowCount === 0) {
            throw new Error('No user with that uuid');
        }
    });
}
exports.getUserData = getUserData;
//# sourceMappingURL=queries-accounts.js.map