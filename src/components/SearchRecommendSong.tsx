import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { PopOvers } from "./PopOvers";
import { SongItemPop } from "../pages/Album/components/SongItemPop";
import { Song } from "../api/playlistApi";
import { ArtistsSpan } from "./ArtistsSpan";
import { useIsCurrentSong } from "../hooks/useIsCurrentSong";
import { RootState, useAppDispatch } from "../store";
import { getSongReducer } from "../features/player/playerSlice";
import { useSelector } from "react-redux";
import { AudioAnimation } from "./AudioAnimation";
import { useTogglePlay } from "../hooks/useTogglePlay";

interface Props {
  data: Song | undefined;
}

export const SearchRecommendSong: React.FC<Props> = ({ data }) => {
  const { isCurrentSong } = useIsCurrentSong(data?.encodeId ?? "");
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const dispatch = useAppDispatch();
  const togglePlay = useTogglePlay();

  if (!data) return null;

  if (isCurrentSong)
    return (
      <div className="group/recommend flex cursor-pointer items-center gap-[10px] rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-black/5">
        <div
          className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]"
          onClick={togglePlay}
        >
          <img
            src={data.thumbnailM}
            alt=""
            className="size-[52px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
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
          <span className="text-[1.4rem] font-[500]">{data.title}</span>
          <div className="flex items-center gap-[2px]">
            <ArtistsSpan artists={data.artists} />
          </div>
        </div>
        <div className="invisible ml-auto flex gap-[8px] group-hover/recommend:visible">
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <HeartIcon className="size-[16px]" />
          </div>
          <PopOvers.PopOver>
            <>
              <PopOvers.Button open={`search-${data.encodeId}`}>
                <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                  <EllipsisHorizontalIcon className="size-[16px]" />
                </div>
              </PopOvers.Button>
              <PopOvers.Content name={`search-${data.encodeId}`}>
                <SongItemPop encodeId={data.encodeId} />
              </PopOvers.Content>
            </>
          </PopOvers.PopOver>
        </div>
      </div>
    );

  return (
    <div className="group/recommend flex cursor-pointer items-center gap-[10px] rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-black/5">
      <div
        className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]"
        onClick={() =>
          dispatch(getSongReducer({ id: data.encodeId, type: "play" }))
        }
      >
        <img
          src={data.thumbnailM}
          alt=""
          className="size-[52px] object-cover"
        />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/recommend:block"></div>
        <FontAwesomeIcon
          icon={faPlay}
          className="absolute hidden text-[1.6rem] text-white group-hover/recommend:block"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[1.4rem] font-[500]">{data.title}</span>
        <div className="flex items-center gap-[2px]">
          <ArtistsSpan artists={data.artists} />
        </div>
      </div>
      <div className="invisible ml-auto flex gap-[8px] group-hover/recommend:visible">
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <HeartIcon className="size-[16px]" />
        </div>
        <PopOvers.PopOver>
          <>
            <PopOvers.Button open={`search-${data.encodeId}`}>
              <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                <EllipsisHorizontalIcon className="size-[16px]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name={`search-${data.encodeId}`}>
              <SongItemPop encodeId={data.encodeId} />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
      </div>
    </div>
  );
};
