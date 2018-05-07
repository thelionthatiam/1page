import * as V from '../services/validation';
import * as R from '../services/value-objects';
import * as pg from 'pg';

import { AnalysisOptions } from 'aws-sdk/clients/cloudsearch';

export default class QuerySvc {
    conn: pg.PoolClient;

    constructor(conn: pg.PoolClient) {
        this.conn = conn;
    }

    // select
    
};