import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useNewRelease = () => {
  return useQuery({
    queryKey: [QUERY_KEY.NEWRELEASES],
    queryFn: homeApi.getNewReleases,
  });
};
