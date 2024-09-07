import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../../api/homeApi";

export const useBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: homeApi.getBanner,
  });
};
