var obj = require('./sample.json');


function toDate(textTime) {
    let half = textTime.split(' ')
    let date = half[0].split('-')
    return date[2]
}

function splitToDays(list) {
    
    let dates = []
    let currentDate = 0

    for (let i = 0; i < list.length; i++) {
        if (toDate(list[i].dt_txt) !== currentDate) {
            
            let group = groupDate(list, toDate(list[i].dt_txt))
            dates.push(group)
        }
        currentDate = toDate(list[i].dt_txt)
    }
    console.log(dates)
}

function groupDate(list, date) {
    let sameDate = {
        date: '',
        min: 0,
        max:0,
        weather: []
    }

    let weathers = []
    let mins = []
    let maxs = []

    for (let i = 0; i < list.length; i++) {
        if (toDate(list[i].dt_txt) === date) {
            weathers.push(list[i].weather[0].main);
            mins.push(list[i].main.temp_min);
            maxs.push(list[i].main.temp_max);

            sameDate.date = date;
            sameDate.min = Math.round(sortedTemp(mins)[0] - 273);
            sameDate.max = Math.round(sortedTemp(maxs)[maxs.length - 1] - 273);
            sameDate.weather = weathers
            //weatherMode(list[i].weather[0].main, weathers);
        }
    }
    return sameDate
}

function sortedTemp(tempArr) {
    return tempArr.sort((a,b) => a-b)
}


function averageTemp(currentTemp, temp) {
   if (currentTemp === 0) {
       return temp - 273
   } else {
       return Math.round(((((currentTemp - 273) + temp) / 2)))
   }
}

function weatherMode(currentWeather, weathers) {
    if (weathers.length === 0) {
        return currentWeather
    } else {
        return mode(weathers)
    }
}

// REFACTOR 
function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

splitToDays(obj.list)


