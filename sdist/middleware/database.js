import { Pool } from 'pg';
import { dbConfig } from "../config/combiner";
import { Query } from '../functions/queries';
var pool = new Pool(dbConfig);
var db = {
    query: function (text, params) { return pool.query(text, params); }
};
function init(databaseInformation) {
    var pool = new Pool(databaseInformation);
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
            req.aQuery = new Query(client);
            next();
        })
            .catch(function (err) {
            client.release();
            return console.error('Error executing query', err.stack);
        });
    };
}
export { db };
//# sourceMappingURL=database.js.map