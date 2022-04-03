const Activities = require("../models/activities.js");

const activitiesController = {
  getActivities: async (req, res) => {
    let activities;
    let error = null;

    try {
      activities = await Activities.find();
    } catch (err) {
      error = err;
      console.log(err);
    }
    res.json({
      response: error ? "ERROR" : { activities },
      success: error ? false : true,
      error: error,
    });
  },
  loadActivities: async (req, res) => {
    console.log(req.body);
    const [name, description,itinerary_id, img] = req.body.dataInput;
    new Activities({
      name: name,
      description: description,
      itinerary_id: itinerary_id,
      img: img,
    })
      .save()
      .then((response) => res.json({ response: response, success: true }));
  },
  eraseActivities: async (req, res) => {
    const id = req.params.id;
    await Activities.findOneAndDelete({ _id: id });
  },
  modifyActivities: async (req, res) => {
    const id = req.params.id;
    const activity = req.body.dataInput;
    let activitiesdb
    try{
      activitiesdb = await Activities.findOneAndUpdate({_id :id}, activity, {
        new: true,
      })
    }catch (err){
      console.log(err)
    }
    res.json({success:true, response:activitiesdb})
  },
  getActivitiesByItineraryId: async (req, res) =>{
    console.log(req.params)
    let activities
    let error = null
    try{
      activities = await Activities.find({itinerary_id:req.params.id})
      console.log(activities)
    }catch(err){
      error = err
      console.log(error)
    }
    res.json({
      response: error?'ERROR' :activities,
      success: error? false :true,
      error: error
    })
  }

};
module.exports = activitiesController;
