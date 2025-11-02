import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MusicPlayer } from "../features/player/MusicPlayer";
import { PlayerActions } from "../features/player/PlayerActions";
import { useSelector } from "react-redux";

import { PlayListSideBar } from "./PlayListSideBar";
import { PremiumIcon } from "../components/PremiumIcon";
import { PremiumUpdateTag } from "../components/PremiumUpdateTag";
import { currentSongSelector } from "../features/player/selectors";
import { KaraokeScreen } from "../components/KaraokeScreen";
import { RootState, useAppDispatch } from "../store";
import {
  getFavoriteSongs,
  setShowPlaylist,
} from "../features/player/playerSlice";
import { ToolTip } from "../components/ToolTip";
import { useLocation } from "react-router";
import { useToggleFavoriteSong } from "../features/user/useToggleFavoriteSong";
import { Plus } from "./icons/Plus";

const disablePlayerPaths = ["/sign-in", "/sign-up"];

const disableAddPlaylistPaths = [
  "/profile/manage",
  "/profile/conversation",
  "/profile/secure",
];

export const Player = () => {
  const [showKaraoke, setShowKaraoke] = useState(false);
  const currentSong = useSelector(currentSongSelector);
  const showPlayList = useSelector(
    (state: RootState) => state.player.showPlayList,
  );
  const dispatch = useAppDispatch();
  const setShowPlayList = () => dispatch(setShowPlaylist());
  const session = useSelector((state: RootState) => state.auth.session);

  useEffect(() => {
    if (session) {
      dispatch(getFavoriteSongs());
    }
  }, [session, dispatch]);
  const location = useLocation();

  const disableAll = disablePlayerPaths.includes(location.pathname);

  const disableAddPlaylist = disableAddPlaylistPaths.includes(
    location.pathname,
  );

  const { image, name, singer, songUrl, encodeId, isLiked } = currentSong;
  const { mutate: toggleFavoriteSong } = useToggleFavoriteSong(
    encodeId,
    isLiked,
  );
  const isPremium = songUrl.includes("sounds/premium.mp3");

  return (
    <>
      {session && (
        <div
          className={`fixed ${(disableAll || disableAddPlaylist) && "invisible"} hidden text-navigation-text xl:flex ${name && "translate-y-[-90px]"} bottom-[0px] left-0 z-50 w-[240px] cursor-pointer items-center gap-3 border-t-[0.5px] border-border-primary px-[24px] py-[16px] transition duration-300 hover:text-text-item-hover`}
        >
          <Plus />
          <span className="text-[1.4rem] font-medium">Tạo playlist mới</span>
        </div>
      )}
      <div
        className={`fixed ${disableAll && "invisible"} ${name && "translate-y-[-90px]"} bottom-[-90px] z-[56] w-full bg-layout-bg transition duration-300 ${showKaraoke && "bg-transparent"}`}
      >
        <div className="relative flex h-[135px] select-none items-center justify-between px-[20px] sm:h-[90px]">
          <div className={`flex items-center ${showKaraoke && "invisible"}`}>
            <div className="hidden items-center lg:flex">
              <img
                src={image}
                alt={name}
                className="size-[64px] rounded-[5px] object-cover"
              />
              <div className="ml-4 flex flex-col">
                <span className="flex items-center gap-[8px] text-[1.4rem] font-[500]">
                  {name} {isPremium && <PremiumIcon />}
                </span>
                <span className="text-[1.2rem] text-text-secondary">
                  {singer}
                </span>
              </div>
              <ToolTip title="Thêm vào thư viện">
                {isLiked && session ? (
                  <HeartIconSolid
                    className="ml-8 size-[18px] cursor-pointer text-purple-primary"
                    onClick={() => toggleFavoriteSong()}
                  />
                ) : (
                  <HeartIcon
                    className="ml-8 size-[18px] cursor-pointer"
                    onClick={() => toggleFavoriteSong()}
                  />
                )}
              </ToolTip>

              <ToolTip title="Xem thêm">
                <EllipsisHorizontalIcon className="ml-[12px] size-[24px] cursor-pointer rounded-full" />
              </ToolTip>
            </div>
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
