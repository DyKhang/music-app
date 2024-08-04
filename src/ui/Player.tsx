import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { MusicPlayer } from "../features/player/MusicPlayer";
import { PlayerActions } from "../features/player/PlayerActions";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";

export const Player = () => {
  const songName = useSelector(
    (state: RootState) => state.player.currentSong.name
  );

  const singer = useSelector(
    (state: RootState) => state.player.currentSong.singer
  );

  const img = useSelector((state: RootState) => state.player.currentSong.image);

  const [isLove, setLove] = useState(false);

  function handleToggleLove() {
    setLove(!isLove);
  }

  return (
    <div className="fixed w-full bottom-0 ">
      <div className="w-[240px] group/new-playlist border-[#c3c1be] border-t-[1px] flex px-[24px] py-[16px] gap-3 items-center cursor-pointer bg-[#d9d7d4]">
        <div className="bg-[#b2b0ae] rounded-xl p-[2px] flex items-center justify-center flex-shrink-0">
          <PlusIcon className="size-[20px] text-white group-hover/new-playlist:scale-[80%] transition-transform duration-[300ms]" />
        </div>
        <span className="text-[1.4rem] text-black font-medium group-hover/new-playlist:text-[#5f4646]">
          Tạo playlist mới
        </span>
      </div>
      <div className="bg-[#dddad1] h-[90px] px-[20px] flex items-center select-none justify-between">
        <div className="flex items-center">
          <img
            src={img}
            alt=""
            className="size-[64px] object-cover rounded-[5px]"
          />
          <div className="flex flex-col ml-4 ">
            <span className="text-[1.4rem] font-[500]">{songName}</span>
            <span className="text-[1.2rem] text-[#696969]">{singer}</span>
          </div>
          {isLove ? (
            <HeartIconSolid
              className="size-[18px] text-[#4d4c54] ml-8 cursor-pointer"
              onClick={handleToggleLove}
            />
          ) : (
            <HeartIcon
              className="size-[18px] text-[#4d4c54] ml-8 cursor-pointer"
              onClick={handleToggleLove}
            />
          )}
          <EllipsisHorizontalIcon className="size-[24px] rounded-full ml-[12px] cursor-pointer" />
        </div>
        <MusicPlayer />
        <PlayerActions />
      </div>
    </div>
  );
};
