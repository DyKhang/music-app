import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { homeApi } from "../../api/homeApi";

export const useChills = () => {
  return useQuery({
    queryKey: [queryKeys.chills],
    queryFn: homeApi.getChill,
  });
};
