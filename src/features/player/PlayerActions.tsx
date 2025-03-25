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
  const volume = useSelector((state: RootState) => state.volume);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentSong = useSelector(currentSongSelector);
  const hasLyric = currentSong.hasLyric;

  useEffect(() => {
    inputRef.current!.style.background = `linear-gradient(to right, #614646 ${volume}%, #c6c4bc ${volume}%)`;
  });

  function handleSetShowKaraoke() {
    if (hasLyric) setShowKaraoke(true);
  }

  return (
    <>
      <div
        className={`flex items-center gap-[20px] text-[#47474f] ${showKaraoke && "invisible"}`}
      >
        <button className="cursor-not-allowed rounded-lg border border-[#a5a3a1] p-[2px] text-[0.8rem] font-semibold text-[#a5a3a1]">
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
          <div className="cursor-pointer">
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

        <div className="flex cursor-pointer items-center gap-3">
          {volume > 0 ? (
            <SpeakerWaveIcon className="size-[16px]" />
          ) : (
            <SpeakerXMarkIcon className="size-[16px]" />
          )}
          <div className="w-[70px]">
            <input
              ref={inputRef}
              type="range"
              className="range"
              value={volume}
              onInput={(e) => {
                const newValue = Number(e.currentTarget.value);
                dispatch(changeVolume(newValue * 100));
                e.currentTarget.style.background = `linear-gradient(to right, #614646 ${newValue}%, #c6c4bc ${newValue}%)`;
              }}
            />
          </div>
        </div>
        <div className="h-[33px] w-[1px] flex-shrink-0 bg-[#d2cfc6]"></div>
        <ToolTip title="Danh sách phát">
          <button
            className={`flex size-[28px] items-center justify-center rounded-[4px] ${showPlayList && "bg-[#644646] text-white"}`}
            onClick={() => setShowPlayList(!showPlayList)}
          >
            <ListBulletIcon className="size-[18px]" />
          </button>
        </ToolTip>
      </div>
    </>
  );
};
