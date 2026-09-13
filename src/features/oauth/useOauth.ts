import { useMutation } from "@tanstack/react-query";
import { oauthApi } from "../../api/oauthApi";

export const useOauth = () =>
  useMutation({
    mutationFn: oauthApi.google,
  });
