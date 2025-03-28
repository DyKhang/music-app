import { createPortal } from "react-dom";
import { ChevronDownIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { LyricsScreen } from "./LyricsScreen";
import { useSelector } from "react-redux";
import { currentSongSelector } from "../features/player/selectors";
import { useLyric } from "../features/lyric/useLyric";

interface Props {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type tagType = "playlist" | "karaoke" | "lyrics";

export const KaraokeScreen: React.FC<Props> = ({ isShow, setIsShow }) => {
  const currentSong = useSelector(currentSongSelector);
  const { data } = useLyric(currentSong.encodeId);
  const [tag, setTag] = useState<tagType>("lyrics");

  const tagContents: { label: string; tag: tagType }[] = [
    {
      label: "Danh sách phát",
      tag: "playlist",
    },
    {
      label: "Karaoke",
      tag: "karaoke",
    },
    {
      label: "Lời bài hát",
      tag: "lyrics",
    },
  ];

  return createPortal(
    <div
      className={`fixed inset-0 z-[50] transition-all duration-500 ${!isShow && "translate-y-[100%]"}`}
    >
      <div className="absolute inset-0 bg-black"></div>
      <div
        style={{ backgroundImage: `url(${currentSong.image})` }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[50px]"></div>
      <div className="relative flex items-center justify-center p-[20px]">
        <div className="hidden rounded-full bg-[hsla(0,0%,100%,.1)] p-[3px] font-[700] text-[hsla(0,0%,100%,.5)] lg:flex">
          {tagContents.map((item) => (
            <div
              key={item.tag}
              onClick={() => setTag(item.tag)}
              className={`flex h-[30px] cursor-pointer items-center justify-center rounded-full px-[50px] py-[7px] ${tag === item.tag && "bg-[hsla(0,0%,100%,.1)] text-white"}`}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="absolute right-[20px] top-[20px] ml-auto flex gap-[15px] text-white">
          <div className="hidden size-[44px] cursor-pointer items-center justify-center rounded-full bg-[hsla(0,0%,100%,0.1)] hover:brightness-[0.9] lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.293 4H9.848V3H13v3.152h-1V4.707L9.354 7.354l-.708-.708zM4 11.293l2.646-2.647l.708.708L4.707 12h1.445v1H3V9.848h1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="hidden size-[44px] cursor-pointer items-center justify-center rounded-full bg-[hsla(0,0%,100%,0.1)] hover:brightness-[0.9] lg:flex">
            <Cog8ToothIcon className="size-[24px]" />
          </div>

          <div
            onClick={() => setIsShow(false)}
            className="flex size-[44px] cursor-pointer items-center justify-center rounded-full bg-[hsla(0,0%,100%,0.1)] hover:brightness-[0.9]"
          >
            <ChevronDownIcon className="size-[24px]" />
          </div>
        </div>
      </div>

      {tag === "lyrics" && <LyricsScreen data={data} />}
    </div>,
    document.body,
  );
};
