import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useChills = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CHILLS],
    queryFn: homeApi.getChill,
  });
};
