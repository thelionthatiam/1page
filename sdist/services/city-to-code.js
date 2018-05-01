"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countries = require('./city-list.json');
function simpleSearch(city) {
    for (var i = 0; i < countries.length; i++) {
        if (city.toLowerCase() === countries[i].name.toLowerCase()) {
            console.log(countries[i].id);
            return countries[i].id;
        }
    }
}
exports.default = simpleSearch;
//# sourceMappingURL=city-to-code.js.map