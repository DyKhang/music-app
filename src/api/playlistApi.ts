import axiosClient from "./axios";
import { Artist } from "./musicApi";

export interface Song {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: Artist[];
  isWorldWide: true;
  thumbnailM: string;
  link: string;
  thumbnail: string;
  duration: number;
  zingChoice: boolean;
  isPrivate: boolean;
  preRelease: boolean;
  releaseDate: number;
  genreIds: string[];
  album: {
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
  };
  distributor: string;
  indicators: [];
  isIndie: boolean;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
}

interface DetailPlaylist {
  err: number;
  msg: string;
  timestamp: number;
  data: {
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
    playItemMode: number;
    subType: number;
    uid: number;
    thumbnailM: string;
    isShuffle: boolean;
    isPrivate: boolean;
    userName: string;
    isAlbum: boolean;
    textType: string;
    isSingle: boolean;
    distributor: string;
    description: string;
    aliasTitle: string;
    sectionId: string;
    contentLastUpdate: number;
    artist: {
      id: string;
      name: string;
      link: string;
      spotlight: boolean;
      alias: string;
      playlistId: string;
      cover: string;
      thumbnail: string;
    };
    genres: [
      {
        id: string;
        name: string;
        title: string;
        alias: string;
        link: string;
      },
    ];
    song: {
      items: Song[];
      total: number;
      totalDuration: number;
    };
    like: number;
    listen: number;
    liked: boolean;
  };
}

export const playlistApi = {
  getDetailPlaylist: async (id: string | undefined) => {
    const response = await axiosClient.get<DetailPlaylist>(`detailplaylist`, {
      params: {
        id: id,
      },
    });

    return response.data.data;
  },
};
