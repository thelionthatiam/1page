import * as V from '../services/validation';
import * as R from '../services/value-objects';
import * as pg from 'pg';

import { AnalysisOptions } from 'aws-sdk/clients/cloudsearch';

export default class QuerySvc {
    conn: pg.PoolClient;

    constructor(conn: pg.PoolClient) {
        this.conn = conn;
    }

    insertTest(values:[string]):Promise<void> {
        const text = 'INSERT INTO test (test) VALUES ($1)';
        return this.conn.query(text, values)
            .then(result => null)
    }

    selectTest():Promise<pg.QueryResult> {
        const text = 'SELECT * FROM test'
        return this.conn.query(text)
            .then(result => {
                if (result.rowCount === 0) {
                    console.log('Select test shows nothing in the database')
                    return ['empty']
                } else {
                    return result.rows
                }
            })
    }

    selectAllAlbums(): Promise<pg.QueryResult> {
        const text = 'SELECT * FROM albums'
        return this.conn.query(text)
            .then(result => {
                if (result.rowCount === 0) {
                    console.log('Select all albums shows nothing in the database')
                    return ['empty']
                } else {
                    return result.rows
                }
            })
    }

    selectAllPhotos(): Promise<pg.QueryResult> {
        const text = 'SELECT * FROM photos'
        return this.conn.query(text)
            .then(result => {
                if (result.rowCount === 0) {
                    console.log('Select all photos shows nothing in the database')
                    return ['empty']
                } else {
                    return result.rows
                }
            })
    }
    
};