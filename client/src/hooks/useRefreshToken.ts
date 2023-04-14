import useAuth from './useAuth';
import axios from '../api/axios';

/**
 * This hook refreshes the user's access token. If
 * the refresh token expires, we'll boot the user
 * to the login page.
 */
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/token/refresh');

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        user: response.data.user,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
