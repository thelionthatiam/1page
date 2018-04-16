"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var queries_1 = require("../data-access/queries");
function init(databaseInformation) {
    var pool = new pg.Pool(databaseInformation);
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
            return console.error('Error executing query', err.stack);
        });
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map