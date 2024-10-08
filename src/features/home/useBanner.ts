import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { queryKeys } from "../../constants/queryKeys";

export const useBanner = () => {
  return useQuery({
    queryKey: [queryKeys.banner],
    queryFn: homeApi.getBanner,
  });
};
