import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../../api/musicApi";
import toast from "react-hot-toast";

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
      encodeId: "",
      image: "",
      name: "",
      singer: "",
      songUrl: "",
    },
  ],
  status: "idle",
  volume: 0,
  isPlaying: false,
  currentIndex: 0,
};

export const getSongReducer = createAsyncThunk(
  "player/getSongReducer",
  async ({ id, type }: { id: string; type: "play" | "next" }) => {
    const songRes = await musicApi.getSong(id);
    const songInfoRes = await musicApi.getInfoSong(id);
    const songUrl = songRes.data;
    const songInfo = songInfoRes.data;

    return { songUrl, songInfo, type };
  },
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeVolume: (state, { payload }: { payload: number }) => {
      state.volume = payload / 100;
    },
    togglePlaying: (state, { payload }: { payload: boolean }) => {
      state.isPlaying = payload;
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
    selectSong: (state, { payload }: { payload: number }) => {
      state.currentIndex = payload;
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
        // const isAppeared =
        //   state.songs.findIndex(
        //     (song) => song.encodeId === newSong.encodeId,
        //   ) !== -1;

        // if (!isAppeared) {
        //   state.songs.unshift(newSong);
        //   state.currentIndex = 0;
        //   state.status = "idle";
        // }

        if (action.payload.type === "play") {
          state.songs = [newSong];
          state.currentIndex = 0;
        } else if (action.payload.type === "next") {
          const isHadSongInSongs = state.songs[state.currentIndex].name; // check if there is any song in the list (the first time you come in)

          if (!isHadSongInSongs) {
            state.songs = [newSong];
          } else {
            state.songs.push(newSong);
          }
          toast.success("Đã thêm bài hát vào danh sách phát");
        }

        state.status = "idle";
      })
      .addCase(getSongReducer.pending, (state) => {
        state.status = "loading";
      });
  },
});
export const {
  changeVolume,
  togglePlaying,
  previousSong,
  nextSong,
  selectSong,
} = playerSlice.actions;

export default playerSlice.reducer;
