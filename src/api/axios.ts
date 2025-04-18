import axios from "axios";
import toast from "react-hot-toast";
import { userApi } from "./userApi";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosClient.interceptors.response.use(
  function (response) {
    const message = response?.data?.message;

    if (message) toast.success(message);
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/user/refresh-token")
        return Promise.reject(error);
      originalRequest._retry = true;

      try {
        await userApi.refreshToken();

        return axiosClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    const message =
      error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
    toast.error(message);

    return Promise.reject(error);
  },
);

export default axiosClient;
