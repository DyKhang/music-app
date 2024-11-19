import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://zingmp3-api-two.vercel.app/api",
});

export default axiosClient;
