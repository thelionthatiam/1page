"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuerySvc = /** @class */ (function () {
    function QuerySvc(conn) {
        this.conn = conn;
    }
    QuerySvc.prototype.insertTest = function (values) {
        var text = 'INSERT INTO test (test) VALUES ($1)';
        return this.conn.query(text, values)
            .then(function (result) { return null; });
    };
    QuerySvc.prototype.selectTest = function () {
        var text = 'SELECT * FROM test';
        return this.conn.query(text)
            .then(function (result) {
            if (result.rowCount === 0) {
                console.log('Select test shows nothing in the database');
                return ['empty'];
            }
            else {
                return result.rows;
            }
        });
    };
    return QuerySvc;
}());
exports.default = QuerySvc;
;
//# sourceMappingURL=queries.js.map