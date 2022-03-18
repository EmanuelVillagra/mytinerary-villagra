const initialState = {
  itineraries: [],
  auxiliar:[]
};
const itinerariesReducer = (state = initialState, action) => {
switch (action.type) {
  case 'fetch':
    return {
      ...state,
      itineraries: action.payload,
      auxiliar: action.payload,
    };
  case 'delete':
    return {
      ...state,
      itineraries: action.payload,
    };
  case 'chargeItinerary':
    let itineraries = [...state.itineraries]
    itineraries.push(action.payload)
    return {
      ...state,
      itineraries,
      auxiliar: [...itineraries]
    };
    default:
        return state
}
};
export default itinerariesReducer