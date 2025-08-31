import { useQuery } from "@tanstack/react-query";
import { playlistApi } from "../../api/playlistApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useDetailPlayList = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL_PLAYLIST, id],
    queryFn: () => playlistApi.getDetailPlaylist(id),
  });
};
