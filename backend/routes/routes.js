const Router = require('express').Router()
const validator = require('../config/validator')
const citiesController = require('../controllers/citiesControllers')
const itinerariesController = require('../controllers/itinerariesController')
const usersController = require('../controllers/userControllers');

const {obtenerCities, cargarCities, borrarCities, modificarCities, getOneCity} = citiesController
const {obtenerItineraries, cargarItineraries, borrarItineraries, modificarItineraries, getOneItinerary}= itinerariesController
const {signUpUsers, signInUser, signOutUser,verifyEmail, verifyToken}= usersController

const passport = require('../config/passport')

Router.route('/auth/signUp')
.post(validator, signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/auth/signOut')
.post(signOutUser)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session:false }), verifyToken)

Router.route('/allitineraries')
.get(obtenerItineraries)
.post(cargarItineraries)

Router.route('/allitineraries/:id')
.get(getOneItinerary)
.delete(borrarItineraries)
.put(modificarItineraries)

Router.route('/allcities')
.get(obtenerCities)
.post(cargarCities)

Router.route('/allcities/:id')
.get(getOneCity)
.delete(borrarCities)
.put(modificarCities)

module.exports = Router