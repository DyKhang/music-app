import { useQuery } from "@tanstack/react-query";
import { artistApi } from "../../api/artistApi";
import { QUERY_KEY } from "../../constants/queryKey";

export const useDetailArtist = (alias: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL_ARTIST, alias],
    queryFn: () => artistApi.getDetailArtist(alias),
  });
};
