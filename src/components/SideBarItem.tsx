import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  selectSongInPlayList,
  SongReducer,
} from "../features/player/playerSlice";
import { AudioAnimation } from "./AudioAnimation";
import { useSelector } from "react-redux";
import { songsSelector } from "../features/player/selectors";
import { RootState, useAppDispatch } from "../store";
import { PopOvers } from "./PopOvers";
import { SideBarItemPop } from "./SideBarItemPop";
import { useEffect } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTogglePlay } from "../hooks/useTogglePlay";
import { useIsCurrentSong } from "../hooks/useIsCurrentSong";
import { useNavigate } from "react-router";

interface Props {
  song: SongReducer;
}

export const SideBarItem: React.FC<Props> = ({ song }) => {
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const songs = useSelector(songsSelector);
  const playListInfo = useSelector((state: RootState) => state.playList);
  const navigate = useNavigate();
  const unPlayedSongs = songs.filter((song) => !song.isPlayed);
  const dispatch = useAppDispatch();
  const togglePlay = useTogglePlay();
  const { isCurrentSong } = useIsCurrentSong(song.encodeId);

  // scroll when change currentPlay
  useEffect(() => {
    const activeSongElement = document.querySelector(".playlist-item-active");
    if (activeSongElement) {
      activeSongElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isCurrentSong]);

  function handleSelectSong() {
    const index = songs.findIndex((item) => item.encodeId === song.encodeId);
    dispatch(selectSongInPlayList(index));
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.encodeId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: isDragging ? "#f3f1ed" : "",
    zIndex: isDragging ? "2" : "",
    boxShadow: isDragging ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "",
  };

  if (isCurrentSong)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="playlist-item-active sticky top-0 z-[1] overflow-hidden rounded-[5px]"
      >
        <div className="group/tag relative flex items-center gap-[10px] rounded-[5px] bg-[#644646] p-[8px] text-white">
          <div
            {...attributes}
            {...listeners}
            className="absolute inset-0 cursor-move"
          ></div>
          <div
            className="relative size-[40px] cursor-pointer overflow-hidden rounded-[4px]"
            onClick={togglePlay}
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
          <div className="relative flex w-[51%] flex-col gap-[3px]">
            <span className="oneline-letters cursor-pointer text-[1.4rem] font-[500] text-white">
              {song.name}
            </span>
            <span className="oneline-letters cursor-pointer text-[1.2rem] text-[#696969] text-[hsla(0,0%,100%,.6)] hover:underline">
              {song.singer}
            </span>
          </div>
          <div className="relative ml-auto hidden items-center gap-[8px] group-hover/tag:flex">
            <div className="flex size-[26px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
              <HeartIcon className="size-[18px]" />
            </div>
            <div className="flex size-[26px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
              <EllipsisHorizontalIcon className="size-[18px]" />
            </div>
          </div>
        </div>
        {unPlayedSongs[0] && !isDragging && (
          <div className="bg-[#e5e3df] px-[8px] pb-[5px] pt-[15px] text-[1.4rem] font-[700]">
            Tiếp theo
            {playListInfo.name && (
              <div className="flex items-center gap-[5px]">
                <span className="flex-shrink-0 font-[400] text-[rgba(20,20,20,0.4)]">
                  Từ playlist
                </span>
                <span
                  className="oneline-letters cursor-pointer font-[500] text-[#844d4d]"
                  onClick={() => navigate(`/album/${playListInfo.id}`)}
                >
                  {playListInfo.name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group/tag relative flex items-center gap-[10px] rounded-[5px] bg-[#e5e3df] p-[8px] hover:bg-[rgba(0,0,0,0.05)] ${song.isPlayed && "opacity-40 hover:opacity-100"}`}
    >
      <div
        className="absolute inset-0 cursor-move"
        {...attributes}
        {...listeners}
      ></div>
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
      <div className="relative flex w-[51%] flex-col gap-[3px]">
        <span className="oneline-letters cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d]">
          {song.name}
        </span>
        <span className="oneline-letters cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d] hover:underline">
          {song.singer}
        </span>
      </div>
      <div className="relative ml-auto hidden items-center gap-[8px] group-hover/tag:flex">
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
