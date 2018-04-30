var obj = require('./sample.json');
function toDate(textTime) {
    var half = textTime.split(' ');
    var date = half[0].split('-');
    return date[2];
}
function splitToDays(list) {
    var dates = [];
    var currentDate = 0;
    for (var i = 0; i < list.length; i++) {
        if (toDate(list[i].dt_txt) !== currentDate) {
            var group = groupDate(list, toDate(list[i].dt_txt));
            dates.push(group);
        }
        currentDate = toDate(list[i].dt_txt);
    }
    console.log(dates);
}
function groupDate(list, date) {
    var sameDate = {
        date: '',
        min: 0,
        max: 0,
        weather: []
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
            sameDate.weather = weathers;
            //weatherMode(list[i].weather[0].main, weathers);
        }
    }
    return sameDate;
}
function sortedTemp(tempArr) {
    return tempArr.sort(function (a, b) { return a - b; });
}
function averageTemp(currentTemp, temp) {
    if (currentTemp === 0) {
        return temp - 273;
    }
    else {
        return Math.round(((((currentTemp - 273) + temp) / 2)));
    }
}
function weatherMode(currentWeather, weathers) {
    if (weathers.length === 0) {
        return currentWeather;
    }
    else {
        return mode(weathers);
    }
}
// REFACTOR 
function mode(arr) {
    return arr.sort(function (a, b) {
        return arr.filter(function (v) { return v === a; }).length
            - arr.filter(function (v) { return v === b; }).length;
    }).pop();
}
splitToDays(obj.list);
//# sourceMappingURL=weather-ave.js.map