import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { homeApi } from "../../api/homeApi";

export const useTrending = () => {
  return useQuery({
    queryKey: [queryKeys.playlist],
    queryFn: homeApi.getTrending,
  });
};
