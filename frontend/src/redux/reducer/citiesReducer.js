const initialState = {
    cities: [],
    auxiliar:[],
    city: null
};
const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        cities: action.payload,
        auxiliar: action.payload,
      };
    case 'delete':
      return {
        ...state,
        cities: action.payload,
      };
    case 'chargeCity':
      let cities = [...state.cities]
      cities.push(action.payload)
      return {
        ...state,
        cities,
        auxiliar: [...cities]
      };
    case 'filtro':
      const filtrado = state.auxiliar.filter(
        city => city.name.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())
      );
      return{
          ...state,
          cities: filtrado
      };
      case 'findCity':
          const findCity = state.auxiliar.find(
              city=>city._id===action.payload
          )
          return {
              ...state,
              city: findCity
          }
          
      default:
          return state
  }
};
export default citiesReducer