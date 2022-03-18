import axios from "axios";

const itinerariesActions = {
  fetchItineraries: (city_id) => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/allitineraries");
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
  }}
export default itinerariesActions;
