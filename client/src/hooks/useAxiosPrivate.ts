import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Attach interceptors to axios private instance
 */
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the request is a retry request. Basically
    // if this is the first time a user is requesting something,
    // attach an access token if it exists. If not, we'll just
    // move on to authentication.
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log('in request interceptor');
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    // Attach to response interceptor, this will allow us to refresh
    // an access token if possible. If not, we'll throw an error.
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        // Example: access token has expired
        const prevRequest = err?.config;

        if (err.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // Sets access token and returns new access token
          // If the refresh token expired, this get request will fail and we'll
          // redirect to the login page.
          let newAccessToken;
          try {
            newAccessToken = await refresh();
          } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
          }

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
