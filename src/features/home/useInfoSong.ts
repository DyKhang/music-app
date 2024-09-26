import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { musicApi } from "../../api/musicApi";

export const useInfoSong = (encodeId: string) => {
  return useQuery({
    queryKey: [queryKeys.infoSong, encodeId],
    queryFn: () => musicApi.getInfoSong(encodeId),
    staleTime: 1000 * 60 * 5,
  });
};
