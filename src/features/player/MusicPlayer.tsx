import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  changeReplayStatus,
  getSongUrl,
  nextSong,
  playRandom,
  previousSong,
  replayPlaylist,
  setCurrentTime,
  setIsPlayed,
  togglePlaying,
  toggleShuffle,
} from "./playerSlice";
import { LoaderSmall } from "../../components/LoaderSmall";
import { currentSongSelector, replayStatusSelector } from "./selectors";
import { formatTime } from "../../utils/helper";
import { ReplayIcon } from "../../components/ReplayIcon";
import { ReplayOneIcon } from "../../components/ReplayOneIcon";
import { ToolTip } from "../../components/ToolTip";

interface Props {
  showKaraoke: boolean;
}

export const MusicPlayer: React.FC<Props> = ({ showKaraoke }) => {
  const isShuffle = useSelector((state: RootState) => state.isShuffle);
  const replayStatus = useSelector(replayStatusSelector);
  const [range, setRange] = useState(0);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const songRef = useRef<HTMLAudioElement>(new Audio());

  const currentSong = useSelector(currentSongSelector);
  const volume = useSelector((state: RootState) => state.volume);
  const isPlay = useSelector((state: RootState) => state.isPlaying);
  const status = useSelector((state: RootState) => state.status);
  const songUrl = currentSong.songUrl;

  const currentIndex = useSelector((state: RootState) => state.currentIndex);
  const songLength = useSelector((state: RootState) => state.songs).length;

  // Checks when has isPlay the song will be play and vice versa, used when isPlay state is changed elsewhere
  useEffect(() => {
    if (isPlay) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }, [isPlay, songRef]);

  // Handle event when the song ended
  useEffect(() => {
    const songElement = songRef.current;
    const isLastSong = currentIndex === songLength - 1;

    function handleEndedSong() {
      if (replayStatus === "replaySong") {
        songElement.play();
      } else if (replayStatus === "replayList" && isLastSong) {
        dispatch(replayPlaylist());
      } else {
        if (isShuffle) {
          dispatch(playRandom());
        } else {
          dispatch(nextSong());
        }
      }
    }

    songElement.addEventListener("ended", handleEndedSong);

    return () => {
      songElement.removeEventListener("ended", handleEndedSong);
    };
  }, [dispatch, replayStatus, currentIndex, songLength, songRef, isShuffle]);

  // When has the new song, the url of the songRef will be changed
  useEffect(() => {
    dispatch(getSongUrl());
    songRef.current.src = songUrl;
    dispatch(togglePlaying(true));
    dispatch(setIsPlayed(true));
    songRef.current.play();
  }, [songUrl, dispatch, songRef]);

  // Handle change volume range
  useEffect(() => {
    songRef.current.volume = volume / 100;
  }, [volume, songRef]);

  // Auto change song progress bar when currentTime changed
  useEffect(() => {
    const songElement = songRef.current;
    function handleSetRange() {
      setRange((songRef.current.currentTime / songRef.current.duration) * 100);
      dispatch(setCurrentTime(songElement.currentTime));

      inputRef.current!.style.background = `linear-gradient(to right, #614646 ${inputRef.current?.value}%, #c6c4bc ${inputRef.current?.value}%)`;
    }

    songElement.addEventListener("timeupdate", handleSetRange);

    return () => {
      songElement.removeEventListener("timeupdate", handleSetRange);
    };
  }, [range, songRef, dispatch]);

  function handleToggleShuffle() {
    dispatch(toggleShuffle());
  }

  function handleToggleReplay() {
    dispatch(changeReplayStatus());
  }

  function handlePlaySong() {
    if (isPlay) {
      dispatch(togglePlaying(false));
    } else {
      dispatch(togglePlaying(true));
    }
  }

  function handlePreviousSong() {
    dispatch(previousSong());
  }

  function handleNextSong() {
    dispatch(nextSong());
  }

  return (
    <div
      className={`absolute left-1/2 top-[34%] flex -translate-x-1/2 -translate-y-1/2 sm:top-1/2 ${showKaraoke ? "flex-col-reverse text-white" : "flex-col"} gap-3`}
    >
      <div className="flex items-center justify-center gap-16 text-[1.8rem]">
        <ToolTip title="Bật phát ngẫu nhiên">
          <i
            className={`fa-solid fa-shuffle cursor-pointer ${
              isShuffle && "text-[#7f4d4d]"
            }`}
            onClick={handleToggleShuffle}
          ></i>
        </ToolTip>

        <i
          className={`fa-solid fa-backward-step ${currentIndex === 0 ? "cursor-not-allowed opacity-20" : "cursor-pointer"}`}
          onClick={handlePreviousSong}
        ></i>
        <div
          className={`flex size-[40px] cursor-pointer items-center justify-center rounded-full border-[2px] ${showKaraoke ? "border-white" : "border-[#42424b]"}`}
          onClick={handlePlaySong}
        >
          {status === "loading" ? (
            <LoaderSmall color={showKaraoke ? "white" : undefined} />
          ) : isPlay ? (
            <PauseIcon className="translate-[-0.5px] size-[22px]" />
          ) : (
            <PlayIcon className="size-[22px] translate-x-[1px]" />
          )}
        </div>
        <i
          className={`fa-solid fa-forward-step ${currentIndex === songLength - 1 ? "cursor-not-allowed opacity-20" : "cursor-pointer"}`}
          onClick={handleNextSong}
        ></i>
        <ToolTip
          title={
            replayStatus === "none"
              ? "Bật phát lại tất cả"
              : replayStatus === "replayList"
                ? "Bật phát lại một bài"
                : "Tắt phát lại"
          }
        >
          <div className="cursor-pointer" onClick={handleToggleReplay}>
            {replayStatus !== "replaySong" ? (
              <ReplayIcon isReplayPlayList={replayStatus === "replayList"} />
            ) : (
              <ReplayOneIcon />
            )}
          </div>
        </ToolTip>
      </div>
      <div className="relative flex translate-x-[13px] items-center gap-2 sm:w-[500px] sm:translate-x-0">
        <span className="absolute left-[-38px] top-1/2 -translate-y-1/2 text-[1.2rem]">
          {status === "loading"
            ? "00:00"
            : formatTime(songRef.current.currentTime)}
        </span>
        <input
          ref={inputRef}
          type="range"
          className="range w-[80%] flex-1"
          value={range}
          onInput={(e) => {
            const newValue = Number(e.currentTarget.value);
            e.currentTarget.style.background = `linear-gradient(to right, #614646 ${newValue}%, #c6c4bc ${newValue}%)`;
            setRange(Number(newValue));
            songRef.current.currentTime =
              (newValue / 100) * songRef.current.duration;
          }}
        />
        <span className="text-[1.2rem]">
          {status === "loading" || !songRef.current.duration
            ? "00:00"
            : formatTime(songRef.current.duration)}
        </span>
      </div>
    </div>
  );
};
