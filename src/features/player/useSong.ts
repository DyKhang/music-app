import { useQuery } from "@tanstack/react-query";
import { musicApi } from "../../api/musicApi";

export const useSong = (id: string) => {
  return useQuery({
    queryKey: ["song", id],
    queryFn: () => musicApi.getSong(id),
  });
};
