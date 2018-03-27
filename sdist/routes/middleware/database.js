"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var combiner_1 = require("../../config/combiner");
var queries_1 = require("../functions/queries");
var pool = new pg_1.Pool(combiner_1.dbConfig);
var db = {
    query: function (text, params) { return pool.query(text, params); }
};
exports.db = db;
function init(databaseInformation) {
    var pool = new pg_1.Pool(databaseInformation);
    return function (req, res, next) {
        var client;
        pool.connect()
            .then(function (client) {
            // events to release
            req.on('abort', function () {
                client.release();
                req.aQuery = null;
            });
            req.on('timeout', function () {
                req.abort();
            });
            res.on('close', function () {
                client.release();
                req.aQuery = null;
            });
            res.on('finish', function () {
                client.release();
                req.aQuery = null;
            });
            console.log('database running');
            req.aQuery = new queries_1.Query(client);
            next();
        })
            .catch(function (err) {
            client.release();
            return console.error('Error executing query', err.stack);
        });
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map