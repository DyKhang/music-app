import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../../api/searchApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH, keyword],
    queryFn: () => searchApi.getSearchResult(keyword),
  });
};
