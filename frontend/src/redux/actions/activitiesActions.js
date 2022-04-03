import axios from "axios";

const activitiesActions = {
  fetchActivities: ()=>{
    return async(dispatch,getState)=>{
      const res = await axios.get('http://localhost:4000/api/allactivities')
      dispatch({type:'fetch', payload:res.data.response})
    }
  },
fetchActivitiesByItineraryId:(itinerary_id)=>{
  // console.log(itinerary_id)
  return async ()=>{
    try{const res = await axios.get(`http://localhost:4000/api/allactivities/${itinerary_id}`)
    return{success:true, response: res.data.response}
  }catch(err){
    console.log(err)
  }

}}}
export default activitiesActions;
