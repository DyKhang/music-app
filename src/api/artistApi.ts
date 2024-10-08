import axiosClient from "./axios";
import { Artist } from "./musicApi";

export interface SectionItem {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: Omit<Artist, "totalFollow">[];
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
  album: {
    encodeId: string;
    title: string;
    thumbnail: string;
    isoffical: true;
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
  radioId: number;
  isIndie: boolean;
  mvlink: string;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
}

export interface Section {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: SectionItem[];
  itemType: string;
}

export interface ArtistApi {
  err: number;
  msg: string;
  timestamp: number;
  data: {
    id: string;
    name: string;
    link: string;
    spotlight: boolean;
    alias: string;
    playlistId: string;
    cover: string;
    thumbnail: string;
    biography: string;
    sortBiography: string;
    thumbnailM: string;
    national: string;
    birthday: string;
    realname: string;
    totalFollow: number;
    follow: number;
    awards: string[];
    topAlbum: {
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
    };
    oalink: string;
    oaid: number;
    sections: Section[];
    sectionId: string;
    isOABrand: boolean;
    tabs: number[];
    hasOA: boolean;
  };
}

export const artistApi = {
  getDetailArtist: (alias: string) =>
    axiosClient.get<ArtistApi>("/artist", {
      params: {
        name: alias,
      },
    }),
};
