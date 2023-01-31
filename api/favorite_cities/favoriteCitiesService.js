const DBService = require('../../services/DBService')


function getFavoriteCities() {
    const query = `SELECT * FROM favorite_cities`

    return DBService.runSQL(query)
        .then(cities => {
            const cityToReturn = cities.map(city => {
                return { Key: city.cityKey, LocalizedName: city.LocalizedName }
            })
            return (cities.length !== 0
                ? cityToReturn
                : null
            )
        });
}

function getByCityKey(cityKey) {
    console.log('city in get city', city);
    const query = `SELECT * FROM favorite_cities WHERE cityKey=${cityKey}`;
    const varArr = [cityKey]
    return DBService.runSQL(query, varArr)
        .then(cities => {
            return cities.length !== '0'
                ? cities[0]
                : null
        })
}
// function getByCityKey(cityKey) {
//     const query = `SELECT cityKey=${cityKey} FROM favorite_cities`;
//     return DBService.runSQL(query)
//         .then(cities => {
//             const str = JSON.stringify(cities[0]);
//             const cityExists = str[str.length - 2]
//             return cityExists !== '0'
//                 ? cities[0]
//                 : null
//         })
// }

function addToFavorites(city) {
    const query = 'INSERT INTO favorite_cities (cityKey,LocalizedName) VALUES (?,?)'
    const varArr = [city.cityKey, city.name]
    return DBService.runSQL(query, varArr)
        .then(okPacket => {
            return okPacket.affectedRows !== 0
                ? okPacket
                : console.log('No city was added')
        });
}
// async function addToFavorites(city) {
//     const query = `INSERT INTO favorite_cities
//                 VALUES ("${city.cityKey}",
//                         "${city.localizedName}")`
//     return DBService.runSQL(query)
//         .then(okPacket => okPacket.affectedRows !== 0
//             ? okPacket
//             : Promise.reject(new Error('No city was added')));
// }

function removeFavoriteCity(cityKey) {
    try {
        const city = getByCityKey(cityKey)
        console.log('city', city);
        return city.then((city) => {
            if (!city) return 0
            const query = `DELETE FROM favorite_cities WHERE cityKey = ${cityKey}`;
            const varArr = [cityKey]
            return DBService.runSQL(query, varArr)
                .then(okPacket => okPacket.affectedRows !== 0
                    ? okPacket
                    : console.log(`No city deleted - cityKey ${cityKey}`));
        })
    } catch (err) {
        console.log('No city deleted remove favorite city',err);
    }
}
// function removeFavoriteCity(cityKey) {
//     try {
//         const city = getByCityKey(cityKey)
//         return city.then((city) => {
//             if (!city) return 0
//             const query = `DELETE FROM favorite_cities WHERE cityKey = ${cityKey}`;
//             return DBService.runSQL(query)
//                 .then(okPacket => okPacket.affectedRows !== 0
//                     ? okPacket
//                     : Promise.reject(`No city deleted - cityKey ${cityKey}`));
//         })
//     } catch (err) {
//         console.log('No city deleted remove favorite city');
//     }
// }

module.exports = {
    getFavoriteCities,
    getByCityKey,
    addToFavorites,
    removeFavoriteCity,
}