import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { lyricApi } from "../../api/lyricApi";

export const useLyric = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.lyric, id],
    queryFn: () => lyricApi.getLyric(id),
  });
};
