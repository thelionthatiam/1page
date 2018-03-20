"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var counter_1 = require("./counter");
var total_1 = require("./total");
exports.default = redux_1.combineReducers({
    counter: counter_1.default,
    total: total_1.default
});
//# sourceMappingURL=index.js.map