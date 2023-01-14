import * as dotenv from 'dotenv';
import _getPlaceDetails from './getPlaceDetails';

dotenv.config();

const GoogleAPIService = {
  getPlaceDetails: _getPlaceDetails,
};

export default GoogleAPIService;
