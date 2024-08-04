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
    audio: new Audio(songs[5].path),
    image: songs[5].image,
    name: songs[5].name,
    singer: songs[5].singer,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
