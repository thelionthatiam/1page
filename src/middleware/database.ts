import { Pool } from 'pg';
import { dbConfig } from "../services/db-connect-config";
import { Client } from '../../typings/typings'
import QuerySvc  from '../data-access/queries'
import * as express from "express";

const pool = new Pool(dbConfig);
let db = {
    query: (text : string, params : any[]) => pool.query(text, params)
}

function init(databaseInformation) {
    const pool = new Pool(databaseInformation);
    return (req, res, next) => {
        let client: Client;

        pool.connect()
            .then((client : Client) => {
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
                client.release();
                return console.error('Error executing query', err.stack);
            })
    };
}

export { db, init };
