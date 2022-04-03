const mongoose = require('mongoose')

const itinerariesSchema = new mongoose.Schema({
name:{type:String, required:true},
img:{type:String, required:true},
description:{type:String,required:true},
money:{type:Number,required:true},
city_id:{type:mongoose.Types.ObjectId, ref:'cities', required: true},
likes:{type:Array,required:true},
comments:[{
    comment:{type:String},
    userID: {type:mongoose.Types.ObjectId,ref:'users'}
}],
duration:{type:String,required:true},
hashtags:{type:String,required:true}
})

const Itineraries = mongoose.model('itineraries', itinerariesSchema)
module.exports = Itineraries