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
    const query = `SELECT * FROM favorite_cities WHERE cityKey=${cityKey}`;
    const varArr = [cityKey]
    return DBService.runSQL(query, varArr)
        .then(cities => {
            return cities.length !== '0'
                ? cities[0]
                : null
        })
}

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

function removeFavoriteCity(cityKey) {
    try {
        const city = getByCityKey(cityKey)
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
module.exports = {
    getFavoriteCities,
    getByCityKey,
    addToFavorites,
    removeFavoriteCity,
}