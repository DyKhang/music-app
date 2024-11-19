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

import { PlayListSideBar } from "./PlayListSideBar";
import { PremiumIcon } from "../components/PremiumIcon";
import { PremiumUpdateTag } from "../components/PremiumUpdateTag";
import { currentSongSelector } from "../features/player/selectors";
import { KaraokeScreen } from "../components/KaraokeScreen";

export const Player = () => {
  const [showPlayList, setShowPlayList] = useState(false);
  const [isLove, setLove] = useState(false);
  const [showKaraoke, setShowKaraoke] = useState(false);
  const currentSong = useSelector(currentSongSelector);

  const { image, name, singer, songUrl } = currentSong;
  const isPremium = songUrl.includes("musics/premium.mp3");

  function handleToggleLove() {
    setLove(!isLove);
  }

  return (
    <>
      <div
        className={`group/new-playlist fixed ${name && "translate-y-[-90px]"} bottom-[0px] left-0 z-50 flex w-[240px] cursor-pointer items-center gap-3 border-t-[1px] border-[#c3c1be] bg-[#d9d7d4] px-[24px] py-[16px] transition duration-300`}
      >
        <div className="flex flex-shrink-0 items-center justify-center rounded-xl bg-[#b2b0ae] p-[2px]">
          <PlusIcon className="size-[20px] text-white transition-transform duration-[300ms] group-hover/new-playlist:scale-[80%]" />
        </div>
        <span className="text-[1.4rem] font-medium text-black group-hover/new-playlist:text-[#5f4646]">
          Tạo playlist mới
        </span>
      </div>
      <div
        className={`fixed ${name && "translate-y-[-90px]"} bottom-[-90px] z-[56] w-full bg-[#dddad1] transition duration-300 ${showKaraoke && "bg-transparent"}`}
      >
        <div className="flex h-[90px] select-none items-center justify-between px-[20px]">
          <div className={`flex items-center ${showKaraoke && "invisible"}`}>
            <img
              src={image}
              alt={name}
              className="size-[64px] rounded-[5px] object-cover"
            />
            <div className="ml-4 flex flex-col">
              <span className="flex items-center gap-[8px] text-[1.4rem] font-[500]">
                {name} {isPremium && <PremiumIcon />}
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
          <MusicPlayer showKaraoke={showKaraoke} />
          <PlayerActions
            setShowPlayList={setShowPlayList}
            showPlayList={showPlayList}
            setShowKaraoke={setShowKaraoke}
            showKaraoke={showKaraoke}
          />
        </div>
      </div>
      {isPremium && <PremiumUpdateTag />}
      <PlayListSideBar isShow={showPlayList} showKaraoke={showKaraoke} />
      <KaraokeScreen isShow={showKaraoke} setIsShow={setShowKaraoke} />
    </>
  );
};
