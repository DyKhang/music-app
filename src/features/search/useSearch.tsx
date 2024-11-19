import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { searchApi } from "../../api/searchApi";

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: [queryKeys.search, keyword],
    queryFn: () => searchApi.getSearchResult(keyword),
  });
};
