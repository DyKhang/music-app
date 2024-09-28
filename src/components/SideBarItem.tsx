import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { SongReducer } from "../features/player/playerSlice";

interface Props {
  song: SongReducer;
}

export const SideBarItem: React.FC<Props> = ({ song }) => {
  return (
    <div className="group/tag flex items-center gap-[10px] rounded-[5px] p-[8px] hover:bg-[rgba(0,0,0,0.05)]">
      <div className="relative size-[40px] cursor-pointer overflow-hidden rounded-[4px]">
        <img src={song.image} alt="" className="w-full object-cover" />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/tag:block"></div>
        <FontAwesomeIcon
          icon={faPlay}
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block"
        />
      </div>
      <div className="flex w-[51%] flex-col gap-[3px]">
        <span className="playlist-item__title cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d]">
          {song.name}
        </span>
        <span className="playlist-item__title cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d] hover:underline">
          {song.singer}
        </span>
      </div>
      <div className="ml-auto hidden items-center gap-[8px] group-hover/tag:flex">
        <div className="flex size-[26px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <HeartIcon className="size-[18px]" />
        </div>
        <div className="flex size-[26px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <EllipsisHorizontalIcon className="size-[18px]" />
        </div>
      </div>
    </div>
  );
};
