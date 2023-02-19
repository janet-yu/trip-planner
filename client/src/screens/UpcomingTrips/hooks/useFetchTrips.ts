import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

const useFetchTrips = (userId: string): UseQueryResult<Array<any>> => {
  return useQuery(
    'trips',
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}/trips`
      );

      console.log({ response });

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
