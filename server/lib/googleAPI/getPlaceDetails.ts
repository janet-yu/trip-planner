import axios from 'axios';

const getPlaceDetails = async (placeId: string) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await axios.get(apiUrl);

  return response.data.result;
};

export default getPlaceDetails;
