import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { togglePlaying } from "../features/player/playerSlice";

export const useTogglePlay = () => {
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const dispatch = useAppDispatch();

  return function () {
    if (isPlaying) {
      dispatch(togglePlaying(false));
    } else {
      dispatch(togglePlaying(true));
    }
  };
};
