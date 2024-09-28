import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const songsSelector = (state: RootState) => state.player.songs;
export const currentIndexSelector = (state: RootState) =>
  state.player.currentIndex;

export const currentSongSelector = createSelector(
  songsSelector,
  currentIndexSelector,
  (songs, currentIndex) => {
    return songs[currentIndex];
  },
);
