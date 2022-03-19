import {combineReducers} from 'redux'
import itinerariesReducer from './itinerariesReducer'
import citiesReducer from './citiesReducer'
import userReducer from './userReducer'
const mainReducer = combineReducers({
    itinerariesReducer,
    citiesReducer,
    userReducer
})
export default mainReducer