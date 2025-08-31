import { useSelector } from "react-redux";
import { currentSongSelector } from "../features/player/selectors";

export const useIsCurrentSong = (songId: string) => {
  const currentSongReducerId = useSelector(currentSongSelector).encodeId;
  const isCurrentSong = currentSongReducerId === songId;
  return { isCurrentSong };
};
