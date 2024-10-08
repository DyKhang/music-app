import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { artistApi } from "../../api/artistApi";

export const useDetailArtist = (alias: string) => {
  return useQuery({
    queryKey: [queryKeys.detailArtist, alias],
    queryFn: () => artistApi.getDetailArtist(alias),
  });
};
