import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { songs } from "../../mockdata";
import { musicApi } from "../../api/musicApi";

export interface initialState {
  currentSong: {
    singer: string;
    name: string;
    image: string;
    songUrl: string;
    encodeId: string;
    volume: number;
  };
}

const initialState: initialState = {
  currentSong: {
    image: songs[7].image,
    name: songs[7].name,
    singer: songs[7].singer,
    songUrl: "./musics/song8.mp3",
    encodeId: "",
    volume: 0.5,
  },
};

export const getSong = createAsyncThunk(
  "player/getSong",
  async (id: string) => {
    const res = await musicApi.getSong(id);

    return res.data;
  },
);

export const getInfoSong = createAsyncThunk(
  "player/getInfoSong",
  async (id: string) => {
    const res = await musicApi.getInfoSong(id);

    return res.data;
  },
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeVolume: (state, action) => {
      state.currentSong.volume = action.payload / 100;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSong.fulfilled, (state, action) => {
      const song = action.payload.data?.["128"];

      if (song) {
        state.currentSong.songUrl = action.payload.data[128];
      } else {
        state.currentSong.songUrl = "./musics/premium.mp3";
      }
    });
    builder.addCase(getInfoSong.fulfilled, (state, action) => {
      state.currentSong.image = action.payload.data.thumbnailM;
      state.currentSong.name = action.payload.data.title;
      state.currentSong.singer = action.payload.data.artistsNames;
      state.currentSong.encodeId = action.payload.data.encodeId;
    });
  },
});
export const { changeVolume } = playerSlice.actions;

export default playerSlice.reducer;
