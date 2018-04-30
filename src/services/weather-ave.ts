var obj = require('./sample.json');


function toDate(textTime) {
    let half = textTime.split(' ')
    let date = half[0].split('-')
    return date[2]
}

export default function formatForecast(list) {
    return new Promise (
        (resolve, reject) => {
            let dates = []
            let currentDate = 0

            for (let i = 0; i < list.length; i++) {
                if (toDate(list[i].dt_txt) !== currentDate) {

                    let group = groupDate(list, toDate(list[i].dt_txt))
                    dates.push(group)
                }
                currentDate = toDate(list[i].dt_txt)
            }
            resolve(dates)
        }
    )
    
}

function groupDate(list, date) {
    let sameDate = {
        date: '',
        min: 0,
        max:0,
        weather: {}
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
            sameDate.weather = mode(frequency(weathers))
        }
    }
    return sameDate
}

function sortedTemp(tempArr) {
    return tempArr.sort((a,b) => a-b)
}
 
function frequency(arr) {
    let sorted = arr.sort();
    let count = 0;
    let item = arr[0];
    let obj = {};

    for (let i = 0; i < sorted.length; i++) {
        if (arr[i] === item) {
            count = count + 1
            obj[item] = count
        } else {
            count = 0
            item = arr[i]
            count = count + 1
            obj[item] = count
        }
    }
    return obj
}


function mode(frequency) {
    let max = 0;
    let mode = ''
    for (let k in frequency) {
        if (frequency[k] > max) {
            max = frequency[k]
            mode = k
        }
    }
    return mode
}
