import { UserLoginForm } from "../pages/SignIn/components/SignInForm";
import { UserRegisterForm } from "../pages/SignUp/components/SignUpForm";
import axiosClient from "./axios";

export type UserSession = {
  email: string;
  username: string;
  avatar: string;
};

export type ApiError = {
  statusCode: number;
  message: string;
};

export const userApi = {
  verify: (user: UserRegisterForm) => axiosClient.post("/user/verify", user),
  register: (emailToken: string) =>
    axiosClient.get("/user/register", {
      params: {
        emailToken,
      },
    }),
  login: (user: UserLoginForm) =>
    axiosClient.post("/user/login", user, { withCredentials: true }),
  me: () =>
    axiosClient.get<UserSession | ApiError>("/user/me", {
      withCredentials: true,
    }),
  logout: () =>
    axiosClient.post("/user/logout", null, { withCredentials: true }),
  refreshToken: () =>
    axiosClient.get("/user/refresh-token", { withCredentials: true }),
};
