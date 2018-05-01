import * as express from 'express';
import * as request from 'request';
import WeatherData from './services/weather-ave';
import cityToCode from './services/city-to-code';
const index = express.Router()

const apiID = '32dde93e0e284c9a767893b4529adb0d'

index.route('/')
    .post((req, res) => {
        let fiveDayForecast = {};
        let city = cityToCode(req.body.city)
        getWeather(city, apiID)
            .then(localWeather => {

                let wd = new WeatherData()
                return wd.formatForecast(localWeather.list)

            })
            .then(forecast => {

                fiveDayForecast = forecast
                console.log(fiveDayForecast)
                return getCurrentWeather(city, apiID)
            })
            .then(currentWeather => {
                console.log(currentWeather)


                let weather = {
                    temp:WeatherData.KtoF(currentWeather.main.temp),
                    description: currentWeather.weather[0].description,
                    humidity: currentWeather.main.humidity
                }
                console.log(weather)
                res.render('home', {
                    day: fiveDayForecast,
                    weather: weather
                })
            })
            .catch(e => console.log(e))
            
    })
    .get( (req, res) => {
        res.render('home')
    })

function getWeather(cityID, apiID) {
    return new Promise (
        (resolve, reject) => {
            request('http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + apiID,
            { json: true },
            (err, res, body) => {
                if (err) { reject(err)}
                resolve(body)
            })
        }
    )
}

function getCurrentWeather(cityID, apiID) {
    return new Promise (
        (resolve, reject) => {
            request('http://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&APPID=' + apiID,
            { json: true },
            (err, res, body) => {
                if (err) { reject(err) }
                resolve(body)
            })
        }
    )
}


export default index;