import axiosClient from "./axios";

interface HomeItemChild {
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

export interface HomeItemParent {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: HomeItemChild[];
}

interface HomeData {
  err: number;
  msg: string;
  data: {
    hasMore: boolean;
    total: number;
    items: HomeItemParent[];
  };
  timestamp: number;
}

export const homeApi = {
  getBanner: async () => {
    const homeData = await axiosClient.get<HomeData>("/home");

    return homeData.data.data.items.find(
      (item) => item.sectionType === "banner"
    );
  },
};
