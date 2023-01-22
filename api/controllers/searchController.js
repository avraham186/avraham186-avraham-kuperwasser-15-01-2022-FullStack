const { autoComplete } = require('../weather/weatherService')

function searchAutoComplete(req, res) {
    try {
        const cities = autoComplete(req.query.searchTerm)
            cities().then((cities) => {
            res.send(cities)
        })

    } catch (err) {
        const msg = (err.message);
        console.log('there is no cities  msg', msg)
    }
}
module.exports = {
    searchAutoComplete
}