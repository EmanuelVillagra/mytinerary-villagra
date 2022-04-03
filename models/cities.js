const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
name:{type:String, required:true},
img:{type:String, required:true},
description:{type:String,required:true}
})

const Cities = mongoose.model('cities', citiesSchema)
module.exports = Cities