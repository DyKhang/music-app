import axiosClient from "./axios";
import { Artist } from "./musicApi";
import { Song } from "./playlistApi";

export interface Success {
  err: 0;
  msg: string;
  timestamp: number;
  data: {
    keyword: string;
    link: string;
  }[];
}

interface ArtistTop {
  id: string;
  name: string;
  link: string;
  spotlight: boolean;
  alias: string;
  playlistId: string;
  cover: string;
  thumbnail: string;
  objectType: string;
}

export type SearchTop = ArtistTop | Song;

export interface PlayList {
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
  isOwner: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface SearchResult {
  err: number;
  msg: string;
  timestamp: number;
  data: {
    sectionId: string;
    counter: {
      song: number;
      artist: number;
      playlist: number;
      video: number;
    };
    top: SearchTop;
    artists: Artist[];
    songs: Song[];
    playlists: PlayList[];
  };
}

export const searchApi = {
  getSuggest: () => axiosClient.get<Success>("/mp3/suggest"),
  getSearchResult: (keyword: string) =>
    axiosClient.get<SearchResult>("/mp3/search", {
      params: {
        keyword,
      },
    }),
};
