import { createSlice } from "@reduxjs/toolkit";
import { songs } from "../../mockdata";

export interface initialState {
  currentSong: {
    audio: HTMLAudioElement;
    singer: string;
    name: string;
    image: string;
  };
}

const initialState: initialState = {
  currentSong: {
    audio: new Audio(songs[1].path),
    image: songs[1].image,
    name: songs[1].name,
    singer: songs[1].singer,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
