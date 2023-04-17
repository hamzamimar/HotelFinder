// let initialState = {
//     hotels: []
//   };
  
//   const hotelReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_HOTELS': {
//         const { hotels } = action.payload;
//         // console.log('in reducer ', action.payload)
//         return { ...state, hotels };
//       }
//       default:
//         return state;
//     }
//   };
  
//   export default hotelReducer;

let initialState = {
    hotels: []
  };
  
  const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_HOTELS': {
        const { hotels } = action.payload;
        return { ...state, hotels };
      }
      case 'CLEAR_HOTELS': {
        return { ...state, hotels: [] };
      }
      case 'SET_CITY_HOTELS': {
        const { cityHotels } = action.payload;
        return { ...state, hotels: cityHotels };
      }
      default:
        return state;
    }
  };
  
  export default hotelReducer;
  