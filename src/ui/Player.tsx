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

export const Player = () => {
  const songName = useSelector(
    (state: RootState) => state.player.currentSong.name,
  );

  const singer = useSelector(
    (state: RootState) => state.player.currentSong.singer,
  );

  const img = useSelector((state: RootState) => state.player.currentSong.image);

  const [isLove, setLove] = useState(false);

  function handleToggleLove() {
    setLove(!isLove);
  }

  return (
    <>
      <div className="group/new-playlist fixed bottom-[90px] left-0 z-50 flex w-[240px] cursor-pointer items-center gap-3 border-t-[1px] border-[#c3c1be] bg-[#d9d7d4] px-[24px] py-[16px]">
        <div className="flex flex-shrink-0 items-center justify-center rounded-xl bg-[#b2b0ae] p-[2px]">
          <PlusIcon className="size-[20px] text-white transition-transform duration-[300ms] group-hover/new-playlist:scale-[80%]" />
        </div>
        <span className="text-[1.4rem] font-medium text-black group-hover/new-playlist:text-[#5f4646]">
          Tạo playlist mới
        </span>
      </div>
      <div className="fixed bottom-0 z-50 w-full">
        <div className="flex h-[90px] select-none items-center justify-between bg-[#dddad1] px-[20px]">
          <div className="flex items-center">
            <img
              src={img}
              alt=""
              className="size-[64px] rounded-[5px] object-cover"
            />
            <div className="ml-4 flex flex-col">
              <span className="text-[1.4rem] font-[500]">{songName}</span>
              <span className="text-[1.2rem] text-[#696969]">{singer}</span>
            </div>
            {isLove ? (
              <HeartIconSolid
                className="ml-8 size-[18px] cursor-pointer text-[#4d4c54]"
                onClick={handleToggleLove}
              />
            ) : (
              <HeartIcon
                className="ml-8 size-[18px] cursor-pointer text-[#4d4c54]"
                onClick={handleToggleLove}
              />
            )}
            <EllipsisHorizontalIcon className="ml-[12px] size-[24px] cursor-pointer rounded-full" />
          </div>
          <MusicPlayer />
          <PlayerActions />
        </div>
      </div>
    </>
  );
};
