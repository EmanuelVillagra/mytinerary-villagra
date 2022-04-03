const initialState = {
    activities: [],
    auxiliar:[]
  };
  const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        activities: action.payload,
        auxiliar: action.payload,
      };
      default:
          return state
  }
  };
  export default activitiesReducer