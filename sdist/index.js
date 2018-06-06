"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route_photos_1 = require("./routes/route-photos");
var index = express.Router();
index.use('/', route_photos_1.default);
index.route('/photo')
    .get(function (req, res) {
    res.render('photos');
});
index.route('/')
    .get(function (req, res) {
    res.render('home');
});
index.route('/about')
    .get(function (req, res) {
    res.render('about');
});
exports.default = index;
//# sourceMappingURL=index.js.map