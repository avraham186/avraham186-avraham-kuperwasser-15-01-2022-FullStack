const express = require("express");
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(express.json())
app.use(express.static('public'))
const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

const favoriteCityRoutes = require('./api/favorite_cities/favoriteCitiesRoutes')
const { searchAutoComplete } = require('./api/controllers/searchController')
const { getCurrentWeather } = require('./api/weather/weatherController')
const { createDatabase } = require('./services/DBService')


// app.get('/createDatabase', createDatabase)

app.use('/api/favorite', favoriteCityRoutes)
app.get('/api/Search', searchAutoComplete)
app.get('/api/GetCurrentWeather/:id', getCurrentWeather)
app.delete('/api/favorite/DeleteFavorite', favoriteCityRoutes)

console.log('I am Here!, am I??')

app.listen(5000, () => {
    console.log(`Server is up and running on 5000 ...`);
});