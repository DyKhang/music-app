import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useTrending = () => {
  return useQuery({
    queryKey: [QUERY_KEY.POPULAR],
    queryFn: homeApi.getTrending,
  });
};
