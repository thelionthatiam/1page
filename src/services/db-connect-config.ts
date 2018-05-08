import { deepMerge } from './merge.js';
import * as dbConfigDefault from '../config/db-default.json';
import * as connectCredentials from '../config/connect-config.json';

let dbConnect = deepMerge(dbConfigDefault, connectCredentials);

function combine() {
    let dbInfo = {};

    try {
        let dbCustom = require('./db-custom.json');
        console.log('using custom')
        dbInfo = deepMerge(dbConnect, dbCustom);
        return dbInfo;
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log('using default')
            dbInfo = dbConnect;
            return dbInfo
        } else {
            console.log(e)
        }
    }
}

let dbConfig = combine();

export { dbConfig };