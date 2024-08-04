import axios from "../axios";

export const getHome = async () => {
  try {
    const response = axios.get("/home");
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
