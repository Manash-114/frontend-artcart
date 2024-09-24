import { axiosPrivateWithFormData } from "./axios"; // Only axios import
const getAxiosPrivateWithFormData = (authState, refreshAccessToken) => {
  axiosPrivateWithFormData.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${authState?.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivateWithFormData.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateWithFormData(prevRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivateWithFormData;
};

export default getAxiosPrivateWithFormData;
