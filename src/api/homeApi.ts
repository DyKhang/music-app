import axiosClient from "./axios";

interface BannerItemChild {
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

interface NewReleasesItemChild {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: [
    {
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
    },
  ];
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

export const homeApi = {
  getBanner: async () => {
    const homeData = await axiosClient.get<HomeBanner>("/home");

    return homeData.data.data.items.find(
      (item) => item.sectionType === "banner",
    );
  },
  getNewReleases: async () => {
    const data = await axiosClient.get<HomeNewRelease>("/home");

    return data.data.data.items.find(
      (item) => item.sectionType === "new-release",
    );
  },
};
