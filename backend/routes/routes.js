const Router = require('express').Router()

const citiesController = require('../controllers/citiesControllers')
const itinerariesController = require('../controllers/itinerariesController')

const {obtenerCities, cargarCities, borrarCities, modificarCities} = citiesController
const {obtenerItineraries, cargarItineraries, borrarItineraries, modificarItineraries}= itinerariesController

Router.route('/allitineraries')
.get(obtenerItineraries)
.post(cargarItineraries)
Router.route('/allitineraries/:id')
.delete(borrarItineraries)
.put(modificarItineraries)
Router.route('/allcities')
.get(obtenerCities)
.post(cargarCities)
Router.route('/allcities/:id')
.delete(borrarCities)
.put(modificarCities)
module.exports = Router