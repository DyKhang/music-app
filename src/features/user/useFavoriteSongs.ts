import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKey";
import { userApi } from "../../api/userApi";

export const useFavoriteSongs = () =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.FAVORITE_SONGS],
    queryFn: ({ pageParam }) => userApi.getFavoriteSongs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
  });
