const express = require('express')

const { getFavoriteCities, removeFavoriteCity, addFavoriteCity,isFavorite } = require('./favoriteCitiesController')
const router = express.Router()


router.get('/', getFavoriteCities)
router.get('/is-favorite/:id',isFavorite)
router.post('/', addFavoriteCity)
router.delete('/DeleteFavorite/:id', removeFavoriteCity)

module.exports = router