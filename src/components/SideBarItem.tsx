import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  selectSongInPlayList,
  SongReducer,
  togglePlaying,
} from "../features/player/playerSlice";
import { AudioAnimation } from "./AudioAnimation";
import { useSelector } from "react-redux";
import {
  currentSongSelector,
  songsSelector,
} from "../features/player/selectors";
import { RootState, useAppDispatch } from "../store";
import { PopOvers } from "./PopOvers";
import { SideBarItemPop } from "./SideBarItemPop";

interface Props {
  song: SongReducer;
}

export const SideBarItem: React.FC<Props> = ({ song }) => {
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const songs = useSelector(songsSelector);
  const currentSong = useSelector(currentSongSelector);
  const currentPlay = currentSong.encodeId === song.encodeId;
  const dispatch = useAppDispatch();

  function handleTogglePlay() {
    if (isPlaying) {
      dispatch(togglePlaying(false));
    } else {
      dispatch(togglePlaying(true));
    }
  }

  function handleSelectSong() {
    const index = songs.findIndex((item) => item.encodeId === song.encodeId);
    dispatch(selectSongInPlayList(index));
  }

  if (currentPlay)
    return (
      <div className="group/tag flex items-center gap-[10px] rounded-[5px] bg-[#644646] p-[8px] text-white">
        <div
          className="relative size-[40px] cursor-pointer overflow-hidden rounded-[4px]"
          onClick={handleTogglePlay}
        >
          <img src={song.image} alt="" className="w-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
          {isPlaying ? (
            <AudioAnimation size="small" />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <div className="flex w-[51%] flex-col gap-[3px]">
          <span className="playlist-item__title cursor-pointer text-[1.4rem] font-[500] text-white">
            {song.name}
          </span>
          <span className="playlist-item__title cursor-pointer text-[1.2rem] text-[#696969] text-[hsla(0,0%,100%,.6)] hover:underline">
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

  return (
    <div
      className={`group/tag flex items-center gap-[10px] rounded-[5px] p-[8px] hover:bg-[rgba(0,0,0,0.05)] ${song.isPlayed && "opacity-40 hover:opacity-100"}`}
    >
      <div
        className="relative size-[40px] cursor-pointer overflow-hidden rounded-[4px]"
        onClick={handleSelectSong}
      >
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

        <PopOvers.PopOver>
          <>
            <PopOvers.Button open={`side-bar-${song.encodeId}`}>
              <div className="flex size-[26px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                <EllipsisHorizontalIcon className="size-[18px]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name={`side-bar-${song.encodeId}`}>
              <SideBarItemPop encodeId={song.encodeId} />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
      </div>
    </div>
  );
};
