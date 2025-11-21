import axios from 'axios';
import {store} from '../redux';
import {BASE_URL, BASE_PATH,API_TIMEOUT} from "@env"
import { setToken } from '../redux/authSlices';


const customAxios = (contentType = 'application/json') => {
  console.log(`${BASE_URL}${BASE_PATH}`);
  
  const instance = axios.create({
    baseURL: `${BASE_URL}${BASE_PATH}`,
    headers: {'Content-Type': contentType},
    timeout: Number(API_TIMEOUT),
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config: any) => {
      const token = store.getState().auth?.token;
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      const status = response?.data?.code;
      if (status === 12) {
        store.dispatch(setToken(null));
      }
      return response;
    },
    error => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.response?.error ||
        'Something went wrong. Please try again later.';

      console.log(error.response)
      console.log(error.response?.data)

      if (error.response) {
        const {status} = error.response;

        if (status === 401) {
          console.log('Unauthorized. Logging out...');
          store.dispatch(setToken(null));
        } else if (status === 404 || status === 400) {
          console.log('Resource not found:', errorMessage);
        }
      } else {
        console.error('Error setting up the request:', error);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default customAxios;
