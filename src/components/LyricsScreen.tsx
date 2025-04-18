import { useSelector } from "react-redux";
import { currentSongSelector } from "../features/player/selectors";
import { AxiosResponse } from "axios";
import { LyricApi } from "../api/lyricApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "react-loader-spinner";
import { RootState } from "../store";

interface Props {
  data: AxiosResponse<LyricApi, unknown> | undefined;
}

export const LyricsScreen: React.FC<Props> = ({ data }) => {
  const [lyric, setLyric] = useState("");
  const currentSong = useSelector(currentSongSelector);
  const currentTime = useSelector(
    (state: RootState) => state.player.currentTime,
  );
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  const activeLyricRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    activeLyricRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentTime]);

  const convertTimestampToSeconds = useCallback((lyric: string) => {
    const matches = lyric.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);

    if (!matches) return;

    const minutes = parseInt(matches[1]);
    const seconds = parseInt(matches[2]);
    const milliseconds = parseInt(matches[3]);

    const totalSeconds = minutes * 60 + seconds + milliseconds / 100;

    return totalSeconds;
  }, []);

  const lyricFormat = lyric.split("\n").map((item) => ({
    timeStamp: convertTimestampToSeconds(item),
    lyric: item.replace(/\[.*?\]\s*/g, ""),
  }));
  useEffect(() => {
    if (data) {
      const fetchLyric = async () => {
        try {
          const res = await fetch(data.data.data.file);
          if (!res.ok) {
            throw new Error("Error fetching data");
          }
          const result = await res.text();
          setLyric(result);
        } catch {
          throw new Error("Error fetching data");
        }
      };

      fetchLyric();
    }
  }, [data]);

  return (
    <div
      style={{
        height: "calc(100vh - 76px - 90px)",
      }}
      className="relative flex gap-[78px] px-[60px]"
    >
      <div className="relative hidden w-[36%] overflow-hidden rounded-[4px] lg:block">
        <img src={currentSong.image} alt="" className="w-full object-cover" />
        {isPlaying && (
          <Audio
            height="32"
            width="32"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperClass="absolute left-[10px] bottom-[30px] text-white group-hover/tag:block"
            visible={true}
          />
        )}
      </div>
      <div className="relative flex-1 overflow-y-scroll">
        {lyricFormat[0].lyric.includes("doctype html") ? (
          <p className="absolute top-1/2 -translate-y-1/2 py-[20px] text-[2.2rem] font-[700] text-white sm:text-[3.2rem] md:text-[4.2rem]">
            Lời bài hát đang được cập nhật
          </p>
        ) : (
          lyricFormat.map((item, index) => {
            let isCurrentTimeBetweenTwoTimestamps = false;
            if (lyricFormat[index + 1]) {
              if (
                currentTime >= item.timeStamp! &&
                currentTime <= lyricFormat[index + 1].timeStamp!
              ) {
                isCurrentTimeBetweenTwoTimestamps = true;
              }
            } else {
              if (currentTime >= item.timeStamp!) {
                isCurrentTimeBetweenTwoTimestamps = true;
              }
            }

            return isCurrentTimeBetweenTwoTimestamps ? (
              <p
                ref={activeLyricRef}
                className="py-[20px] text-[2.2rem] font-[700] text-yellow-400 sm:text-[3.2rem] md:text-[4.2rem]"
                key={index}
              >
                {item.lyric}
              </p>
            ) : (
              <p
                className={`py-[20px] text-[2.2rem] font-[700] text-white sm:text-[3.2rem] md:text-[4.2rem] ${item.timeStamp! < currentTime && "opacity-40"}`}
                key={index}
              >
                {item.lyric}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};
