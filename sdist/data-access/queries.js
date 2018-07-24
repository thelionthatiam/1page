"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuerySvc {
    constructor(conn) {
        this.conn = conn;
    }
    insertTest(values) {
        const text = 'INSERT INTO test (test) VALUES ($1)';
        return this.conn.query(text, values)
            .then(result => null);
    }
    selectTest() {
        const text = 'SELECT * FROM test';
        return this.conn.query(text)
            .then(result => {
            if (result.rowCount === 0) {
                console.log('Select test shows nothing in the database');
                return ['empty'];
            }
            else {
                return result.rows;
            }
        });
    }
    selectAllAlbums() {
        const text = 'SELECT * FROM albums';
        return this.conn.query(text)
            .then(result => {
            if (result.rowCount === 0) {
                console.log('Select all albums shows nothing in the database');
                return ['empty'];
            }
            else {
                return result.rows;
            }
        });
    }
    selectAllPhotos() {
        const text = 'SELECT * FROM photos';
        return this.conn.query(text)
            .then(result => {
            if (result.rowCount === 0) {
                console.log('Select all photos shows nothing in the database');
                return ['empty'];
            }
            else {
                return result.rows;
            }
        });
    }
    selectSpecificAlbums(values) {
        const text = 'SELECT * FROM albums WHERE category = $1';
        return this.conn.query(text, values)
            .then(result => {
            if (result.rowCount === 0) {
                console.log('Select all albums shows nothing in the database');
                return ['empty'];
            }
            else {
                return result.rows;
            }
        });
    }
}
exports.default = QuerySvc;
;
//# sourceMappingURL=queries.js.map