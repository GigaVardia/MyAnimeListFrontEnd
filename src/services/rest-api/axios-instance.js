import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import localStorageService from "../localStorage.service";

const baseURL = import.meta.env.VITE_API_URL;

const instance = new axios.create({ baseURL });

const refreshAuthLogic = (failedRequest) =>
  axios.post(`${baseURL}auth/refresh-token`).then((tokenRefreshResponse) => {
    localStorageService.setAccessToken(tokenRefreshResponse.data.accessToken);
    localStorageService.setRefreshToken(tokenRefreshResponse.data.refreshToken);
    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + tokenRefreshResponse.data.accessToken;
    return Promise.resolve();
  });

createAuthRefreshInterceptor(instance, refreshAuthLogic);

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = localStorageService.getAccessToken();

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
