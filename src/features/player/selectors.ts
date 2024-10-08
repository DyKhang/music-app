import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const songsSelector = (state: RootState) => state.songs;
export const currentIndexSelector = (state: RootState) => state.currentIndex;

export const currentSongSelector = createSelector(
  songsSelector,
  currentIndexSelector,
  (songs, currentIndex) => {
    return songs[currentIndex];
  },
);

export const replayStatusSelector = createSelector(
  (state: RootState) => state.replayStatus.replay,
  (state: RootState) => state.replayStatus.currentIndex,
  (replayStatus, index) => {
    return replayStatus[index];
  },
);
