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

interface Props {
  showPlayList: boolean;
  setShowPlayList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayerActions: React.FC<Props> = ({
  setShowPlayList,
  showPlayList,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const volume = useSelector((state: RootState) => state.player.volume);

  return (
    <div className="flex items-center gap-[20px] text-[#47474f]">
      <button className="cursor-pointer rounded-lg border border-[#a5a3a1] p-[2px] text-[0.8rem] font-semibold text-[#a5a3a1]">
        MV
      </button>
      <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer" />
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
      <div className="flex cursor-pointer items-center gap-3">
        {volume > 0 ? (
          <SpeakerWaveIcon className="size-[16px]" />
        ) : (
          <SpeakerXMarkIcon className="size-[16px]" />
        )}
        <div className="w-[70px]">
          <input
            type="range"
            className="range"
            onChange={(e) => {
              dispatch(changeVolume(Number(e.target.value)));
            }}
          />
        </div>
      </div>
      <div className="h-[33px] w-[1px] flex-shrink-0 bg-[#d2cfc6]"></div>
      <button
        className={`flex size-[28px] items-center justify-center rounded-[4px] ${showPlayList && "bg-[#644646] text-white"}`}
        onClick={() => setShowPlayList(!showPlayList)}
      >
        <ListBulletIcon className="size-[18px]" />
      </button>
    </div>
  );
};
