import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { nextSong, previousSong, togglePlaying } from "./playerSlice";
import { LoaderSmall } from "../../components/LoaderSmall";
import { currentSongSelector } from "./selectors";

export const MusicPlayer = () => {
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [range, setRange] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const currentSong = useSelector(currentSongSelector);
  const songUrl = currentSong.songUrl;
  const dispatch: AppDispatch = useDispatch();
  const songRef = useRef(new Audio());

  const volume = useSelector((state: RootState) => state.player.volume);

  const isPlay = useSelector((state: RootState) => state.player.isPlaying);

  const loading = useSelector((state: RootState) => state.player.status);
  const minutes = Math.floor(songRef.current.duration / 60);
  const seconds = Math.floor(songRef.current.duration % 60);
  const currentIndex = useSelector(
    (state: RootState) => state.player.currentIndex,
  );
  const songLength = useSelector(
    (state: RootState) => state.player.songs,
  ).length;

  // play lại bài hát khi isReplay là đúng
  useEffect(() => {
    if (isReplay) {
      songRef.current.onended = () => {
        songRef.current.play();
      };
    } else {
      songRef.current.onended = () => null;
    }
  }, [isReplay]);

  // Set lại url của bài hát khi có bài hát mới thay đổi
  useEffect(() => {
    songRef.current.src = songUrl;
    dispatch(togglePlaying(true));
    songRef.current.play();
  }, [songUrl, dispatch]);

  // Xử lý khi change thanh volume
  useEffect(() => {
    songRef.current.volume = volume / 100;
  }, [volume]);

  // Tự động set thanh tiến độ bài hát khi currentTime thay đổi
  useEffect(() => {
    function handleSetRange() {
      setRange((songRef.current.currentTime / songRef.current.duration) * 100);
    }

    const id = setInterval(() => {
      handleSetRange();
    }, 200);

    return () => {
      clearInterval(id);
    };
  }, [songRef.current.currentTime, songRef.current.duration]);

  // Kiểm tra khi có isPlay thì bài hát sẽ được play và ngược lại, dùng khi trạng thái isPlay bị thay đổi ở các nơi khác
  useEffect(() => {
    if (isPlay) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    setCurrentTime(Math.floor(songRef.current.currentTime));
  }, [songRef.current.currentTime]);

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handleToggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function handleToggleReplay() {
    setIsReplay(!isReplay);
  }

  // Sự kiện play và dừng bài hát khi click
  function handlePlaySong() {
    if (isPlay) {
      dispatch(togglePlaying(false));
      songRef.current.pause();
    } else {
      dispatch(togglePlaying(true));
      songRef.current.play();
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
          {loading === "loading" ? (
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
        <i
          className={`fa-solid fa-arrow-rotate-left cursor-pointer ${
            isReplay && "text-[#7f4d4d]"
          }`}
          onClick={handleToggleReplay}
        ></i>
      </div>
      <div className="relative mt-3 flex w-[500px] items-center gap-2">
        <span className="absolute left-[-38px] top-1/2 -translate-y-1/2 text-[1.2rem] text-[#32323d]">
          {loading === "loading" ? "00:00" : formatTime(currentTime)}
        </span>
        <input
          type="range"
          className="range flex-1"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        />
        <span className="text-[1.2rem] text-[#32323d]">
          {loading === "loading"
            ? "00:00"
            : `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </span>
      </div>
    </div>
  );
};
