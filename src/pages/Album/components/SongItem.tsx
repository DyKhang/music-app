import { faMicrophone, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Song } from "../../../api/playlistApi";
import { RootState, useAppDispatch } from "../../../store";
import {
  getSongReducer,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { useSelector } from "react-redux";
import { currentSongSelector } from "../../../features/player/selectors";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { PremiumIcon } from "../../../components/PremiumIcon";
import { formatTime } from "../../../utils/helper";
import { useNavigate } from "react-router";
import { PopOvers } from "../../../components/PopOvers";
import { SongItemPop } from "./SongItemPop";

interface Props {
  song: Song;
}

export const SongItem: React.FC<Props> = ({ song }) => {
  const currentSong = useSelector(currentSongSelector);
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const hasAlbum = Boolean(song.album);
  const currentPlay = currentSong.encodeId === song.encodeId;
  const isPremium = song.streamingStatus === 2;
  const navigate = useNavigate();

  function handleCheckSong() {
    setIsChecked(!isChecked);
  }

  function handleClickImg() {
    if (currentPlay) {
      if (isPlaying) {
        dispatch(togglePlaying(false));
      } else {
        dispatch(togglePlaying(true));
      }
    } else {
      dispatch(getSongReducer({ id: song.encodeId, type: "play" }));
    }
  }

  if (currentPlay)
    return (
      <div className="group/item flex items-center rounded-[4px] border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.05)] p-[10px]">
        <div className="mr-[10px] flex w-1/2 items-center">
          <MusicalNoteIcon className="size-[14px] text-[#696969] group-hover/item:hidden" />
          <div
            className={`hidden size-[14px] flex-shrink-0 cursor-pointer rounded-[3px] border-[1px] ${isChecked ? "border-white bg-[rgba(0,0,0,0.15)]" : "border-[rgba(0,0,0,0.2)]"} group-hover/item:block`}
            onClick={handleCheckSong}
          >
            {isChecked && <CheckIcon className="text-white" />}
          </div>

          <div
            className="relative mx-[10px] flex size-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
            onClick={handleClickImg}
          >
            <img src={song.thumbnailM} alt="" className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
            {isPlaying ? (
              <AudioAnimation size="small" />
            ) : (
              <FontAwesomeIcon
                icon={faPlay}
                className="absolute text-[1.6rem] text-white"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="flex items-center gap-[8px] text-[1.4rem] font-[500] leading-[1.6]">
              {song.title} {isPremium && <PremiumIcon />}
            </p>
            <span className="mt-[3px] text-[1.2rem] text-[#696969]">
              {song.artistsNames}
            </span>
          </div>
        </div>
        <span className="flex-1 cursor-pointer text-[1.2rem] text-[rgba(50,50,61,0.5)] hover:text-[#844d4d] hover:underline">
          {hasAlbum && song.album.title}
        </span>
        <div className="hidden items-center gap-[8px] group-hover/item:flex">
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
          </div>
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <HeartIcon className="size-[16px]" />
          </div>
          <PopOvers.PopOver>
            <>
              <PopOvers.Button open={`album-${song.encodeId}`}>
                <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                  <EllipsisHorizontalIcon className="size-[16px]" />
                </div>
              </PopOvers.Button>
              <PopOvers.Content name={`album-${song.encodeId}`}>
                <SongItemPop encodeId={song.encodeId} />
              </PopOvers.Content>
            </>
          </PopOvers.PopOver>
        </div>
        <span className="text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden">
          {formatTime(song.duration)}
        </span>
      </div>
    );

  return (
    <div className="group/item flex items-center rounded-[4px] border-b-[1px] border-[rgba(0,0,0,0.05)] p-[10px] hover:bg-[rgba(0,0,0,0.05)]">
      <div className="mr-[10px] flex w-1/2 items-center">
        <MusicalNoteIcon className="size-[14px] flex-shrink-0 text-[#696969] group-hover/item:hidden" />
        <div
          className={`hidden size-[14px] flex-shrink-0 cursor-pointer rounded-[3px] border-[1px] ${isChecked ? "border-white bg-[rgba(0,0,0,0.15)]" : "border-[rgba(0,0,0,0.2)]"} group-hover/item:block`}
          onClick={handleCheckSong}
        >
          {isChecked && <CheckIcon className="text-white" />}
        </div>

        <div
          className="relative mx-[10px] flex size-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
          onClick={() =>
            dispatch(getSongReducer({ id: song.encodeId, type: "play" }))
          }
        >
          <img src={song.thumbnailM} alt="" className="w-full object-cover" />
          <div className="absolute inset-0 hidden bg-black/50 group-hover/item:block"></div>
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute hidden text-[1.6rem] text-white group-hover/item:block"
          />
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-[8px] text-[1.4rem] font-[500] leading-[1.6]">
            {song.title} {isPremium && <PremiumIcon />}
          </span>
          <span className="mt-[3px] text-[1.2rem] text-[#696969]">
            {song.artistsNames}
          </span>
        </div>
      </div>
      <span
        onClick={() => {
          song?.album && navigate(`/album/${song.album.encodeId}`);
        }}
        className="flex-1 cursor-pointer text-[1.2rem] text-[rgba(50,50,61,0.5)] hover:text-[#844d4d] hover:underline"
      >
        {hasAlbum && song.album.title}
      </span>
      <div className="hidden items-center gap-[8px] group-hover/item:flex">
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
        </div>
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <HeartIcon className="size-[16px]" />
        </div>

        <PopOvers.PopOver>
          <>
            <PopOvers.Button open={`album-${song.encodeId}`}>
              <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                <EllipsisHorizontalIcon className="size-[16px]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name={`album-${song.encodeId}`}>
              <SongItemPop encodeId={song.encodeId} />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
      </div>
      <span className="text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden">
        {formatTime(song.duration)}
      </span>
    </div>
  );
};
