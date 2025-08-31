import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useTopSongs = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TOP_SONGS],
    queryFn: homeApi.getTopSongs,
  });
};
