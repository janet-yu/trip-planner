import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../../api/axios';

const useFetchTrips = (userId: string): UseQueryResult<Array<any>> => {
  return useQuery(
    'trips',
    async () => {
      const response = await axios.get(`/users/${userId}/trips`);

      if (response.data.status === 'success') {
        return response.data.data.trips;
      }
    },
    {
      refetchOnWindowFocus: true,
    }
  );
};

export default useFetchTrips;
