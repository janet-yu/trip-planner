import axios from 'axios';

const getPlaceDetails = (placeId: string) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`;

  return axios.get(apiUrl);
};

export default getPlaceDetails;
