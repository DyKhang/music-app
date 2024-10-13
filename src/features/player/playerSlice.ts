import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { musicApi } from "../../api/musicApi";
import premiumSound from "../../../public/musics/premium.mp3";
import toast from "react-hot-toast";
import { playlistApi } from "../../api/playlistApi";

export interface SongReducer {
  singer: string;
  name: string;
  image: string;
  songUrl: string;
  encodeId: string;
  isPlayed: boolean;
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
  playList: {
    name: string;
    id: string;
  };
}

const initialState: initialState = {
  songs: [
    {
      encodeId: "",
      image: "",
      name: "",
      singer: "",
      songUrl: "",
      isPlayed: false,
    },
  ],
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
};

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

    const songIds = playList.song.items.map((item) => item.encodeId);

    const songPromises = songIds.map((id) => musicApi.getSong(id));
    const songInfoResPromises = songIds.map((id) => musicApi.getInfoSong(id));

    const songUrlsRes = await Promise.all(songPromises);
    const songInfosRes = await Promise.all(songInfoResPromises);

    const songUrls = songUrlsRes.map((res) => res.data);
    const songInfos = songInfosRes.map((res) => res.data);

    const playListName = playList.title;
    const playListId = playList.encodeId;

    return { songUrls, songInfos, playListName, playListId, songIndex };
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
        payload,
      }: {
        payload: {
          songs: SongReducer[];
          activeSongId: string;
          overSongId: string;
        };
      },
    ) => {
      const currentSongId = state.songs[state.currentIndex].encodeId;
      const isChangeCurrentSongIndex = payload.activeSongId === currentSongId;
      if (isChangeCurrentSongIndex) {
        const newCurrentIndex = state.songs.findIndex(
          (song) => song.encodeId === payload.overSongId,
        );
        state.currentIndex = newCurrentIndex;
        const songs = payload.songs.map((song, index) =>
          index <= newCurrentIndex
            ? { ...song, isPlayed: true }
            : { ...song, isPlayed: false },
        );
        state.songs = songs;
      } else {
        state.songs = payload.songs;
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
          songUrl: songUrl ? songUrl : premiumSound,
          isPlayed: false,
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
          {
            payload: {
              songInfos,
              playListId,
              playListName,
              songUrls,
              songIndex,
            },
          },
        ) => {
          const songs = songInfos.map((item, index): SongReducer => {
            return {
              encodeId: item.data.encodeId,
              image: item.data.thumbnailM,
              isPlayed: false,
              name: item.data.title,
              singer: item.data.artistsNames,
              songUrl: songUrls[index].data?.["128"]
                ? songUrls[index].data?.["128"]
                : premiumSound,
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
} = playerSlice.actions;

export default playerSlice.reducer;
