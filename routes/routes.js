const Router = require('express').Router()
const validator = require('../config/validator')
const citiesController = require('../controllers/citiesControllers')
const itinerariesController = require('../controllers/itinerariesController')
const usersController = require('../controllers/userControllers');
const activitiesController = require('../controllers/activitiesController');
const commentsControllers = require('../controllers/commentsController')
const {obtenerCities, cargarCities, borrarCities, modificarCities, getOneCity} = citiesController
const {obtenerItineraries, cargarItineraries, borrarItineraries, modificarItineraries, getOneItinerary, likeDislike}= itinerariesController
const {signUpUsers, signInUser, signOutUser,verifyEmail, verifyToken}= usersController
const {getActivities,loadActivities, eraseActivities, modifyActivities, getActivitiesByItineraryId} = activitiesController
const {addComment,modifyComment,deleteComment}= commentsControllers

const passport = require('../config/passport');

Router.route('/allitineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)
.put(passport.authenticate('jwt',{ session: false }),modifyComment)

Router.route('/allitineraries/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),deleteComment)

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
Router.route('/allitineraries/like/:id')
.put(passport.authenticate('jwt',{session: false}),likeDislike)
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


Router.route('/allactivities')
.get(getActivities)
.post(loadActivities)

Router.route('/allactivities/:id')
.delete(eraseActivities)
.put(modifyActivities)
.get(getActivitiesByItineraryId)
module.exports = Router