import axiosClient from "./axios";
import { Song } from "./playlistApi";

export interface BannerItemChild {
  type: number;
  link: string;
  banner: string;
  cover: string;
  target: string;
  title: string;
  description: string;
  ispr: number;
  encodeId: string;
}

export interface BannerType {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: BannerItemChild[];
}

export enum StreamingStatus {
  normal = 1,
  premium = 2,
}

export interface NewReleasesItemChild {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: {
    id: string;
    name: string;
    link: string;
    spotlight: boolean;
    alias: string;
    thumbnail: string;
    thumbnailM: string;
    isOA: false;
    isOABrand: false;
    playlistId: string;
  }[];
  isWorldWide: boolean;
  previewInfo: {
    startTime: number;
    endTime: number;
  };
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
  streamingStatus: StreamingStatus;
  allowAudioAds: boolean;
  hasLyric: boolean;
}

export interface NewReleasesType {
  sectionType: string;
  title: string;
  link: string;
  items: {
    [key: string]: NewReleasesItemChild[];
    all: NewReleasesItemChild[];
    vPop: NewReleasesItemChild[];
    others: NewReleasesItemChild[];
  };
}

export interface PlayListItemChild {
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  link: string;
  title: string;
  sortDescription: string;
  artistsNames: string;
  artists: {
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
  }[];
}

export interface PlayListType {
  title: string;
  sectionType: string;
  viewType: string;
  itemType: string;
  options: {
    hideTitle: true;
  };
  sectionId: string;
  items: PlayListItemChild[];
}

interface HomeBanner {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: BannerType[];
  };
  timestamp: number;
}

interface HomeNewRelease {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: NewReleasesType[];
  };
  timestamp: number;
}

interface HomePlayList {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: PlayListType[];
  };
  timestamp: number;
}

export interface TopSongsItemChild {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: {
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
  }[];
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
    isoffical: boolean;
    link: string;
    isIndie: boolean;
    releaseDate: string;
    sortDescription: string;
    releasedAt: number;
    genreIds: string[];
    PR: boolean;
    artists: {
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
    }[];
    artistsNames: string;
  };
  distributor: string;
  isIndie: boolean;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
  rakingStatus: number;
  releasedAt: number;
}

export interface TopSongsType {
  banner: string;
  type: string;
  link: string;
  title: string;
  sectionType: string;
  sectionId: string;
  viewType: string;
  options: {
    autoSlider: boolean;
    hideArrow: boolean;
  };
  items: TopSongsItemChild[];
}

interface HomeTopSongs {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: TopSongsType[];
  };
  timestamp: number;
}

export interface ChartType {
  chartType: string;
  sectionType: string;
  sectionId: string;
  promotes: Song[];
  items: ChartItemChild[];
  chart: {
    times: {
      hour: string;
    }[];
    minScore: number;
    maxScore: number;
    items: {
      [key: string]: {
        time: number;
        hour: string;
        counter: number;
      }[];
    };
    totalScore: number;
  };
}

export interface ChartItemChild {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: {
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
  }[];
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
    isoffical: boolean;
    link: string;
    isIndie: boolean;
    releaseDate: string;
    sortDescription: string;
    releasedAt: number;
    genreIds: string[];
    PR: boolean;
    artists: {
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
    }[];
    artistsNames: string;
  };
  distributor: string;
  isIndie: boolean;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
  rakingStatus: number;
  score: number;
  totalTopZing: number;
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
}

interface HomeChart {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: ChartType[];
  };
  timestamp: number;
}

export const homeApi = {
  getBanner: async () => {
    const homeData = await axiosClient.get<HomeBanner>("/mp3/home");

    return homeData.data.data.items.find(
      (item) => item.sectionType === "banner",
    );
  },
  getNewReleases: async () => {
    const data = await axiosClient.get<HomeNewRelease>("/mp3/home");

    return data.data.data.items.find(
      (item) => item.sectionType === "new-release",
    );
  },
  getTrending: async () => {
    const data = await axiosClient.get<HomePlayList>("/mp3/home");

    return data.data.data.items.find(
      (item) =>
        item.sectionType === "playlist" && item.title === "Nhạc hot thịnh hành",
    );
  },
  getChill: async () => {
    const data = await axiosClient.get<HomePlayList>("/mp3/home");

    return data.data.data.items.find(
      (item) => item.sectionType === "playlist" && item.title === "Chill",
    );
  },
  getTop100: async () => {
    const data = await axiosClient.get<HomePlayList>("/mp3/home");

    return data.data.data.items.find(
      (item) => item.sectionType === "playlist" && item.title === "Top 100",
    );
  },
  getAlbumHot: async () => {
    const data = await axiosClient.get<HomePlayList>("/mp3/home");

    return data.data.data.items.find(
      (item) => item.sectionType === "playlist" && item.title === "Album Hot",
    );
  },
  getTopSongs: async () => {
    const data = await axiosClient.get<HomeTopSongs>("/mp3/home");

    return data.data.data.items.find((item) => item.title === "BXH Nhạc Mới");
  },
  getChart: async () => {
    const data = await axiosClient.get<HomeChart>("/mp3/home");

    return data.data.data.items.find((item) => item.sectionType === "RTChart");
  },
};
