import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getInfoSong, getSong } from "../../../features/player/playerSlice";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { AudioAnimation } from "../../../components/AudioAnimation";

interface Props {
  img: string;
  title: string;
  artists: {
    id: string;
    name: string;
    link: string;
    spotlight: boolean;
    alias: string;
    thumbnail: string;
    thumbnailM: string;
    isOA: boolean;
    isOABrand: boolean;
    playlistId: string;
  }[];
  releaseDate: number;
  encodeId: string;
}

export const NewReleaseItem: React.FC<Props> = ({
  img,
  title,
  artists,
  releaseDate,
  encodeId,
}) => {
  const currentEncodeId = useSelector(
    (state: RootState) => state.player.currentSong.encodeId,
  );
  const currentPlay = currentEncodeId === encodeId;

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

  return (
    <div
      className={`group/tag relative flex gap-[10px] rounded-[5px] p-[10px] hover:bg-[rgba(0,0,0,0.05)] ${currentPlay && "bg-[rgba(0,0,0,0.05)]"}`}
    >
      <div
        className="relative flex size-[60px] flex-shrink-0 cursor-pointer items-center justify-center"
        onClick={() => {
          dispatch(getSong(encodeId));
          dispatch(getInfoSong(encodeId));
        }}
      >
        <img src={img} alt="" className="w-full rounded-lg object-cover" />
        {currentPlay ? (
          <AudioAnimation />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block"
          />
        )}
      </div>
      <div className="flex flex-col gap-[3px]">
        <span className="cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d]">
          {newTile}
        </span>
        <span className="cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d]">
          {artistsStrings}
        </span>
        <span className="text-[1.2rem] text-[#696969]">
          {numDays > 1 ? `${numDays} ngày trước` : "Hôm qua"}
        </span>
      </div>
      <div className="invisible absolute right-8 top-1/2 flex size-[40px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] group-hover/tag:visible">
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
    </div>
  );
};
