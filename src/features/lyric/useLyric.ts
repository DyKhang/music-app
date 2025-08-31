import { useQuery } from "@tanstack/react-query";
import { lyricApi } from "../../api/lyricApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useLyric = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LYRIC, id],
    queryFn: () => lyricApi.getLyric(id),
  });
};
