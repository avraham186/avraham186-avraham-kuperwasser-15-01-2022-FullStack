const favoriteCityService = require('./favoriteCitiesService')

function getFavoriteCities(req, res) {
    try {
        favoriteCityService.getFavoriteCities()
            .then(cities => { res.send(cities) })
    } catch (err) {
        res.send('problem with get favorite city: nothing return', err);
    }
}

function removeFavoriteCity(req, res) {
    try {
        favoriteCityService.removeFavoriteCity(req.params.id)
            .then(city => {
                if (!city) {
                    res.send('there is no city')
                } else {
                    res.send({ msg: 'Deleted successfully' })
                }
            })
    } catch (err) {
        console.log('no city deleted', err);
    }
}


function addFavoriteCity(req, res) {
    try {
        const city = req.body
        favoriteCityService.addToFavorites(city)
            .then(city => res.send(city))
    } catch (err) {
        console.log('faild to add city to favorite cities', err)
    }
}
function isFavorite(req, res) {
    try {
        favoriteCityService.getByCityKey(req.params.id)
            .then(city => {
                if (city) {
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
    } catch (err) {
        console.log('faild to get favorite city')
    }
}

module.exports = {
    getFavoriteCities,
    removeFavoriteCity,
    addFavoriteCity,
    isFavorite
}