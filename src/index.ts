import * as express from 'express';
import * as request from 'request';
import formatForecast from './services/weather-ave';
const index = express.Router()

const apiID = '32dde93e0e284c9a767893b4529adb0d'

index.route('/')
    .post((req, res) => {
        getWeather(req.body.city, apiID)
            .then(localWeather => {
                return formatForecast(localWeather.list)
            })
            .then(forecast => {
                console.log(forecast)
                res.render('home', {
                    day:forecast
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

export default index;

// http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&APPID=' + apiID,