import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCalRange } from "../../hooks/useCalRange";

export const MusicPlayer = () => {
  const [isPlay, setPlay] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [range, setRange] = useState(0);
  const song = useSelector(
    (state: RootState) => state.player.currentSong.audio
  );
  const { rangeInputRef, handleChangeBgRange } = useCalRange();

  useEffect(() => {
    function handleSetRange() {
      setRange((song.currentTime / song.duration) * 100);
    }

    const id = setInterval(() => {
      handleSetRange();
      handleChangeBgRange();
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [song.currentTime, song.duration, handleChangeBgRange]);

  function handleToggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function handleToggleReplay() {
    setIsReplay(!isReplay);
  }

  function handlePlaysong() {
    if (isPlay) {
      setPlay(!isPlay);
      song.pause();
    } else {
      setPlay(!isPlay);
      song.play();
    }
  }
  return (
    <div>
      <div className="flex items-center gap-16 text-[1.8rem] justify-center">
        <i
          className={`fa-solid fa-shuffle cursor-pointer ${
            isShuffle && "text-[#7f4d4d]"
          }`}
          onClick={handleToggleShuffle}
        ></i>
        <i className="fa-solid fa-backward-step cursor-pointer"></i>
        <div
          onClick={handlePlaysong}
          className="size-[40px] border-[2px] border-[#42424b] rounded-full cursor-pointer flex items-center justify-center"
        >
          {isPlay ? (
            <PauseIcon className="size-[22px]" />
          ) : (
            <PlayIcon className="size-[22px]" />
          )}
        </div>
        <i className="fa-solid fa-forward-step cursor-pointer"></i>
        <i
          className={`fa-solid fa-arrow-rotate-left cursor-pointer ${
            isReplay && "text-[#7f4d4d]"
          }`}
          onClick={handleToggleReplay}
        ></i>
      </div>
      <div className="flex items-center w-[500px] gap-2 mt-3">
        <span className="text-[1.2rem] text-[#32323d]">00:00</span>
        <input
          type="range"
          className="flex-1 range"
          ref={rangeInputRef}
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        />
        <span className="text-[1.2rem] text-[#32323d]">05:29</span>
      </div>
    </div>
  );
};
