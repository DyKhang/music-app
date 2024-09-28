import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../../api/musicApi";

export interface SongReducer {
  singer: string;
  name: string;
  image: string;
  songUrl: string;
  encodeId: string;
}

export interface initialState {
  songs: SongReducer[];
  status: "idle" | "loading";
  volume: number;
  isPlaying: boolean;
  currentIndex: number;
}

const initialState: initialState = {
  songs: [
    {
      encodeId: "Z7AD7A9Z",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/d/2/6/2d26c133d28f2ebf7c2c2613b692b6a0.jpg",
      name: "Không Ai Hiểu Được Em",
      singer: "MYLINA, 4GOD",
      songUrl:
        "https://a128-z3.zmdcdn.me/dbbd1211e9bc44baa036a65a029d199a?authen=exp=1727553879~acl=/dbbd1211e9bc44baa036a65a029d199a*~hmac=0cbba328bf213388a737c999ba77c7cb",
    },
  ],
  status: "idle",
  volume: 0,
  isPlaying: false,
  currentIndex: 0,
};

export const getSongReducer = createAsyncThunk(
  "player/getSongReducer",
  async (id: string) => {
    const songRes = await musicApi.getSong(id);
    const songInfoRes = await musicApi.getInfoSong(id);
    const songUrl = songRes.data;
    const songInfo = songInfoRes.data;

    return { songUrl, songInfo };
  },
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeVolume: (state, action) => {
      state.volume = action.payload / 100;
    },
    togglePlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    previousSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    nextSong: (state) => {
      if (state.currentIndex < state.songs.length - 1) {
        state.currentIndex += 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSongReducer.fulfilled, (state, action) => {
        const songUrl = action.payload.songUrl.data?.["128"];
        const newSong: SongReducer = {
          encodeId: action.payload.songInfo.data.encodeId,
          image: action.payload.songInfo.data.thumbnailM,
          name: action.payload.songInfo.data.title,
          singer: action.payload.songInfo.data.artistsNames,
          songUrl: songUrl ? songUrl : "./musics/premium.mp3",
        };
        const isAppeared =
          state.songs.findIndex(
            (song) => song.encodeId === newSong.encodeId,
          ) !== -1;

        if (!isAppeared) {
          state.songs.unshift(newSong);
          state.currentIndex = 0;
          state.status = "idle";
        }
      })
      .addCase(getSongReducer.pending, (state) => {
        state.status = "loading";
      });
  },
});
export const { changeVolume, togglePlaying, previousSong, nextSong } =
  playerSlice.actions;

export default playerSlice.reducer;
