import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useAlbumHot = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ALBUM_HOT],
    queryFn: homeApi.getAlbumHot,
  });
};
