const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({
    name:{type:String, required:true},
    img:{type:String, required:true},
    description:{type:String,required:true},
    itinerary_id:{type:String, ref:'cities', required: true},
    })
    
const Activities = mongoose.model('activities', activitiesSchema)
module.exports = Activities