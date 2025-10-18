import { faMicrophone, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Song } from "../../../api/playlistApi";
import { RootState, useAppDispatch } from "../../../store";
import {
  getPlayList,
  selectSongInPlayList,
} from "../../../features/player/playerSlice";
import { useSelector } from "react-redux";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { PremiumIcon } from "../../../components/PremiumIcon";
import { formatTime } from "../../../utils/helper";
import { useNavigate, useParams } from "react-router";
import { PopOvers } from "../../../components/PopOvers";
import { SongItemPop } from "./SongItemPop";
import { useTogglePlay } from "../../../hooks/useTogglePlay";
import { useIsCurrentPlayList } from "../../../hooks/useCurrentPlayList";
import { useIsCurrentSong } from "../../../hooks/useCurrentSong";
import { ArtistsSpan } from "../../../components/ArtistsSpan";
import { useToggleFavoriteSong } from "../../../features/user/useToggleFavoriteSong";
import clsx from "clsx";

interface Props {
  song: Song;
  index: number;
}

export const SongItem: React.FC<Props> = ({ song, index }) => {
  const { id } = useParams();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const songs = useSelector((state: RootState) => state.player.songs);
  const hasAlbum = Boolean(song.album);
  const isPremium = song.streamingStatus === 2;
  const navigate = useNavigate();
  const togglePlay = useTogglePlay();
  const { isCurrentPlayList } = useIsCurrentPlayList(id!);
  const { isCurrentSong } = useIsCurrentSong(song.encodeId);
  const { mutate: toggleFavoriteSong, isPending } = useToggleFavoriteSong(
    song.encodeId,
    song.isLiked,
  );

  const session = useSelector((state: RootState) => state.auth.session);

  function handleCheckSong() {
    setIsChecked(!isChecked);
  }

  function handleClickImg() {
    if (isCurrentPlayList) {
      const index = songs.findIndex(
        (songReducer) => songReducer.encodeId === song.encodeId,
      );
      dispatch(selectSongInPlayList(index));
    } else {
      dispatch(getPlayList({ id: id!, songIndex: index }));
    }
  }

  if (isCurrentSong)
    return (
      <div className="group/item flex items-center rounded-[4px] border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.05)] p-[10px]">
        <div className="mr-[10px] flex w-full items-center lg:w-1/2">
          <MusicalNoteIcon className="text-text-secondary size-[14px] group-hover/item:hidden" />
          <div
            className={`hidden size-[14px] flex-shrink-0 cursor-pointer rounded-[3px] border-[1px] ${isChecked ? "border-white bg-[rgba(0,0,0,0.15)]" : "border-[rgba(0,0,0,0.2)]"} group-hover/item:block`}
            onClick={handleCheckSong}
          >
            {isChecked && <CheckIcon className="text-white" />}
          </div>

          <div
            className="relative mx-[10px] flex size-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
            onClick={togglePlay}
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
            <div className="mt-[3px]">
              <ArtistsSpan
                artists={song.artists.map((item) => ({
                  alias: item.alias,
                  name: item.name,
                }))}
              />
            </div>
          </div>
        </div>
        <span className="hover:text-text-item-hover hidden flex-1 cursor-pointer text-[1.2rem] text-[rgba(50,50,61,0.5)] hover:underline lg:block">
          {hasAlbum && song.album.title}
        </span>
        <div className="hidden items-center gap-[8px] group-hover/item:flex">
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
          </div>
          <div
            onClick={() => {
              if (isPending) return;
              toggleFavoriteSong();
            }}
            className={clsx(
              "flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]",
              { "pointer-events-none": isPending },
            )}
          >
            {song.isLiked && session ? (
              <HeartIconSolid className="text-text-item-hover size-[16px]" />
            ) : (
              <HeartIcon className="size-[16px]" />
            )}
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
        <span className="hidden text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden lg:block">
          {formatTime(song.duration)}
        </span>
      </div>
    );

  return (
    <div className="group/item flex items-center rounded-[4px] border-b-[1px] border-[rgba(0,0,0,0.05)] p-[10px] hover:bg-[rgba(0,0,0,0.05)]">
      <div className="mr-[10px] flex w-full items-center lg:w-1/2">
        <MusicalNoteIcon className="text-text-secondary size-[14px] flex-shrink-0 group-hover/item:hidden" />
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
          <div className="mt-[3px]">
            <ArtistsSpan
              artists={song.artists.map((item) => ({
                alias: item.alias,
                name: item.name,
              }))}
            />
          </div>
        </div>
      </div>
      <span
        onClick={() => {
          song?.album && navigate(`/album/${song.album.encodeId}`);
        }}
        className="hover:text-text-item-hover hidden flex-1 cursor-pointer text-[1.2rem] text-[rgba(50,50,61,0.5)] hover:underline lg:block"
      >
        {hasAlbum && song.album.title}
      </span>
      <div className="hidden items-center gap-[8px] group-hover/item:flex">
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
        </div>
        <div
          onClick={() => {
            if (isPending) return;
            toggleFavoriteSong();
          }}
          className={clsx(
            "flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]",
            { "pointer-events-none": isPending },
          )}
        >
          {song.isLiked && session ? (
            <HeartIconSolid className="text-text-item-hover size-[16px]" />
          ) : (
            <HeartIcon className="size-[16px]" />
          )}
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
      <span className="hidden text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden lg:block">
        {formatTime(song.duration)}
      </span>
    </div>
  );
};
