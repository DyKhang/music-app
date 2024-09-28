import axiosClient from "./axios";

export interface Song {
  err: 0;
  msg: string;
  data: {
    [key: string]: string;
  };
  timestamp: number;
}

export interface Artist {
  id: string;
  name: string;
  link: string;
  spotlight: boolean;
  alias: string;
  thumbnail: string;
  thumbnailM: string;
  isOA: boolean;
  isOABrand: boolean;
  playlistId: string;
  totalFollow: number;
}

export interface Genre {
  id: string;
  name: string;
  title: string;
  alias: string;
  link: string;
}

export interface Composer {
  id: string;
  name: string;
  link: string;
  spotlight: boolean;
  alias: string;
  playlistId: string;
  cover: string;
  thumbnail: string;
  totalFollow: number;
}

export interface Album {
  encodeId: string;
  title: string;
  thumbnail: string;
  isoffical: boolean;
  link: string;
  isIndie: boolean;
  releaseDate: string;
  sortDescription: string;
  releasedAt: number;
  genreIds: string[];
  PR: boolean;
  artists: Artist[];
  artistsNames: string;
}

export interface InfoSong {
  err: number;
  msg: string;
  timestamp: number;
  data: {
    encodeId: string;
    title: string;
    alias: string;
    isOffical: boolean;
    username: string;
    artistsNames: string;
    artists: Artist[];
    isWorldWide: boolean;
    thumbnailM: string;
    link: string;
    thumbnail: string;
    duration: number;
    zingChoice: boolean;
    isPrivate: boolean;
    preRelease: boolean;
    releaseDate: number;
    genreIds: string[];
    distributor: string;
    isIndie: boolean;
    streamingStatus: number;
    allowAudioAds: boolean;
    userid: number;
    genres: Genre[];
    composers: Composer[];
    album: Album;
    isRBT: boolean;
    like: number;
    listen: number;
    liked: boolean;
    comment: number;
  };
}

export const musicApi = {
  getSong: (id: string) =>
    axiosClient.get<Song>("/song", {
      params: {
        id,
      },
    }),
  getInfoSong: (id: string) =>
    axiosClient.get<InfoSong>("/infosong", {
      params: {
        id,
      },
    }),
};
