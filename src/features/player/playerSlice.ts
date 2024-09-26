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
  currentSong: SongReducer;
  songs: SongReducer[];
  status: "idle" | "loading";
  volume: number;
  isPlaying: boolean;
  currentIndex: number;
}

const initialState: initialState = {
  currentSong: {
    image: "",
    name: "",
    singer: "",
    songUrl: "",
    encodeId: "",
  },
  songs: [
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/6/9/d/169db75865305cd8dd29019b4e704e8c.jpg",
      encodeId: "Z7BZBE7E",
      name: "Tình Đầu Quá Chén",
      singer: "Nhiều nghệ sĩ",
      songUrl: "Test",
    },
  ],
  status: "idle",
  volume: 0.5,
  isPlaying: false,
  currentIndex: 0,
};

export const getCurrentSong = createAsyncThunk(
  "player/getCurrentSong",
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
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentSong.fulfilled, (state, action) => {
        state.currentSong.image = action.payload.songInfo.data.thumbnailM;
        state.currentSong.name = action.payload.songInfo.data.title;
        state.currentSong.singer = action.payload.songInfo.data.artistsNames;
        state.currentSong.encodeId = action.payload.songInfo.data.encodeId;

        const song = action.payload.songUrl.data?.["128"];
        if (song) {
          state.currentSong.songUrl = song;
        } else {
          state.currentSong.songUrl = "./musics/premium.mp3";
        }
        state.status = "idle";
      })
      .addCase(getCurrentSong.pending, (state) => {
        state.status = "loading";
      });
  },
});
export const { changeVolume, togglePlaying } = playerSlice.actions;

export default playerSlice.reducer;
