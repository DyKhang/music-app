import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../../api/musicApi";
import premiumSound from "../../../public/musics/premium.mp3";
import toast from "react-hot-toast";
import { playlistApi } from "../../api/playlistApi";
import { RootState } from "../../store";

export interface SongReducer {
  singer: string;
  name: string;
  image: string;
  songUrl: string;
  encodeId: string;
  isPlayed: boolean;
  hasLyric: boolean;
}

export interface initialState {
  songs: SongReducer[];
  status: "idle" | "loading";
  volume: number;
  isPlaying: boolean;
  currentIndex: number;
  replayStatus: {
    replay: ["none", "replayList", "replaySong"];
    currentIndex: number;
  };
  isShuffle: boolean;
  playList: {
    name: string;
    id: string;
  };
  currentTime: number;
  showPlayList: boolean;
}

const initialState: initialState = {
  songs: [
    {
      encodeId: "Z6IAWZO0",
      hasLyric: true,
      image: "",
      isPlayed: false,
      name: "",
      singer: "",
      songUrl: "placeholder",
    },
  ],
  isShuffle: false,
  status: "idle",
  volume: 50,
  isPlaying: false,
  currentIndex: 0,
  replayStatus: {
    replay: ["none", "replayList", "replaySong"],
    currentIndex: 0,
  },
  playList: {
    id: "",
    name: "",
  },
  currentTime: 0,
  showPlayList: false,
};

// Hàm createAsyncThunk nếu sử dụng generic sẽ có ba tham số:
// Tham số thứ nhất là kiểu dữ liệu trả về của hàm async
// Tham số thứ hai là kiểu dữ liệu cho tham số đầu vào của thunk
// Tham số thứ ba là kiểu cho thunkApi cho phép bạn lấy dispatch, getState và các thông tin khác

export const getSongUrl = createAsyncThunk<string, void, { state: RootState }>(
  "player/getSongUrl",
  async (_, { getState }) => {
    const state = getState();
    const res = await musicApi.getSong(
      state.player.songs[state.player.currentIndex].encodeId,
    );
    const currentSongUrl = res.data.data?.["128"]
      ? res.data.data?.["128"]
      : premiumSound;

    return currentSongUrl;
  },
);

export const getSongReducer = createAsyncThunk(
  "player/getSongReducer",
  async ({
    id,
    type,
  }: {
    id: string;
    type: "play" | "addBottom" | "addNext";
  }) => {
    const songRes = await musicApi.getSong(id);
    const songInfoRes = await musicApi.getInfoSong(id);
    const songUrl = songRes.data;
    const songInfo = songInfoRes.data;

    return { songUrl, songInfo, type };
  },
);

export const getPlayList = createAsyncThunk(
  "player/getPlayList",
  async ({ id, songIndex = 0 }: { id: string; songIndex?: number }) => {
    const playList = await playlistApi.getDetailPlaylist(id);

    const songInfos = playList.song.items;

    const playListName = playList.title;
    const playListId = playList.encodeId;

    return { songInfos, playListName, playListId, songIndex };
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
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    playRandom: (state) => {
      if (state.songs.length <= 1) return;
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * state.songs.length);
      } while (newIndex === state.currentIndex);

      const newSongs = state.songs.map((song, index) => {
        if (index <= newIndex) {
          return { ...song, isPlayed: true };
        } else return { ...song, isPlayed: false };
      });

      state.songs = newSongs;

      state.currentIndex = newIndex;
    },
    changeReplayStatus: (state) => {
      state.replayStatus.currentIndex =
        state.replayStatus.currentIndex >= 2
          ? 0
          : (state.replayStatus.currentIndex += 1);
    },
    previousSong: (state) => {
      if (state.currentIndex > 0) {
        state.songs[state.currentIndex].isPlayed = false;
        state.currentIndex -= 1;
      }
    },
    nextSong: (state) => {
      if (state.currentIndex < state.songs.length - 1) {
        state.songs[state.currentIndex].isPlayed = true;
        state.currentIndex += 1;
      }
    },
    replayPlaylist: (state) => {
      state.currentIndex = 0;
    },
    selectSongInPlayList: (state, { payload }: { payload: number }) => {
      state.songs = state.songs.map((song, index) =>
        index <= payload
          ? { ...song, isPlayed: true }
          : { ...song, isPlayed: false },
      );
      state.currentIndex = payload;
    },
    deleteSongInPlayList: (state, { payload }: { payload: string }) => {
      const deletedSongIndex = state.songs.findIndex(
        (song) => song.encodeId === payload,
      );
      state.songs = state.songs.filter((song) => song.encodeId !== payload);
      const isDeletedSongBeforeCurrentSong =
        deletedSongIndex < state.currentIndex;
      if (isDeletedSongBeforeCurrentSong) {
        state.currentIndex--;
      }
    },
    setIsPlayed: (state, { payload }: { payload: boolean }) => {
      state.songs[state.currentIndex].isPlayed = payload;
    },
    setSongsWhenDrag: (
      state,
      {
        payload: { activeSongId, overSongId, songs },
      }: {
        payload: {
          songs: SongReducer[];
          activeSongId: string;
          overSongId: string;
        };
      },
    ) => {
      const currentSongId = state.songs[state.currentIndex].encodeId;
      const isChangeCurrentSongIndex = activeSongId === currentSongId;
      if (isChangeCurrentSongIndex) {
        const newCurrentIndex = state.songs.findIndex(
          (song) => song.encodeId === overSongId,
        );
        state.currentIndex = newCurrentIndex;
        state.songs = songs.map((song, index) =>
          index <= newCurrentIndex
            ? { ...song, isPlayed: true }
            : { ...song, isPlayed: false },
        );
      } else {
        const activeSongIndex = state.songs.findIndex(
          (song) => song.encodeId === activeSongId,
        );
        const overSongIndex = state.songs.findIndex(
          (song) => song.encodeId === overSongId,
        );

        const isActiveSongAfterCurrentSong =
          activeSongIndex > state.currentIndex;
        const isActiveSongBeforeCurrentSong =
          activeSongIndex < state.currentIndex;

        const isOverSongBeforeCurrentSong = overSongIndex <= state.currentIndex;
        const isOverSongAfterCurrentSong = overSongIndex >= state.currentIndex;

        if (isActiveSongAfterCurrentSong && isOverSongBeforeCurrentSong) {
          state.currentIndex++;
          state.songs = songs.map((song) =>
            song.encodeId === activeSongId ? { ...song, isPlayed: true } : song,
          );
          return;
        } else if (
          isActiveSongBeforeCurrentSong &&
          isOverSongAfterCurrentSong
        ) {
          state.currentIndex--;
          state.songs = songs.map((song) =>
            song.encodeId === activeSongId
              ? { ...song, isPlayed: false }
              : song,
          );
          return;
        }
        state.songs = songs;
      }
    },
    setCurrentTime: (state, { payload }: { payload: number }) => {
      state.currentTime = payload;
    },
    setShowPlaylist: (state) => {
      state.showPlayList = !state.showPlayList;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSongReducer.fulfilled, (state, action) => {
        const songUrl = action.payload.songUrl.data?.["128"];
        const newSong: SongReducer = {
          encodeId: action.payload.songInfo.data.encodeId,
          image: action.payload.songInfo.data.thumbnailM.replace("240", "780"),
          name: action.payload.songInfo.data.title,
          singer: action.payload.songInfo.data.artistsNames,
          songUrl: songUrl ? songUrl : premiumSound,
          isPlayed: false,
          hasLyric: Boolean(action.payload.songInfo.data.hasLyric),
        };

        if (action.payload.type === "play") {
          state.songs = [newSong];
          state.playList.name = "";
          state.playList.id = "";
          state.currentIndex = 0;
        } else {
          const isHadSongInSongs = state.songs[state.currentIndex].name; // check if there is any song in the list (the first time you come in)

          if (!isHadSongInSongs) {
            state.songs = [newSong];
          } else {
            const isAppeared =
              state.songs.findIndex(
                (song) => song.encodeId === newSong.encodeId,
              ) !== -1;

            if (!isAppeared) {
              if (action.payload.type === "addBottom") {
                state.songs.push(newSong);
              } else if (action.payload.type === "addNext") {
                state.songs.splice(state.currentIndex + 1, 0, newSong);
              }
            } else {
              toast("Bài hát đã có sẵn trong danh sách", {
                icon: "🤒",
                position: "bottom-left",
                style: {
                  padding: "12px",
                },
              });
              state.status = "idle";
              return;
            }
          }
          toast.success("Đã thêm bài hát vào danh sách phát");
        }
        state.showPlayList = true;
        state.status = "idle";
      })
      .addCase(getSongReducer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlayList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getPlayList.fulfilled,
        (
          state,
          { payload: { songInfos, playListId, playListName, songIndex } },
        ) => {
          const songs = songInfos.map((item): SongReducer => {
            return {
              encodeId: item.encodeId,
              image: item.thumbnailM.replace("240", "780"),
              isPlayed: false,
              name: item.title,
              singer: item.artistsNames,
              songUrl: "",
              hasLyric: Boolean(item.hasLyric),
            };
          });
          state.songs = songs;
          state.currentIndex = songIndex;
          state.songs = state.songs.map((song, index) =>
            index <= songIndex
              ? { ...song, isPlayed: true }
              : { ...song, isPlayed: false },
          );
          state.playList.name = playListName;
          state.playList.id = playListId;
          state.showPlayList = true;
          state.status = "idle";
        },
      )
      .addCase(getSongUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getSongUrl.fulfilled,
        (state, { payload }: { payload: string }) => {
          const currentSongHasSongUrl = Boolean(
            state.songs[state.currentIndex].songUrl,
          );

          if (!currentSongHasSongUrl) {
            state.songs[state.currentIndex].songUrl = payload;
          }

          state.status = "idle";
        },
      );
  },
});
export const {
  changeVolume,
  togglePlaying,
  previousSong,
  nextSong,
  selectSongInPlayList,
  setIsPlayed,
  deleteSongInPlayList,
  changeReplayStatus,
  setSongsWhenDrag,
  toggleShuffle,
  replayPlaylist,
  setCurrentTime,
  playRandom,
  setShowPlaylist,
} = playerSlice.actions;

export default playerSlice.reducer;
