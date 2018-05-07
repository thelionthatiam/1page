"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index = express.Router();
index.route('/')
    .get(function (req, res) {
    res.render('home');
});
exports.default = index;
//# sourceMappingURL=index.js.map