"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obj = require('./sample.json');
var WeatherData = /** @class */ (function () {
    function WeatherData() {
    }
    WeatherData.prototype.mode = function (frequency) {
        var max = 0;
        var mode = '';
        for (var k in frequency) {
            if (frequency[k] > max) {
                max = frequency[k];
                mode = k;
            }
        }
        return mode;
    };
    WeatherData.prototype.frequency = function (arr) {
        var sorted = arr.sort();
        var count = 0;
        var item = arr[0];
        var obj = {};
        for (var i = 0; i < sorted.length; i++) {
            if (arr[i] === item) {
                count = count + 1;
                obj[item] = count;
            }
            else {
                count = 0;
                item = arr[i];
                count = count + 1;
                obj[item] = count;
            }
        }
        return obj;
    };
    WeatherData.prototype.sortedTemp = function (tempArr) {
        return tempArr.sort(function (a, b) { return a - b; });
    };
    WeatherData.prototype.toDate = function (textTime) {
        var half = textTime.split(' ');
        var date = half[0].split('-');
        return date[2];
    };
    WeatherData.prototype.toMonth = function (time) {
        var now = new Date(time);
        return now.getMonth();
    };
    WeatherData.prototype.groupDate = function (list, date) {
        var sameDate = {
            date: '',
            min: 0,
            max: 0,
            weather: {}
        };
        var weathers = [];
        var mins = [];
        var maxs = [];
        for (var i = 0; i < list.length; i++) {
            if (this.toDate(list[i].dt_txt) === date) {
                weathers.push(list[i].weather[0].icon);
                mins.push(list[i].main.temp_min);
                maxs.push(list[i].main.temp_max);
                sameDate.date = date;
                sameDate.min = Math.round(this.sortedTemp(mins)[0] - 273);
                sameDate.max = Math.round(this.sortedTemp(maxs)[maxs.length - 1] - 273);
                sameDate.weather = this.mode(this.frequency(weathers));
            }
        }
        return sameDate;
    };
    WeatherData.prototype.formatForecast = function (list) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dates = [];
            var currentDate = 0;
            for (var i = 0; i < list.length; i++) {
                if (_this.toDate(list[i].dt_txt) !== currentDate) {
                    var group = _this.groupDate(list, _this.toDate(list[i].dt_txt));
                    dates.push(group);
                }
                currentDate = _this.toDate(list[i].dt_txt);
            }
            resolve(dates);
        });
    };
    WeatherData.KtoC = function (k) { return k - 273; };
    WeatherData.CtoF = function (c) { return (c * (9 / 5) + 32); };
    WeatherData.KtoF = function (k) { return Math.round(WeatherData.CtoF(WeatherData.KtoC(k))); };
    return WeatherData;
}());
exports.default = WeatherData;
//# sourceMappingURL=weather-ave.js.map