import { PlayIcon } from "@heroicons/react/24/solid";
import { TopSongsItemChild } from "../../../api/homeApi";
import React from "react";
import { timestampToFormat } from "../../../utils/helper";
import { RootState, useAppDispatch } from "../../../store";
import {
  getSongReducer,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { useSelector } from "react-redux";
import { currentSongSelector } from "../../../features/player/selectors";
import { AudioAnimation } from "../../../components/AudioAnimation";

interface Props {
  item: TopSongsItemChild;
  index: number;
}

export const TopNewSongCarouselItem: React.FC<Props> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const currentSong = useSelector(currentSongSelector);
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const currentEncodeId = currentSong.encodeId;
  const currentPlay = currentEncodeId === item.encodeId;

  if (currentPlay)
    return (
      <div
        style={{
          boxShadow: "0 2px 10px 0 hsla(0,0%,81.2%,0.4)",
        }}
        className="group/item m-[10px] h-[150px] cursor-pointer rounded-[4px] bg-[hsla(0,0%,100%,0.3)] p-[5px]"
      >
        <div className="flex gap-[10px] p-[10px]">
          <div className="group/img relative flex size-[120px] items-center justify-center overflow-hidden rounded-[4px]">
            <img
              src={item.thumbnailM}
              alt=""
              className="w-full object-cover transition duration-500 group-hover/img:scale-110"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div
              onClick={() => {
                if (isPlaying) {
                  dispatch(togglePlaying(false));
                } else {
                  dispatch(togglePlaying(true));
                }
              }}
              className="absolute flex size-[48px] items-center justify-center rounded-full border-[0.5px] border-white"
            >
              {isPlaying ? (
                <AudioAnimation />
              ) : (
                <PlayIcon className="size-[28px] translate-x-[1px] text-white" />
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-[1.4rem] font-[500]">{item.title}</span>
            <p className="mt-[3px] text-[1.2rem] text-[#696969]">
              {item.artistsNames}
            </p>

            <div className="mt-auto flex items-baseline justify-between">
              <span className="text-number font-robo text-[4rem] font-[900] leading-none text-transparent opacity-40">
                #{index + 1}
              </span>
              <span className="text-[1.4rem] text-[#696969]">
                {timestampToFormat(item.releasedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        boxShadow: "0 2px 10px 0 hsla(0,0%,81.2%,0.4)",
      }}
      className="group/item m-[10px] h-[150px] cursor-pointer rounded-[4px] bg-[hsla(0,0%,100%,0.3)] p-[5px]"
    >
      <div className="flex gap-[10px] p-[10px]">
        <div className="group/img relative flex size-[120px] items-center justify-center overflow-hidden rounded-[4px]">
          <img
            src={item.thumbnailM}
            alt=""
            className="w-full object-cover transition duration-500 group-hover/img:scale-110"
          />
          <div className="absolute inset-0 hidden bg-black/50 group-hover/item:block"></div>
          <div
            onClick={() =>
              dispatch(getSongReducer({ id: item.encodeId, type: "play" }))
            }
            className="absolute hidden size-[48px] items-center justify-center rounded-full border-[0.5px] border-white group-hover/item:flex"
          >
            <PlayIcon className="size-[28px] translate-x-[1px] text-white" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-[1.4rem] font-[500]">{item.title}</span>
          <p className="mt-[3px] text-[1.2rem] text-[#696969]">
            {item.artistsNames}
          </p>

          <div className="mt-auto flex items-baseline justify-between">
            <span className="text-number font-robo text-[4rem] font-[900] leading-none text-transparent opacity-40">
              #{index + 1}
            </span>
            <span className="text-[1.4rem] text-[#696969]">
              {timestampToFormat(item.releasedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
