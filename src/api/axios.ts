import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosClient.interceptors.response.use(
  function (response) {
    const message = response?.data?.message;

    if (message) toast.success(message);
    return response;
  },
  function (error) {
    if (error.status === 401) return Promise.reject(error);

    const message =
      error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!";
    toast.error(message);

    return Promise.reject(error);
  },
);

export default axiosClient;
