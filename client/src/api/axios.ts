import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // sends browser cookies to server
});
