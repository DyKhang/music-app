import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/searchApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useSuggest = () => {
  return useQuery({
    queryKey: [QUERY_KEY.suggest],
    queryFn: searchApi.getSuggest,
  });
};
