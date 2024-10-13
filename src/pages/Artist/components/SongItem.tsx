import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPlay } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../../utils/helper";
import { SectionItem } from "../../../api/artistApi";
import { useSelector } from "react-redux";
import { currentSongSelector } from "../../../features/player/selectors";
import { RootState, useAppDispatch } from "../../../store";
import { AudioAnimation } from "../../../components/AudioAnimation";
import {
  getSongReducer,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { PopOvers } from "../../../components/PopOvers";
import { SongItemPop } from "../../Album/components/SongItemPop";
import { PremiumIcon } from "../../../components/PremiumIcon";

interface Props {
  item: SectionItem;
}

export const SongItem: React.FC<Props> = ({ item }) => {
  const currentSong = useSelector(currentSongSelector);
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const currentPlay = currentSong.encodeId === item.encodeId;
  const dispatch = useAppDispatch();

  let title = item.title;
  let artistsNames = item.artistsNames;
  if (title.length > 20) {
    title = item.title.slice(0, 20) + "...";
  }
  if (artistsNames.length > 20) {
    artistsNames = item.artistsNames.slice(0, 20) + "...";
  }

  if (currentPlay)
    return (
      <div className="group/item flex h-[61.35px] items-center rounded-[5px] border-b-[1px] border-b-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.05)] p-[10px]">
        <div
          onClick={() => {
            if (isPlaying) {
              dispatch(togglePlaying(false));
            } else {
              dispatch(togglePlaying(true));
            }
          }}
          className="relative flex size-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
        >
          <img src={item.thumbnailM} alt="" className="w-full object-cover" />
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
        <div className="ml-[10px] flex flex-col">
          <span className="flex cursor-pointer items-center gap-[6px] text-[1.4rem] font-[500] hover:text-[#844d4d]">
            {title} {item.streamingStatus === 2 && <PremiumIcon />}
          </span>
          <span className="mt-[4px] cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d] hover:underline">
            {artistsNames}
          </span>
        </div>
        <div className="ml-auto hidden items-center gap-[8px] group-hover/item:flex">
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
          </div>
          <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
            <HeartIcon className="size-[16px]" />
          </div>
          <PopOvers.PopOver>
            <>
              <PopOvers.Button open={`artist-${item.encodeId}`}>
                <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                  <EllipsisHorizontalIcon className="size-[16px]" />
                </div>
              </PopOvers.Button>
              <PopOvers.Content name={`artist-${item.encodeId}`}>
                <SongItemPop encodeId={item.encodeId} />
              </PopOvers.Content>
            </>
          </PopOvers.PopOver>
        </div>
        <span className="ml-auto text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden">
          {formatTime(item.duration)}
        </span>
      </div>
    );

  return (
    <div className="group/item flex h-[61.35px] items-center rounded-[5px] border-b-[1px] border-b-[rgba(0,0,0,0.05)] p-[10px] hover:bg-[rgba(0,0,0,0.05)]">
      <div
        onClick={() =>
          dispatch(getSongReducer({ id: item.encodeId, type: "play" }))
        }
        className="relative flex size-[40px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
      >
        <img src={item.thumbnailM} alt="" className="w-full object-cover" />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/item:block"></div>
        <FontAwesomeIcon
          icon={faPlay}
          className="absolute hidden text-[1.6rem] text-white group-hover/item:block"
        />
      </div>
      <div className="ml-[10px] flex flex-col">
        <span className="flex cursor-pointer items-center gap-[6px] text-[1.4rem] font-[500] hover:text-[#844d4d]">
          {title} {item.streamingStatus === 2 && <PremiumIcon />}
        </span>
        <span className="mt-[4px] cursor-pointer text-[1.2rem] text-[#696969] hover:text-[#844d4d] hover:underline">
          {artistsNames}
        </span>
      </div>
      <div className="ml-auto hidden items-center gap-[8px] group-hover/item:flex">
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <FontAwesomeIcon icon={faMicrophone} className="text-[1.4rem]" />
        </div>
        <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
          <HeartIcon className="size-[16px]" />
        </div>
        <PopOvers.PopOver>
          <>
            <PopOvers.Button open={`artist-${item.encodeId}`}>
              <div className="flex size-[36px] cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)]">
                <EllipsisHorizontalIcon className="size-[16px]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name={`artist-${item.encodeId}`}>
              <SongItemPop encodeId={item.encodeId} />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
      </div>
      <span className="ml-auto text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden">
        {formatTime(item.duration)}
      </span>
    </div>
  );
};
