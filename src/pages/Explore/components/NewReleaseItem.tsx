import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCurrentSong,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { PopOvers } from "../../../components/PopOvers";
import { NewReleasePop } from "./NewReleasePop";
import { NewReleasesItemChild } from "../../../api/homeApi";
import { PremiumIcon } from "../../../components/PremiumIcon";

interface Props {
  data: NewReleasesItemChild;
}

export const NewReleaseItem: React.FC<Props> = ({ data }) => {
  const { title, artists, encodeId, releaseDate, thumbnailM, streamingStatus } =
    data;
  const currentEncodeId = useSelector(
    (state: RootState) => state.player.currentSong.encodeId,
  );
  const currentPlay = currentEncodeId === encodeId;
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  const dispatch = useAppDispatch();
  let artistsStrings = "";
  let newTile = title;

  artists.forEach((artist) => (artistsStrings += `${artist.name}, `));

  if (title.length >= 20) {
    newTile = newTile.slice(0, 20) + "...";
  }

  if (artistsStrings.length >= 20) {
    artistsStrings = artistsStrings.slice(0, 20) + "...";
  }

  const oldDay = new Date(releaseDate * 1000);
  const nowDay = new Date();

  const numDays: number = Math.floor(
    (nowDay.getTime() - oldDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  function handleClickImg() {
    if (!currentPlay) {
      dispatch(getCurrentSong(encodeId));
    } else {
      if (isPlaying) {
        dispatch(togglePlaying(false));
      } else {
        dispatch(togglePlaying(true));
      }
    }
  }

  return (
    <div
      className={`group/tag relative flex gap-[10px] rounded-[5px] p-[10px] hover:bg-[rgba(0,0,0,0.05)] ${currentPlay && "bg-[rgba(0,0,0,0.05)]"}`}
    >
      <div
        className="relative flex size-[60px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg"
        onClick={handleClickImg}
      >
        <img src={thumbnailM} alt="" className="w-full object-cover" />
        <div
          className={`absolute inset-0 bg-[rgba(0,0,0,0.5)] group-hover/tag:block ${currentPlay ? "block" : "hidden"}`}
        ></div>
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
            className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block`}
          />
        )}
      </div>
      <div className="flex flex-col gap-[3px]">
        <span className="flex cursor-pointer items-center gap-[8px] text-[1.4rem] font-[500] hover:text-[#844d4d]">
          {newTile} {streamingStatus === 2 && <PremiumIcon />}
        </span>
        <span className="cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d] hover:underline">
          {artistsStrings}
        </span>
        <span className="text-[1.2rem] text-[#696969]">
          {numDays > 1 ? `${numDays} ngày trước` : "Hôm qua"}
        </span>
      </div>
      <PopOvers.PopOver>
        <>
          <PopOvers.Button open={encodeId}>
            <div className="invisible absolute right-8 top-1/2 flex size-[40px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] group-hover/tag:visible">
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </PopOvers.Button>
          <PopOvers.Content name={encodeId}>
            <NewReleasePop encodeId={data.encodeId} />
          </PopOvers.Content>
        </>
      </PopOvers.PopOver>
    </div>
  );
};