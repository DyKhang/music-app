import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { userApi } from "../../api/userApi";

export const useMe = () => {
  return useQuery({ queryKey: [queryKeys.me], queryFn: userApi.me });
};
