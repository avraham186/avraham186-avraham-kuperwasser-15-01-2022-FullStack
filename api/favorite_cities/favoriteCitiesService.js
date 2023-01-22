const DBService = require('../../services/DBService')


function getFavoriteCities() {
    const query = `SELECT * FROM favorite_cities`

    return DBService.runSQL(query)
        .then(cities => {
            return (cities.length !== 0
                ? cities
                : Promise.reject(console.log('no city found'))
            )
        });
}

function getByCityKey(cityKey) {
    const query = `SELECT cityKey=${cityKey} FROM favorite_cities`;
    return DBService.runSQL(query)
        .then(cities => {
            const str = JSON.stringify(cities[0]);
            const cityExists = str[str.length - 2]
            return cityExists !== '0'
                ? cities[0]
                : null
        })
}

async function addToFavorites(city) {
    var query = `INSERT INTO favorite_cities
                VALUES ("${city.cityKey}",
                        "${city.localizedName}")`
    return DBService.runSQL(query)
        .then(okPacket => okPacket.affectedRows !== 0
            ? okPacket
            : Promise.reject(new Error('No city was added')));
}

function removeFavoriteCity(cityKey) {
    try {
        const city = getByCityKey(cityKey)
        return city.then((city) => {
            if (!city) return 0
            const query = `DELETE FROM favorite_cities WHERE cityKey = ${cityKey}`;
            return DBService.runSQL(query)
                .then(okPacket => okPacket.affectedRows !== 0
                    ? okPacket
                    : Promise.reject(`No city deleted - cityKey ${cityKey}`));
        })
    } catch (err) {
        console.log('No city deleted remove favorite city');
    }
}

module.exports = {
    getFavoriteCities,
    getByCityKey,
    addToFavorites,
    removeFavoriteCity,
}