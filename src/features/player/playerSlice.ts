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
}

const initialState: initialState = {
  songs: [
    {
      encodeId: "Z6WDAAZA",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w780_r1x1_jpeg/cover/b/d/4/b/bd4b8122a514f70e9bfe2bae802f4c04.jpg",
      name: "Vẽ Đường Cong",
      singer: "Trúc Nhân",
      songUrl:
        "https://a128-z3.zmdcdn.me/6d941f24c32b8adb6ab1f09491a4a12e?authen=exp=1732179537~acl=/6d941f24c32b8adb6ab1f09491a4a12e*~hmac=62506bf4be7a83c9d7e745e55598105e",
      isPlayed: true,
      hasLyric: true,
    },
    {
      encodeId: "Z7OOF9F9",
      hasLyric: true,
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/4/2/c/942c265290248155a5ed85e929ba683d.jpg",
      isPlayed: false,
      name: "Thương Nhầm Người",
      singer: "Vũ Duy Khánh, ACV",
      songUrl:
        "https://vnso-zn-24-tf-a128-z3.zmdcdn.me/666e05ed534db73af216c0e6f929d555?authen=exp=1732180085~acl=/666e05ed534db73af216c0e6f929d555*~hmac=9d8b71ced7d768b7aeb1568c20f65365",
    },
    {
      encodeId: "Z6IAWZO0",
      hasLyric: true,
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w780_r1x1_jpeg/cover/0/c/f/f/0cffa61c57704ac4818286eb8d41c961.jpg",
      isPlayed: false,
      name: "tâm trạng rất là tệ",
      singer: "Willistic",
      songUrl:
        "https://a128-z3.zmdcdn.me/4ea6f1bacbc6bc36dcad16df1ea5ba40?authen=exp=1732180387~acl=/4ea6f1bacbc6bc36dcad16df1ea5ba40*~hmac=8831d8b945805bce4dd6940fb05a3221",
    },
    {
      encodeId: "Z7WFEZ9F",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w780_r1x1_jpeg/cover/5/a/f/a/5afa09b4cf6aa4320aec2c5536d8f93d.jpg",
      isPlayed: false,
      name: "chuyện hôm qua",
      singer: "Willistic",
      songUrl:
        "https://a128-z3.zmdcdn.me/94cf93e375f53dc1a67985444521e333?authen=exp=1732180506~acl=/94cf93e375f53dc1a67985444521e333*~hmac=3d653c34000d1a8c5784589642ffedc9",
      hasLyric: false,
    },
    {
      encodeId: "Z6UFFAOZ",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w780_r1x1_jpeg/cover/2/5/5/4/255417f3f7ff9cdc740b9ea97555c6ec.jpg",
      isPlayed: false,
      name: "Giá như anh ở đây",
      singer: "Willistic, Cầm",
      songUrl:
        "https://a128-z3.zmdcdn.me/480fbba62c76220253cea6abc8becda5?authen=exp=1732180564~acl=/480fbba62c76220253cea6abc8becda5*~hmac=59d123f3356b9c1bc102dcb00b9b61cd",
      hasLyric: true,
    },
    {
      encodeId: "Z6AFC76C",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w780_r1x1_jpeg/cover/0/d/5/0/0d50b4bf7d3a2072f4c46b2f09d0f8ce.jpg",
      isPlayed: false,
      name: "Đại Loại",
      singer: "Willistic, xolitxo",
      songUrl:
        "https://a128-z3.zmdcdn.me/2e21822f1f83f4719fb63e220cbefb2c?authen=exp=1732180601~acl=/2e21822f1f83f4719fb63e220cbefb2c*~hmac=41f8cb4424ab43c6fa3e069a7d5a8520",
      hasLyric: true,
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
      state.songs[state.currentIndex].encodeId,
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
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * state.songs.length);
      } while (newIndex === state.currentIndex);
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
} = playerSlice.actions;

export default playerSlice.reducer;
