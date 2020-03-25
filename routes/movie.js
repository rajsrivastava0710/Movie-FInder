const express = require('express');

const passport = require('passport');

const router = express.Router();

const movieController = require('../controllers/movie_controller');

console.log('Movie router loaded');

router.get('/favourites',passport.checkAuthentication,movieController.favourites);

router.get('/:id/add-fav',passport.checkAuthentication,movieController.addToFavourites);

module.exports = router;