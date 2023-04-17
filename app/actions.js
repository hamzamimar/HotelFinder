export const addHotels = (hotels) => {
    return {
      type: 'SET_HOTELS',
      payload: { hotels }
    };
  };
  
export const addCityHotel = (cityHotels) => {
    return {
      type: 'SET_CITY_HOTELS',
      payload: { cityHotels }
    };
  };
export const ClearData = () => {
    return {
      type: 'CLEAR_HOTELS',
    };
  };
  