"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obj = require('./sample.json');
function toDate(textTime) {
    var half = textTime.split(' ');
    var date = half[0].split('-');
    return date[2];
}
function formatForecast(list) {
    return new Promise(function (resolve, reject) {
        var dates = [];
        var currentDate = 0;
        for (var i = 0; i < list.length; i++) {
            if (toDate(list[i].dt_txt) !== currentDate) {
                var group = groupDate(list, toDate(list[i].dt_txt));
                dates.push(group);
            }
            currentDate = toDate(list[i].dt_txt);
        }
        resolve(dates);
    });
}
exports.default = formatForecast;
function groupDate(list, date) {
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
        if (toDate(list[i].dt_txt) === date) {
            weathers.push(list[i].weather[0].main);
            mins.push(list[i].main.temp_min);
            maxs.push(list[i].main.temp_max);
            sameDate.date = date;
            sameDate.min = Math.round(sortedTemp(mins)[0] - 273);
            sameDate.max = Math.round(sortedTemp(maxs)[maxs.length - 1] - 273);
            sameDate.weather = mode(frequency(weathers));
        }
    }
    return sameDate;
}
function sortedTemp(tempArr) {
    return tempArr.sort(function (a, b) { return a - b; });
}
function frequency(arr) {
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
}
function mode(frequency) {
    var max = 0;
    var mode = '';
    for (var k in frequency) {
        if (frequency[k] > max) {
            max = frequency[k];
            mode = k;
        }
    }
    return mode;
}
//# sourceMappingURL=weather-ave.js.map