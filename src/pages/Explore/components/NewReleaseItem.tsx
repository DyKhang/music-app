import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSongReducer } from "../../../features/player/playerSlice";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { NewReleasePop } from "./NewReleasePop";
import { NewReleasesItemChild, StreamingStatus } from "../../../api/homeApi";
import { PremiumIcon } from "../../../components/PremiumIcon";
import { currentSongSelector } from "../../../features/player/selectors";
import { useTogglePlay } from "../../../hooks/useTogglePlay";
import { ArtistsSpan } from "../../../components/ArtistsSpan";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/DropDown";
import clsx from "clsx";

interface Props {
  data: NewReleasesItemChild;
}

export const NewReleaseItem: React.FC<Props> = ({ data }) => {
  const { title, encodeId, releaseDate, thumbnailM, streamingStatus, artists } =
    data;
  const currentSong = useSelector(currentSongSelector);
  const currentEncodeId = currentSong.encodeId;
  const currentPlay = currentEncodeId === encodeId;
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const dispatch = useAppDispatch();
  const togglePlay = useTogglePlay();

  const oldDay = new Date(releaseDate * 1000);
  const nowDay = new Date();

  const numDays: number = Math.floor(
    (nowDay.getTime() - oldDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  function handleClickImg() {
    if (!currentPlay) {
      dispatch(getSongReducer({ id: encodeId, type: "play" }));
    } else {
      togglePlay();
    }
  }

  return (
    <div
      className={clsx(
        "group relative flex items-center gap-[10px] rounded-[5px] p-[10px] hover:bg-[rgba(0,0,0,0.05)]",
        {
          "bg-[rgba(0,0,0,0.05)]": currentPlay,
        },
      )}
    >
      <div
        className="relative flex size-[60px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg"
        onClick={handleClickImg}
      >
        <img src={thumbnailM} alt="" className="w-full object-cover" />
        <div
          className={clsx(
            "absolute inset-0 bg-[rgba(0,0,0,0.5)] group-hover:block",
            currentPlay ? "block" : "hidden",
          )}
        />
        {currentPlay && isPlaying ? (
          <AudioAnimation />
        ) : currentPlay ? (
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-[3px]">
        <div className="flex w-full items-center gap-[4px] hover:text-text-item-hover">
          <span
            className="cursor-pointer truncate text-[1.4rem] font-[500] hover:text-link-text-hover"
            title={title}
          >
            {title}
          </span>

          {streamingStatus === StreamingStatus.premium && <PremiumIcon />}
        </div>

        <div className="flex flex-wrap items-center gap-[4px]">
          <ArtistsSpan
            artists={artists.slice(0, 3).map((a) => ({
              alias: a.alias,
              name: a.name,
            }))}
            className="cursor-pointer text-[1.2rem] text-text-secondary hover:text-link-text-hover hover:underline"
          />
        </div>

        <span className="text-[1.2rem] text-text-secondary">
          {numDays > 1 ? `${numDays} ngày trước` : "Hôm qua"}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <div className="hidden size-[40px] cursor-pointer items-center justify-center rounded-full hover:bg-alpha-bg group-hover:flex">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <NewReleasePop encodeId={data.encodeId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
