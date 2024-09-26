import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { homeApi } from "../../api/homeApi";

export const useAlbumHot = () => {
  return useQuery({
    queryKey: [queryKeys.albumHot],
    queryFn: homeApi.getAlbumHot,
  });
};
