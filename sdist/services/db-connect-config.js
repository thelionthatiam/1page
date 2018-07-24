"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_js_1 = require("./merge.js");
const dbConfigDefault = require("../config/db-default.json");
const connectCredentials = require("../config/connect-config.json");
let dbConnect = merge_js_1.deepMerge(dbConfigDefault, connectCredentials);
function combine() {
    let dbInfo = {};
    try {
        let dbCustom = require('./db-custom.json');
        console.log('using custom');
        dbInfo = merge_js_1.deepMerge(dbConnect, dbCustom);
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
let dbConfig = combine();
exports.dbConfig = dbConfig;
//# sourceMappingURL=db-connect-config.js.map