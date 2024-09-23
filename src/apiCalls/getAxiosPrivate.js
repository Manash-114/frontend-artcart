import { axiosPrivate } from "./axios"; // Only axios import
const getAxiosPrivate = (authState, refreshAccessToken) => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${authState?.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default getAxiosPrivate;
