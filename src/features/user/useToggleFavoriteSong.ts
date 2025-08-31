import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../api/userApi";
import { QUERY_KEY } from "../../constants/queryKey";
import { RootState, useAppDispatch } from "../../store";
import { addFavoriteSong, deleteFavoriteSong } from "../player/playerSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export const useToggleFavoriteSong = (
  songId: string,
  isLiked: boolean | undefined,
) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const session = useSelector((state: RootState) => state.auth.session);

  return useMutation({
    mutationFn: async () => {
      if (!session) {
        throw new Error("Vui lòng đăng nhập để sử dụng chức năng này");
      }

      if (isLiked) {
        return userApi.deleteFavoriteSong({ songId });
      } else {
        return userApi.addFavoriteSong({ songId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.INFO_SONG, songId],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FAVORITE_SONGS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DETAIL_PLAYLIST],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.DETAIL_ARTIST],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SEARCH],
      });

      if (isLiked) {
        dispatch(deleteFavoriteSong(songId));
      } else {
        dispatch(addFavoriteSong(songId));
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
