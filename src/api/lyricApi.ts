import axiosClient from "./axios";

export interface LyricApi {
  err: number;
  msg: string;
  timestamp: number;
  data: {
    file: string;
    enabledVideoBG: boolean;
    BGMode: number;
    defaultIBGUrls: string[];
    sentences: {
      words: {
        startTime: number;
        endTime: number;
        data: string;
      }[];
    }[];
  };
}

export const lyricApi = {
  getLyric: (id: string) => axiosClient.get<LyricApi>(`/mp3/lyric/${id}`),
};
