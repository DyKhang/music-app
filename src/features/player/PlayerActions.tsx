import {
  ListBulletIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCalRange } from "../../hooks/useCalRange";

export const PlayerActions = () => {
  const [range, setRange] = useState(0);
  const song = useSelector(
    (state: RootState) => state.player.currentSong.audio
  );
  const { rangeInputRef } = useCalRange();

  // Set volume cho bài hát
  useEffect(() => {
    song.volume = range / 100;
  }, [range, song]);

  return (
    <div className="text-[#47474f] flex items-center gap-[20px]">
      <button className="text-[0.8rem] font-semibold text-[#a5a3a1] border p-[2px]  border-[#a5a3a1] rounded-lg cursor-pointer">
        MV
      </button>
      <i className="fa-solid fa-microphone-lines cursor-pointer size-[16px] flex items-center justify-center"></i>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M7 19v-8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z"></path>
            <path d="M6.5 16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 12h1M5 7h1"
            ></path>
          </g>
        </svg>
      </div>
      <div className="flex items-center gap-3">
        {range > 0 ? (
          <SpeakerWaveIcon className="size-[16px]" />
        ) : (
          <SpeakerXMarkIcon className="size-[16px]" />
        )}
        <div className="w-[70px]">
          <input
            type="range"
            className="range"
            ref={rangeInputRef}
            value={range}
            onChange={(e) => {
              setRange(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="bg-[#d2cfc6] w-[1px] h-[33px] flex-shrink-0"></div>
      <button>
        <ListBulletIcon className="size-[18px]" />
      </button>
    </div>
  );
};
