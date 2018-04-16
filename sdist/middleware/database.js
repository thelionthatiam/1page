"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var db_connect_config_1 = require("../services/db-connect-config");
var queries_1 = require("../data-access/queries");
var pool = new pg_1.Pool(db_connect_config_1.dbConfig);
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
            req.on('abort', function () {
                client.release();
                req.querySvc = null;
            });
            req.on('timeout', function () {
                req.abort();
            });
            res.on('close', function () {
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
            .catch(function (err) {
            client.release();
            return console.error('Error executing query', err.stack);
        });
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map