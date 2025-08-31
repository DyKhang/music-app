import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useTop100 = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TOP100],
    queryFn: homeApi.getTop100,
  });
};
