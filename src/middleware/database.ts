import { Pool } from 'pg';
import { dbConfig } from "../services/db-connect-config";
import * as r from '../services/value-objects';
import { Query } from '../data-access/queries'
import * as express from "express";

const pool = new Pool(dbConfig);
let db = {
  query: (text:string, params:any[]) => pool.query(text, params)
}

function init(databaseInformation:ConnectionConfig):RequestHandler {
  const pool = new Pool(databaseInformation);
  return (req, res, next) => {
    let client:Client;

    pool.connect()
      .then((client:Client) => {

        // events to release
        req.on('abort', () => {
          client.release();
          req.aQuery = null;
        })
        req.on('timeout', () => {
          req.abort();
        })
        res.on('close', () => {
          client.release();
          req.aQuery = null;
        })
        res.on('finish', function() {
          client.release();
          req.aQuery = null;
        })
        console.log('database running')
        req.aQuery = new Query(client)
        next();
      })
      .catch((err) => {
        client.release();
        return console.error('Error executing query', err.stack);
      })
    };
}


export { db, init };
