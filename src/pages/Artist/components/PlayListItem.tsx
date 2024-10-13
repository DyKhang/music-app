import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { SectionItem } from "../../../api/artistApi";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import {
  getPlayList,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { LoaderSmall } from "../../../components/LoaderSmall";

interface Props {
  item: SectionItem;
  hasArtistName: boolean;
}

export const PlayListItem: React.FC<Props> = ({ item, hasArtistName }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPlaylistId = useSelector(
    (state: RootState) => state.playList.id,
  );
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const isCurrentPlayList = item.encodeId === currentPlaylistId;

  const isLoading =
    useSelector((state: RootState) => state.status) === "loading";

  if (isCurrentPlayList)
    return (
      <div>
        <div className="group/tag relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[5px]">
          <img
            src={item.thumbnailM}
            alt=""
            className="w-full transition duration-[600ms] group-hover/tag:scale-110"
          />
          <div
            className="absolute inset-0 bg-black/50 transition duration-300"
            onClick={() => navigate(`/album/${item.encodeId}`)}
          ></div>
          <div className="absolute flex items-center gap-8 text-white">
            <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
              <HeartIcon className="size-[20px]" />
            </div>

            <div
              className="flex size-[48px] items-center justify-center rounded-full border-[0.5px] border-white"
              onClick={() => {
                if (isPlaying) {
                  dispatch(togglePlaying(false));
                } else {
                  dispatch(togglePlaying(true));
                }
              }}
            >
              {isPlaying ? (
                <AudioAnimation />
              ) : (
                <PlayIcon className="size-[28px]" />
              )}
            </div>

            <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
              <EllipsisHorizontalIcon className="size-[20px]" />
            </div>
          </div>
        </div>
        <p className="oneline-letters mb-[4px] mt-[12px] text-[1.4rem] font-[700] text-[#32323d]">
          {item.title}
        </p>
        {hasArtistName ? (
          <p className="text-[1.4rem] font-[400] text-[#696969]">
            {item.artistsNames}
          </p>
        ) : (
          <p className="text-[1.4rem] font-[400] text-[#696969]">
            {item.releaseDate}
          </p>
        )}
      </div>
    );

  return (
    <div>
      <div className="group/tag relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[5px]">
        <img
          src={item.thumbnailM}
          alt=""
          className="w-full transition duration-[600ms] group-hover/tag:scale-110"
        />
        <div
          className="absolute inset-0 bg-black/50 opacity-0 transition duration-300 group-hover/tag:opacity-100"
          onClick={() => navigate(`/album/${item.encodeId}`)}
        ></div>
        <div className="absolute hidden items-center gap-8 text-white group-hover/tag:flex">
          <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
            <HeartIcon className="size-[20px]" />
          </div>

          <div
            className="flex size-[48px] items-center justify-center rounded-full border-[0.5px] border-white"
            onClick={() => {
              dispatch(getPlayList({ id: item.encodeId }));
            }}
          >
            {isLoading ? (
              <LoaderSmall color="white" />
            ) : (
              <PlayIcon className="size-[28px]" />
            )}
          </div>

          <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
            <EllipsisHorizontalIcon className="size-[20px]" />
          </div>
        </div>
      </div>
      <p className="oneline-letters mb-[4px] mt-[12px] text-[1.4rem] font-[700] text-[#32323d]">
        {item.title}
      </p>
      {hasArtistName ? (
        <p className="text-[1.4rem] font-[400] text-[#696969]">
          {item.artistsNames}
        </p>
      ) : (
        <p className="text-[1.4rem] font-[400] text-[#696969]">
          {item.releaseDate}
        </p>
      )}
    </div>
  );
};
