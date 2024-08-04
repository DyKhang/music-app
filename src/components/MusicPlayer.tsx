import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const MusicPlayer = () => {
  const [isPlay, setPlay] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const rangeInputRef = useRef<HTMLInputElement>(null);
  const audio = useSelector(
    (state: RootState) => state.player.currentSong.audio
  );

  useEffect(() => {
    const handleChangeBgRange = () => {
      const x = rangeInputRef.current?.value;
      const color = `linear-gradient(90deg, #614646 ${x}%, #c6c4bc ${x}%)`;
      if (rangeInputRef.current) {
        rangeInputRef.current.style.background = color;
      }
    };

    const inputElement = rangeInputRef.current;

    if (inputElement) {
      inputElement.addEventListener("input", handleChangeBgRange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleChangeBgRange);
      }
    };
  }, []);

  function handleToggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function handleToggleReplay() {
    setIsReplay(!isReplay);
  }

  function handlePlayAudio() {
    if (isPlay) {
      setPlay(!isPlay);
      audio.pause();
    } else {
      setPlay(!isPlay);
      audio.play();
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
          onClick={handlePlayAudio}
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
        <input type="range" className="flex-1 range" ref={rangeInputRef} />
        <span className="text-[1.2rem] text-[#32323d]">05:29</span>
      </div>
    </div>
  );
};
