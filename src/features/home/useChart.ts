import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useChart = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CHART],
    queryFn: homeApi.getChart,
  });
};
