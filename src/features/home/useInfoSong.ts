import { useQuery } from "@tanstack/react-query";
import { musicApi } from "../../api/musicApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useInfoSong = (encodeId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.INFO_SONG, encodeId],
    queryFn: () => musicApi.getInfoSong(encodeId),
  });
};
