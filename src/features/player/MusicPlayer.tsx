import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const MusicPlayer = () => {
  const [isPlay, setPlay] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const songUrl = useSelector(
    (state: RootState) => state.player.currentSong.songUrl,
  );

  const songRef = useRef(new Audio());
  const [range, setRange] = useState(0);
  const volume = useSelector(
    (state: RootState) => state.player.currentSong.volume,
  );

  useEffect(() => {
    songRef.current.src = songUrl;
    setPlay(true);
    songRef.current.play();
  }, [songUrl]);

  useEffect(() => {
    songRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    function handleSetRange() {
      setRange((songRef.current.currentTime / songRef.current.duration) * 100);
    }

    const id = setInterval(() => {
      handleSetRange();
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [songRef.current.currentTime, songRef.current.duration]);

  function handleToggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function handleToggleReplay() {
    setIsReplay(!isReplay);
  }

  function handlePlaySong() {
    if (isPlay) {
      setPlay(!isPlay);
      songRef.current.pause();
    } else {
      setPlay(!isPlay);
      songRef.current.play();
    }
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
        <i className="fa-solid fa-backward-step cursor-pointer"></i>
        <div
          className="flex size-[40px] cursor-pointer items-center justify-center rounded-full border-[2px] border-[#42424b]"
          onClick={handlePlaySong}
        >
          {isPlay ? (
            <PauseIcon className="size-[22px] translate-x-[-0.5px]" />
          ) : (
            <PlayIcon className="size-[22px] translate-x-[1px]" />
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
      <div className="mt-3 flex w-[500px] items-center gap-2">
        <span className="text-[1.2rem] text-[#32323d]">00:00</span>
        <input
          type="range"
          className="range flex-1"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        />
        <span className="text-[1.2rem] text-[#32323d]">05:29</span>
      </div>
    </div>
  );
};
