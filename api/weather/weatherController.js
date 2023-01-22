const weatherService = require('./weatherService')

function getCurrentWeather(req, res) {
    try {
        const currentWeather = weatherService.getCurrentWeather(req.params.id)
        currentWeather.then(city=>res.send(city))
    } catch (err) {
        console.log('faild to get current weather', err)
    }
}

module.exports = {
    getCurrentWeather
}