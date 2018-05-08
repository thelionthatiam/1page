"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_js_1 = require("./merge.js");
var dbConfigDefault = require("../config/db-default.json");
var connectCredentials = require("../config/connect-config.json");
var dbConnect = merge_js_1.deepMerge(dbConfigDefault, connectCredentials);
function combine() {
    var dbInfo = {};
    try {
        var dbCustom = require('./db-custom.json');
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
var dbConfig = combine();
exports.dbConfig = dbConfig;
//# sourceMappingURL=db-connect-config.js.map