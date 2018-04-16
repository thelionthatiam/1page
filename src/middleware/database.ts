import * as pg from 'pg';
import QuerySvc  from '../data-access/queries'

function init(databaseInformation:pg.ConnectionConfig) {
    const pool = new pg.Pool(databaseInformation);

    return (req, res, next) => {
        let client: pg.PoolClient;

        pool.connect()
            .then((client: pg.PoolClient) => {
                req.on('abort', () => {
                    client.release();
                    req.querySvc = null;
                })
                req.on('timeout', () => {
                    req.abort();
                })
                res.on('close', () => {
                    client.release();
                    req.querySvc = null;
                })
                res.on('finish', function () {
                    client.release();
                    req.querySvc = null;
                })
                req.querySvc = new QuerySvc(client)
                next();
            })
            .catch((err) => {
                return console.error('Error executing query', err.stack);
            })
    };
}

export { init };
