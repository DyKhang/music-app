import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { queryKeys } from "../../constants/queryKeys";

export const useNewRelease = () => {
  return useQuery({
    queryKey: [queryKeys.newReleases],
    queryFn: homeApi.getNewReleases,
  });
};
