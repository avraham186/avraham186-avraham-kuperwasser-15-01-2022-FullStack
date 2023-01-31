const DBService = require('../../services/DBService')
// const API_KEY = 'BmFV9KHIUx2TcW2wwfyb8GWT1lOc5i2L'
const API_KEY = 'HSGzWKvnWxckk5i7XSdzBU7w7EIsl89A'
const BASE_URL = 'http://dataservice.accuweather.com'


function _getByCityKey(cityKey) {
    const query = `SELECT * FROM cities where id=${cityKey}`;
    const varArr = [cityKey]
    try {
        return DBService.runSQL(query, varArr)
            .then(cities => {
                return cities.length !== 0
                    ? cities[0]
                    : null
            })
    } catch (err) {
        console.log('error in getByCityKey', err);
    }

}
// function _getByCityKey(cityKey) {
//     const query = `SELECT id=${cityKey} FROM cities `;
//     try {
//         return DBService.runSQL(query)
//             .then(cities => {
//                 const str = JSON.stringify(cities[0]);
//                 const cityExists = str[str.length - 2]
//                 return cityExists !== '0'
//                     ? cities[0]
//                     : null
//             })
//     } catch (err) {
//         console.log('error in getByCityKey', err);
//     }

// }

function _addCityToDB(city) {
    const query = 'INSERT INTO cities (id,weatherTxt,temp) VALUES (?,?,?)'
    const varArr = [city.id, city.weatherTxt, city.temp]
    return DBService.runSQL(query, varArr)
        .then(results => {
            results.affectedRows !== 0
                ? Promise.resolve(console.log(`the city ${city.id} was added`))
                : Promise.reject(console.log('No city was added'))
        });
}
// function _addCityToDB(city) {
//     console.log('city to add in addCityToDB', city)
//     const query = `INSERT INTO cities 
//                 VALUES ("${city.id}",
//                 "${city.weatherTxt}",
//                 "${city.temp}");`
//     return DBService.runSQL(query)
//         .then(results => {
//             results.affectedRows !== 0
//                 ? Promise.resolve(console.log(`the city ${city.weatherTxt} was added`))
//                 : Promise.reject(console.log('No city was added'))
//         });
// }

function autoComplete(searchTerm) {
    try {
        const cities = () => {
            return fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`)
                .then(response => response.json())
                .then(data => Promise.resolve(data))
        }
        return cities
    } catch (err) {
        const msg = (err.message);
        console.log('there is no cities returned from net', msg)
    }
}

function getCurrentWeather(cityKey) {
    try {
        const city = _getByCityKey(cityKey)
        return city.then((city) => {
            if (!city) {
                return (fetch(`${BASE_URL}/currentconditions/v1/${cityKey}?apikey=${API_KEY}&details=false`)
                    .then(city => city.json())
                    .then(city => {
                        const cityToSave = {
                            id: cityKey,
                            weatherTxt: city[0].WeatherText,
                            temp: city[0].Temperature.Metric.Value
                        }
                        _addCityToDB(cityToSave)
                        return cityToSave
                    })
                    .then(city => {
                        return Promise.resolve(city)
                    })
                )
            } else {
                return Promise.resolve(city)
            }
        })
    } catch (err) {
        const msg = (err.message);
        Promise.reject(msg)
    }
}

module.exports = {
    autoComplete,
    getCurrentWeather
}