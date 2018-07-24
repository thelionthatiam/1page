"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const queries_1 = require("../data-access/queries");
function init(databaseInformation) {
    const pool = new pg.Pool(databaseInformation);
    return (req, res, next) => {
        let client;
        pool.connect()
            .then((client) => {
            req.on('abort', () => {
                client.release();
                req.querySvc = null;
            });
            req.on('timeout', () => {
                req.abort();
            });
            res.on('close', () => {
                client.release();
                req.querySvc = null;
            });
            res.on('finish', function () {
                client.release();
                req.querySvc = null;
            });
            req.querySvc = new queries_1.default(client);
            next();
        })
            .catch((err) => {
            return console.error('Error executing query', err.stack);
        });
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map