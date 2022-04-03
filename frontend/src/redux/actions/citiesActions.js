import axios from "axios";

const citiesActions = {
  fetchCities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/allcities");
      dispatch({ type: "fetch", payload: res.data.response.cities });
    };
  },
  deleteCities: (id) => {
    return async (dispatch, getState) => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const res = await axios.delete(
          "http://localhost:4000/api/allcities/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({ type: "delete", payload: res.data.response.cities });
      } catch (err) {
        console.log(err);
      }
    };
  },
  findCity:(id)=>{
      return async (dispatch, getState) =>{
dispatch({type:'findCity', payload: id})
      }
  },
  filtrar: (cities, value) => {
    return (dispatch, getState) => {
      dispatch({ type: 'filtro', payload: { cities, value } });
    };
  },
};
export default citiesActions;
