import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { playlistApi } from "../../api/playlistApi";

export const useDetailPlayList = (id: string | undefined) => {
  return useQuery({
    queryKey: [queryKeys.detailPlaylist, id],
    queryFn: () => playlistApi.getDetailPlaylist(id),
  });
};
