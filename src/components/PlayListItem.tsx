import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { RootState, useAppDispatch } from "../store";
import { getPlayList } from "../features/player/playerSlice";
import { LoaderSmall } from "./LoaderSmall";
import { useSelector } from "react-redux";
import { AudioAnimation } from "./AudioAnimation";
import { useTogglePlay } from "../hooks/useTogglePlay";
import { useIsCurrentPlayList } from "../hooks/useCurrentPlayList";
import { ArtistsSpan } from "./ArtistsSpan";

type Artist = { alias: string; name: string };

type BaseItem = {
  encodeId: string;
  thumbnailM: string;
  title: string;
};

type Item = BaseItem & {
  sortDescription?: string;
  releaseDate?: number;
  artists: Artist[];
};

interface Props {
  item: Item;
  type?: "desc" | "date" | "artist";
}

export const PlayListItem: React.FC<Props> = ({ item, type = "desc" }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const isLoading =
    useSelector((state: RootState) => state.player.status) === "loading";
  const togglePlay = useTogglePlay();
  const { isCurrentPlayList } = useIsCurrentPlayList(item.encodeId);

  function handleClick() {
    if (isCurrentPlayList) {
      togglePlay();
    } else {
      dispatch(getPlayList({ id: item.encodeId }));
    }
  }

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
              onClick={handleClick}
              className="flex size-[48px] items-center justify-center rounded-full border-[0.5px] border-white"
            >
              {isPlaying ? (
                <AudioAnimation />
              ) : (
                <PlayIcon className="size-[28px] translate-x-[1px]" />
              )}
            </div>

            <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
              <EllipsisHorizontalIcon className="size-[20px]" />
            </div>
          </div>
        </div>
        {type === "desc" && (
          <p className="playlist-item__desc mt-[12px] text-[1.4rem] font-[400] text-text-secondary">
            {item.sortDescription}
          </p>
        )}
        {type === "date" && (
          <>
            <p
              onClick={() => navigate(`/album/${item.encodeId}`)}
              title={item.title}
              className="mb-[4px] mt-[12px] line-clamp-1 cursor-pointer text-[1.4rem] font-[700] text-text-primary hover:text-link-text-hover"
            >
              {item.title}
            </p>
            <p className="text-[1.4rem] font-[400] text-text-secondary">
              {item.releaseDate}
            </p>
          </>
        )}
        {type === "artist" && (
          <>
            <p
              title={item.title}
              onClick={() => navigate(`/album/${item.encodeId}`)}
              className="mb-[4px] mt-[12px] line-clamp-1 cursor-pointer text-[1.4rem] font-[700] text-text-primary hover:text-link-text-hover"
            >
              {item.title}
            </p>
            <div className="flex flex-wrap items-center gap-[4px] truncate">
              <ArtistsSpan
                artists={item.artists.slice(0, 4).map((item) => ({
                  alias: item.alias,
                  name: item.name,
                }))}
                className="cursor-pointer text-[1.2rem] text-text-secondary hover:text-link-text-hover hover:underline"
              />
            </div>
          </>
        )}
      </div>
    );

  return (
    <div className="min-w-0">
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
            onClick={handleClick}
            className="flex size-[48px] items-center justify-center rounded-full border-[0.5px] border-white"
          >
            {isLoading ? (
              <LoaderSmall color="white" />
            ) : (
              <PlayIcon className="size-[28px] translate-x-[1px]" />
            )}
          </div>

          <div className="flex size-[28px] items-center justify-center rounded-full hover:bg-white/30">
            <EllipsisHorizontalIcon className="size-[20px]" />
          </div>
        </div>
      </div>
      {type === "desc" && (
        <p className="playlist-item__desc mt-[12px] text-[1.4rem] font-[400] text-text-secondary">
          {item.sortDescription}
        </p>
      )}
      {type === "date" && (
        <>
          <p
            title={item.title}
            onClick={() => navigate(`/album/${item.encodeId}`)}
            className="mb-[4px] mt-[12px] line-clamp-1 cursor-pointer text-[1.4rem] font-[700] text-text-primary hover:text-link-text-hover"
          >
            {item.title}
          </p>
          <p className="text-[1.4rem] font-[400] text-text-secondary">
            {item.releaseDate}
          </p>
        </>
      )}
      {type === "artist" && (
        <>
          <p
            title={item.title}
            onClick={() => navigate(`/album/${item.encodeId}`)}
            className="mb-[4px] mt-[12px] cursor-pointer truncate text-[1.4rem] font-[700] text-text-primary hover:text-link-text-hover"
          >
            {item.title}
          </p>
          <div className="truncate">
            <ArtistsSpan
              artists={item.artists.slice(0, 4).map((item) => ({
                alias: item.alias,
                name: item.name,
              }))}
              className="cursor-pointer text-[1.2rem] text-text-secondary hover:text-link-text-hover hover:underline"
            />
          </div>
        </>
      )}
    </div>
  );
};
