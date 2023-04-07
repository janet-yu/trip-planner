import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  // 1. Call the refresh endpoint to get a new access token
  const refresh = async () => {
    const response = await axios.get('/token/refresh', {
      withCredentials: true, // this will send the refresh token we stored in the browser's cookies
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
