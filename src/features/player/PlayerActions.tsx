import {
  ListBulletIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { changeVolume } from "./playerSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { currentSongSelector } from "./selectors";
import { ToolTip } from "../../components/ToolTip";

interface Props {
  showPlayList: boolean;
  setShowPlayList: React.Dispatch<React.SetStateAction<boolean>>;
  showKaraoke: boolean;
  setShowKaraoke: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayerActions: React.FC<Props> = ({
  setShowPlayList,
  showPlayList,
  setShowKaraoke,
  showKaraoke,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const volume = useSelector((state: RootState) => state.player.volume);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentSong = useSelector(currentSongSelector);
  const hasLyric = currentSong.hasLyric;
  const prevVolume = useRef(volume);

  useEffect(() => {
    inputRef.current!.style.background = `linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) ${volume}%, var(--progressbar-player-bg) ${volume}%, var(--progressbar-player-bg) 100%)`;
  });

  function handleSetShowKaraoke() {
    if (hasLyric) setShowKaraoke(true);
  }

  return (
    <div
      className={`absolute bottom-[10px] left-0 flex w-full items-center justify-center gap-[10px] sm:static sm:w-auto sm:gap-[20px] ${showKaraoke && "invisible"} flex`}
    >
      <button className="hidden cursor-not-allowed rounded-lg border border-[#a5a3a1] p-[2px] text-[0.8rem] font-semibold text-[#a5a3a1] lg:block">
        MV
      </button>
      <ToolTip title="Xem lời bài hát">
        <FontAwesomeIcon
          icon={faMicrophone}
          className={`${!hasLyric ? "cursor-not-allowed text-[#a5a3a1]" : "cursor-pointer"}`}
          onClick={handleSetShowKaraoke}
        />
      </ToolTip>

      <ToolTip title="Chế độ cửa sổ">
        <div className="hidden cursor-pointer lg:block">
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
      </ToolTip>

      <div className="flex translate-x-[-4px] cursor-pointer items-center gap-3">
        <div
          onClick={() => {
            if (volume) {
              prevVolume.current = volume;
              dispatch(changeVolume(0));
            } else {
              dispatch(changeVolume(prevVolume.current * 100));
              prevVolume.current = 0;
            }
          }}
        >
          {volume > 0 ? (
            <SpeakerWaveIcon className="size-[16px]" />
          ) : (
            <SpeakerXMarkIcon className="size-[16px]" />
          )}
        </div>
        <div className="sm:w-[70px]">
          <input
            ref={inputRef}
            type="range"
            className="range w-[206px] sm:w-full"
            value={volume}
            onInput={(e) => {
              const newValue = Number(e.currentTarget.value);
              dispatch(changeVolume(newValue * 100));
              e.currentTarget.style.background = `linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) ${newValue}%, var(--progressbar-player-bg) ${newValue}%, var(--progressbar-player-bg) 100%)`;
            }}
          />
        </div>
      </div>
      <div className="h-[33px] w-[1px] flex-shrink-0 bg-[#d2cfc6]"></div>
      <ToolTip title="Danh sách phát">
        <div
          className={`flex size-[28px] items-center justify-center rounded-[4px] ${showPlayList && "bg-purple-primary text-white"}`}
          onClick={() => setShowPlayList(!showPlayList)}
        >
          <ListBulletIcon className="size-[18px]" />
        </div>
      </ToolTip>
    </div>
  );
};
