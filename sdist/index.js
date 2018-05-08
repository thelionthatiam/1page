"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var weather_ave_1 = require("./services/weather-ave");
var city_to_code_1 = require("./services/city-to-code");
var index = express.Router();
var apiID = '32dde93e0e284c9a767893b4529adb0d';
index.route('/')
    .post(function (req, res) {
    var fiveDayForecast = {};
    var city = city_to_code_1.default(req.body.city);
    getWeather(city, apiID)
        .then(function (localWeather) {
        var wd = new weather_ave_1.default();
        return wd.formatForecast(localWeather.list);
    })
        .then(function (forecast) {
        fiveDayForecast = forecast;
        console.log(fiveDayForecast);
        return getCurrentWeather(city, apiID);
    })
        .then(function (currentWeather) {
        console.log(currentWeather);
        var weather = {
            temp: weather_ave_1.default.KtoF(currentWeather.main.temp),
            description: currentWeather.weather[0].description,
            humidity: currentWeather.main.humidity
        };
        console.log(weather);
        res.render('home', {
            day: fiveDayForecast,
            weather: weather
        });
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
function getCurrentWeather(cityID, apiID) {
    return new Promise(function (resolve, reject) {
        request('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&APPID=' + apiID, { json: true }, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
exports.default = index;
//# sourceMappingURL=index.js.map