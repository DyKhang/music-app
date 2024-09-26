import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { queryKeys } from "../../constants/queryKeys";

export const useTop100 = () => {
  return useQuery({
    queryKey: [queryKeys.top100],
    queryFn: homeApi.getTop100,
  });
};
