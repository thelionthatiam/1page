import { deepMerge } from '../functions/merge.js';
import * as dbConfigDefault from './db-default.json';
import * as connectCredentials from './connect-config.json';
var dbConnect = deepMerge(dbConfigDefault, connectCredentials);
function combine() {
    var dbInfo = {};
    try {
        var dbCustom = require('./db-custom.json');
        console.log('using custom');
        dbInfo = deepMerge(dbConnect, dbCustom);
        return dbInfo;
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log('using default');
            dbInfo = dbConnect;
            return dbInfo;
        }
        else {
            console.log(e);
        }
    }
}
var dbConfig = combine();
export { dbConfig };
//# sourceMappingURL=combiner.js.map