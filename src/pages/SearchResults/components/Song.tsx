import { EllipsisHorizontalIcon, PlayIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { PopOvers } from "../../../components/PopOvers";
import { ArtistsSpan } from "../../../components/ArtistsSpan";
import { useIsCurrentSong } from "../../../hooks/useCurrentSong";
import { RootState, useAppDispatch } from "../../../store";
import { getSongReducer } from "../../../features/player/playerSlice";
import { useSelector } from "react-redux";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { useTogglePlay } from "../../../hooks/useTogglePlay";
import { useToggleFavoriteSong } from "../../../features/user/useToggleFavoriteSong";
import { SongItemPop } from "../../Album/components/SongItemPop";

interface Props {
  item: {
    title: string;
    artists: {
      alias: string;
      name: string;
    }[];
    thumbnailM: string;
    encodeId: string;
    isLiked: boolean;
  };
}

export const Song: React.FC<Props> = ({ item }) => {
  const { isCurrentSong } = useIsCurrentSong(item?.encodeId ?? "");
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const togglePlay = useTogglePlay();
  const dispatch = useAppDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const { mutate: toggleFavoriteSong } = useToggleFavoriteSong(
    item.encodeId,
    item?.isLiked,
  );

  if (isCurrentSong)
    return (
      <div className="group/artist flex cursor-pointer items-center gap-[16px] rounded-[5px] bg-[rgba(254,255,255,0.3)] p-[10px]">
        <div
          onClick={togglePlay}
          className="group/img relative flex size-[84px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]"
        >
          <img
            src={item.thumbnailM}
            alt=""
            className="w-full object-cover transition-all duration-500 group-hover/img:scale-110"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          {isPlaying ? (
            <AudioAnimation />
          ) : (
            <PlayIcon className="absolute size-[24px] text-white" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-text-secondary mb-[6px] text-[1.2rem]">
            Bài hát
          </span>
          <span className="text-[1.4rem] font-[600]">{item.title}</span>
          <div className="flex items-center gap-[2px]">
            <ArtistsSpan artists={item.artists} />
          </div>
        </div>
        <div className="ml-auto hidden group-hover/artist:flex">
          <div
            onClick={() => toggleFavoriteSong()}
            className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]"
          >
            {item.isLiked && session ? (
              <HeartIconSolid className="text-text-item-hover size-[16px]" />
            ) : (
              <HeartIcon className="size-[16px]" />
            )}
          </div>
          <PopOvers.PopOver>
            <>
              <PopOvers.Button open={`new-release-${item.encodeId}`}>
                <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                  <EllipsisHorizontalIcon className="size-[16px]" />
                </div>
              </PopOvers.Button>
              <PopOvers.Content name={`new-release-${item.encodeId}`}>
                <SongItemPop encodeId={`${item.encodeId}`} />
              </PopOvers.Content>
            </>
          </PopOvers.PopOver>
        </div>
      </div>
    );

  return (
    <div className="group/artist flex cursor-pointer items-center gap-[16px] rounded-[5px] bg-[rgba(254,255,255,0.3)] p-[10px]">
      <div
        onClick={() =>
          dispatch(getSongReducer({ id: item.encodeId, type: "play" }))
        }
        className="group/img relative flex size-[84px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]"
      >
        <img
          src={item.thumbnailM}
          alt=""
          className="w-full object-cover transition-all duration-500 group-hover/img:scale-110"
        />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/artist:block"></div>
        <PlayIcon className="absolute hidden size-[24px] text-white group-hover/artist:block" />
      </div>
      <div className="flex flex-col">
        <span className="text-text-secondary mb-[6px] text-[1.2rem]">
          Bài hát
        </span>
        <span className="text-[1.4rem] font-[600]">{item.title}</span>
        <div className="flex items-center gap-[2px]">
          <ArtistsSpan artists={item.artists} />
        </div>
      </div>
      <div className="ml-auto hidden group-hover/artist:flex">
        <div
          onClick={() => toggleFavoriteSong()}
          className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]"
        >
          {item.isLiked && session ? (
            <HeartIconSolid className="text-text-item-hover size-[16px]" />
          ) : (
            <HeartIcon className="size-[16px]" />
          )}
        </div>
        <PopOvers.PopOver>
          <>
            <PopOvers.Button open={`new-release-${item.encodeId}`}>
              <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                <EllipsisHorizontalIcon className="size-[16px]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name={`new-release-${item.encodeId}`}>
              <SongItemPop encodeId={`${item.encodeId}`} />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
      </div>
    </div>
  );
};
