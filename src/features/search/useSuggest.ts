import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { searchApi } from "../../api/searchApi";

export const useSuggest = () => {
  return useQuery({
    queryKey: [queryKeys.suggest],
    queryFn: searchApi.getSuggest,
  });
};
