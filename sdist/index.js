"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var index = express.Router();
var apiID = '32dde93e0e284c9a767893b4529adb0d';
index.route('/')
    .post(function (req, res) {
    getWeather(req.body.city, apiID)
        .then(function (localWeather) {
        console.log(localWeather);
        res.render('home');
    })
        .catch(function (e) { return console.log(e); });
})
    .get(function (req, res) {
    res.render('home');
});
function getWeather(cityID, apiID) {
    return new Promise(function (resolve, reject) {
        request('http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + apiID, { json: true }, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
exports.default = index;
// http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + apiID, 
//# sourceMappingURL=index.js.map