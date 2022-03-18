const Itineraries = require("../models/itineraries.js");

const itinerariesController = {
  obtenerItineraries: async (req, res) => {
    let itineraries;
    let error = null;

    try {
      itineraries = await Itineraries.find();
    } catch (err) {
      error = err;
      console.log(err);
    }
    res.json({
      response: error ? "ERROR" : { itineraries },
      success: error ? false : true,
      error: error,
    });
  },
  cargarItineraries: async (req, res) => {
    console.log(req.body);
    const [name, description, img, money, city_id, likes, duration, hashtags] =
      req.body.dataInput;
    new Itineraries({
      name: name,
      description: description,
      img: img,
      money: money,
      city_id: city_id,
      likes: likes,
      duration: duration,
      hashtags: hashtags,
    })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  borrarItineraries: async (req, res) => {
    const id = req.params.idconsole.log(req.params);
    await Itineraries.findOneAndDelete({ _id: id });
  },
  modificarItineraries: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body.dataInput;
    let itinerarym = await Itineraries.findOneAndUpdate(
      { _id: id },
      itinerary,
      { new: true }
    );
    console.log(itinerarym);
  },
  getOneItinerary: async (req, res) => {
    const id = req.params.id;
    let itinerary;
    let error = null;

    try {
      itinerary = await Itineraries.findOne({ _id: id });
    } catch (err) {
      error = err;
    }
    res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error,
    });
  },
};

module.exports = itinerariesController;
