import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";
import { queryKeys } from "../../constants/queryKeys";

export const useChart = () => {
  return useQuery({
    queryKey: [queryKeys.chart],
    queryFn: homeApi.getChart,
  });
};
