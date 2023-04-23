import axios from 'axios';
import cache from '../../cache';

const getPlaceDetails = async (placeId: string) => {
  if (cache.get(placeId)) {
    return cache.get(placeId);
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await axios.get(apiUrl);

  cache.set(placeId, response.data.result);

  return response.data.result;
};

export default getPlaceDetails;
