import { UserUpdateForm } from "../pages/ProfileManage/components/UpdateProfileForm";
import { UserChangePasswordForm } from "../pages/ProfileSecure/components/SecureForm";
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

type AddDeleteFavoriteSong = {
  songId: string;
};

export type FavoriteSongs = {
  songs: {
    encodeId: string;
    title: string;
    thumbnailM: string;
    streamingStatus: number;
    artists: {
      alias: string;
      name: string;
    }[];
    duration: number;
    hasLyric: boolean;
    artistsNames: string;
  }[];
  currentPage: number;
  nextPage: number;
};

export type FavoriteSongIds = {
  songIds: string[];
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
  uploadAvatar: (formData: FormData) =>
    axiosClient.post("/user/profile/avatar", formData, {
      withCredentials: true,
    }),
  deleteAvatar: () =>
    axiosClient.delete("/user/profile/avatar", { withCredentials: true }),
  update: (user: UserUpdateForm) =>
    axiosClient.patch("/user/profile", user, { withCredentials: true }),
  changePassword: (data: UserChangePasswordForm) =>
    axiosClient.patch("/user/profile/password", data, {
      withCredentials: true,
    }),
  addFavoriteSong: (data: AddDeleteFavoriteSong) =>
    axiosClient.post(`/user/favorite-songs/${data.songId}`, null, {
      withCredentials: true,
    }),
  deleteFavoriteSong: (data: AddDeleteFavoriteSong) =>
    axiosClient.delete(`/user/favorite-songs/${data.songId}`, {
      withCredentials: true,
    }),
  getFavoriteSongs: (page: number) =>
    axiosClient.get<FavoriteSongs>("/user/favorite-songs", {
      withCredentials: true,
      params: {
        page,
      },
    }),
  getFavoriteSongIds: () =>
    axiosClient.get<FavoriteSongIds>("/user/favorite-songIds", {
      withCredentials: true,
    }),
  logout: () =>
    axiosClient.post("/user/logout", null, { withCredentials: true }),
  refreshToken: () =>
    axiosClient.get("/user/refresh-token", { withCredentials: true }),
};
