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

import { PlayListSideBar } from "./PlayListSideBar";
import { PremiumIcon } from "../components/PremiumIcon";
import { PremiumUpdateTag } from "../components/PremiumUpdateTag";

export const Player = () => {
  const [showPlayList, setShowPlayList] = useState(false);

  const songName = useSelector(
    (state: RootState) => state.player.currentSong.name,
  );

  const singer = useSelector(
    (state: RootState) => state.player.currentSong.singer,
  );

  const img = useSelector((state: RootState) => state.player.currentSong.image);

  const isPremium = useSelector(
    (state: RootState) => state.player.currentSong.songUrl,
  ).includes("musics/premium.mp3");

  const [isLove, setLove] = useState(false);

  function handleToggleLove() {
    setLove(!isLove);
  }

  return (
    <>
      <div
        className={`group/new-playlist fixed ${songName && "translate-y-[-90px]"} bottom-[0px] left-0 z-50 flex w-[240px] cursor-pointer items-center gap-3 border-t-[1px] border-[#c3c1be] bg-[#d9d7d4] px-[24px] py-[16px] transition duration-300`}
      >
        <div className="flex flex-shrink-0 items-center justify-center rounded-xl bg-[#b2b0ae] p-[2px]">
          <PlusIcon className="size-[20px] text-white transition-transform duration-[300ms] group-hover/new-playlist:scale-[80%]" />
        </div>
        <span className="text-[1.4rem] font-medium text-black group-hover/new-playlist:text-[#5f4646]">
          Tạo playlist mới
        </span>
      </div>
      <div
        className={`fixed ${songName && "translate-y-[-90px]"} bottom-[-90px] z-50 w-full bg-[#dddad1] transition duration-300`}
      >
        <div className="flex h-[90px] select-none items-center justify-between px-[20px]">
          <div className="flex items-center">
            <img
              src={img}
              alt={songName}
              className="size-[64px] rounded-[5px] object-cover"
            />
            <div className="ml-4 flex flex-col">
              <span className="flex items-center gap-[8px] text-[1.4rem] font-[500]">
                {songName} {isPremium && <PremiumIcon />}
              </span>
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
          <PlayerActions
            setShowPlayList={setShowPlayList}
            showPlayList={showPlayList}
          />
        </div>
      </div>
      {isPremium && <PremiumUpdateTag />}
      <PlayListSideBar isShow={showPlayList} />
    </>
  );
};
