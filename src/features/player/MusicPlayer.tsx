import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  changeReplayStatus,
  getSongUrl,
  nextSong,
  previousSong,
  replayPlaylist,
  setIsPlayed,
  togglePlaying,
} from "./playerSlice";
import { LoaderSmall } from "../../components/LoaderSmall";
import { currentSongSelector, replayStatusSelector } from "./selectors";
import { formatTime } from "../../utils/helper";

export const MusicPlayer = () => {
  const [isShuffle, setIsShuffle] = useState(false);
  const replayStatus = useSelector(replayStatusSelector);
  const [range, setRange] = useState(0);
  const dispatch = useAppDispatch();
  const songRef = useRef(new Audio());
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  }, [isPlay]);

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
        dispatch(nextSong());
      }
    }

    songElement.addEventListener("ended", handleEndedSong);

    return () => {
      songElement.removeEventListener("ended", handleEndedSong);
    };
  }, [dispatch, replayStatus, currentIndex, songLength]);

  // When has the new song, the url of the songRef will be changed
  useEffect(() => {
    songRef.current.src = songUrl;
    dispatch(togglePlaying(true));
    dispatch(setIsPlayed(true));
    dispatch(getSongUrl());
    songRef.current.play();
  }, [songUrl, dispatch]);

  // Handle change volume range
  useEffect(() => {
    songRef.current.volume = volume / 100;
  }, [volume]);

  // Auto change song progress bar when currentTime changed
  useEffect(() => {
    const songElement = songRef.current;
    function handleSetRange() {
      setRange((songRef.current.currentTime / songRef.current.duration) * 100);

      inputRef.current!.style.background = `linear-gradient(to right, #614646 ${inputRef.current?.value}%, #c6c4bc ${inputRef.current?.value}%)`;
    }

    songElement.addEventListener("timeupdate", handleSetRange);

    return () => {
      songElement.removeEventListener("timeupdate", handleSetRange);
    };
  }, [range]);

  function handleToggleShuffle() {
    setIsShuffle(!isShuffle);
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
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center justify-center gap-16 text-[1.8rem]">
        <i
          className={`fa-solid fa-shuffle cursor-pointer ${
            isShuffle && "text-[#7f4d4d]"
          }`}
          onClick={handleToggleShuffle}
        ></i>
        <i
          className={`fa-solid fa-backward-step ${currentIndex === 0 ? "cursor-not-allowed opacity-20" : "cursor-pointer"}`}
          onClick={handlePreviousSong}
        ></i>
        <div
          className="flex size-[40px] cursor-pointer items-center justify-center rounded-full border-[2px] border-[#42424b]"
          onClick={handlePlaySong}
        >
          {status === "loading" ? (
            <LoaderSmall />
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
        <div className="relative" onClick={handleToggleReplay}>
          <i
            className={`fa-solid fa-arrow-rotate-left cursor-pointer ${replayStatus !== "none" && "text-[#614646]"}`}
          ></i>
          {replayStatus === "replaySong" && (
            <div className="absolute right-[-1px] top-[1px] flex h-[12px] items-center justify-center overflow-hidden bg-[#dddad1] p-[0.3px] text-[1.3rem] font-semibold text-[#614646]">
              <span>1</span>
            </div>
          )}
        </div>
      </div>
      <div className="relative mt-3 flex w-[500px] items-center gap-2">
        <span className="absolute left-[-38px] top-1/2 -translate-y-1/2 text-[1.2rem] text-[#050505]">
          {status === "loading"
            ? "00:00"
            : formatTime(songRef.current.currentTime)}
        </span>
        <input
          ref={inputRef}
          type="range"
          className="range flex-1"
          value={range}
          onInput={(e) => {
            const newValue = Number(e.currentTarget.value);
            e.currentTarget.style.background = `linear-gradient(to right, #614646 ${newValue}%, #c6c4bc ${newValue}%)`;
            setRange(Number(newValue));
            songRef.current.currentTime =
              (newValue / 100) * songRef.current.duration;
          }}
        />
        <span className="text-[1.2rem] text-[#32323d]">
          {status === "loading"
            ? "00:00"
            : formatTime(songRef.current.duration)}
        </span>
      </div>
    </div>
  );
};
