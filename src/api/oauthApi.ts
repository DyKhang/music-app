import axiosClient from "./axios";

export const oauthApi = {
  google: () => axiosClient.get("/oauth/google"),
};
