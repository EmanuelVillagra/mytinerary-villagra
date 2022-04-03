import axios from "axios";

const itinerariesActions = {
  fetchItineraries: (city_id) => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/allitineraries");
      console.log(res)
      dispatch({ type: "fetch", payload: res.data.response.itineraries });
    };
  },
  deleteItineraries: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const res = await axios.delete(
          "http://localhost:4000/api/allitineraries/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({ type: "delete", payload: res.data.response.itineraries });
      } catch (err) {
        console.log(err);
      }
    };
  },
  likeDislike: (itinerary_id) => {
    const token = localStorage.getItem("token");
    return async () => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/allitineraries/like/${itinerary_id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
  },
};
export default itinerariesActions;
