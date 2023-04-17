import axios from 'axios';
import * as c from './constants';

const API_KEY = '4adSBaiMD32GVjyJ20bgnzGxAx0JhlmL';
const API_SECRET = '3sxuph9NoWWMjdnG';

let accessToken = null;
let expiryTime = null;

async function getAccessToken() {
  try {
    if (!accessToken || Date.now() >= expiryTime) {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      accessToken = response.data.access_token;
      expiryTime = Date.now() + response.data.expires_in * 1000;
    }

    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    throw new Error(error);
  }
}

export async function getHotels() {
  const latitude = 41.397158;
  const longitude = 2.160873;
  const radius = 5;
  const radiusUnit = 'KM';
  const hotelSource = 'ALL';

  try {
    const token = await getAccessToken();
    const response = await axios.get(
      'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode',
      {
        params: {
          latitude,
          longitude,
          radius,
          radiusUnit,
          hotelSource,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function HotelsByCity(City) {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
      {
        params: {
          cityCode: City,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error.response);
    throw new Error(error);
  }
}

export async function getHeadlinesByCategory(
  category,
  page = 1,
  country = 'us'
) {
  try {
    const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`;
    const response = await axios.get(url);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function search(query, cancelToken) {
  try {
    const url = `${c.SEARCH}&q=${query.toLowerCase()}`;
    const response = await axios.get(url, {
      cancelToken: cancelToken.token,
    });

    return response.data;
  } catch (error) {
    const err = new Error(error.message);
    err.isCancel = axios.isCancel(error);

    throw err;
  }
}



// import axios from 'axios';

// import * as c from './constants';


// const API_KEY = '4adSBaiMD32GVjyJ20bgnzGxAx0JhlmL';
// const API_SECRET = '3sxuph9NoWWMjdnG';

// export async function getAccessToken() {
//   try {
//     const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
//       'grant_type=client_credentials&client_id=' + API_KEY + '&client_secret=' + API_SECRET, 
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error retrieving access token:', error);
//     throw new Error(error);
//   }
// }
// export async function getHotels() {
//     const latitude = 41.397158;
//     const longitude = 2.160873;
//     const radius = 5;
//     const radiusUnit = 'KM';
//     const hotelSource = 'ALL';
//     const accessToken = 'tL8CJYwUQd9SWX7iQNmvery8d1e8';
  
//     try {
//       const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode', {
//         params: {
//           latitude: latitude,
//           longitude: longitude,
//           radius: radius,
//           radiusUnit: radiusUnit,
//           hotelSource: hotelSource
//         },
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       });
  
//       return response.data;
  
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   export async function HotelsByCity(City) {
//     const accessToken = 'tL8CJYwUQd9SWX7iQNmvery8d1e8';
  
//     try {
//       const response = await axios.get(
//         'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
//         {
//           params: {
//             cityCode : City
//           },
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
  
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching hotels:', error.response);
//       throw new Error(error);
//     }
//   }
  
  
  
  
  
  




