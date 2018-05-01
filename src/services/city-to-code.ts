const countries = require('./city-list.json')


export default function simpleSearch(city) {
    for ( let i = 0; i < countries.length; i++) {
        if (city.toLowerCase() === countries[i].name.toLowerCase()) {
            console.log(countries[i].id)
            return countries[i].id
        }
    }
}