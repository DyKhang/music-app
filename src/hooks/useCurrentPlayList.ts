import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useIsCurrentPlayList = (playlistId: string) => {
  const currentPlayListReducerId = useSelector(
    (state: RootState) => state.player.playList.id,
  );

  const isCurrentPlayList = currentPlayListReducerId === playlistId;
  return { isCurrentPlayList };
};
