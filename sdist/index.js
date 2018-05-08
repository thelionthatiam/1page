"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route_test_1 = require("./routes/route-test");
var index = express.Router();
index.use('/', route_test_1.default);
index.route('/')
    .get(function (req, res) {
    res.render('home');
});
exports.default = index;
//# sourceMappingURL=index.js.map