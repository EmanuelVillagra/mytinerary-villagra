const mongoose = require('mongoose')

const itinerariesSchema = new mongoose.Schema({
name:{type:String, required:true},
img:{type:String, required:true},
description:{type:String,required:true}
})

const Itineraries = mongoose.model('itineraries', itinerariesSchema)
module.exports = Itineraries