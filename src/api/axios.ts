import axios from "axios";

const axiosClient = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: "https://zingmp3-api-two.vercel.app/api",
});

export default axiosClient;
