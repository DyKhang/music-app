import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { queryKeys } from "../../constants/queryKeys";

export const useTopSongs = () => {
  return useQuery({
    queryKey: [queryKeys.topsongs],
    queryFn: homeApi.getTopSongs,
  });
};
