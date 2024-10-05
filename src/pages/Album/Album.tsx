import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router";
import { SongItem } from "./components/SongItem";
import { ArtistList } from "./components/ArtistList";
import { useDetailPlayList } from "../../features/playlist/useDetailPlaylist";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AudioAnimation } from "../../components/AudioAnimation";
import { togglePlaying } from "../../features/player/playerSlice";
import { Filter } from "./components/Filter";
import { useSearchParams } from "react-router-dom";

export const Album = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useDetailPlayList(id);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const [searchParams] = useSearchParams();

  if (isLoading) return null;
  const filterState = searchParams.get("filter") || "all";
  let songsFiltered = data?.song.items;

  if (filterState === "all") {
    songsFiltered = data?.song.items;
  } else if (filterState === "song") {
    songsFiltered = data?.song.items.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  } else if (filterState === "artist") {
    songsFiltered = data?.song.items.sort((a, b) =>
      a.artistsNames.localeCompare(b.artistsNames),
    );
  } else if (filterState === "album") {
    songsFiltered = data?.song.items.sort((a, b) =>
      a.album?.title.localeCompare(b.album?.title),
    );
  }

  function handleTogglePlay() {
    if (isPlaying) {
      dispatch(togglePlaying(false));
    } else {
      dispatch(togglePlaying(true));
    }
  }

  return (
    <>
      <section
        className={`${data && data.song.items.length < 5 && "h-screen"}`}
      >
        <div className="sticky top-[40px] float-left w-[300px]">
          <div
            className="album-img-shadow group/list relative cursor-pointer overflow-hidden rounded-[8px]"
            onClick={handleTogglePlay}
          >
            <img
              src={data?.thumbnailM}
              alt=""
              className="w-full object-cover transition-all duration-700 group-hover/list:scale-110"
            />
            {!isPlaying && (
              <div className="absolute inset-0 hidden bg-black/50 group-hover/list:block"></div>
            )}
            <div
              className={`absolute left-1/2 top-1/2 size-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.5px] border-white text-white ${isPlaying ? "flex" : "hidden group-hover/list:flex"}`}
            >
              {isPlaying ? (
                <AudioAnimation />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  className="translate-x-[1.5px] text-[2.4rem]"
                />
              )}
            </div>
          </div>
          <div className="mt-[12px]">
            <div className="flex flex-col items-center">
              <h1 className="text-center text-[2rem] font-[700]">
                {data?.title}
              </h1>
              <div className="flex flex-col items-center text-[1.2rem] leading-[1.75] text-[#696969]">
                <span>Cập nhật: 20/06/2024</span>
                <span className="text-center">{data?.artistsNames}</span>
                <span>{data?.like} người yêu thích</span>
              </div>
              <div
                onClick={handleTogglePlay}
                className="mt-[16px] flex h-[36px] cursor-pointer items-center rounded-full bg-[#644646] px-[24px] text-[1.4rem] uppercase text-white hover:brightness-[0.9]"
              >
                {isPlaying ? (
                  <PauseIcon className="mr-[5px] size-[24px]" />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="mr-[5px] text-[1.6rem]"
                  />
                )}
                <span>{isPlaying ? "Tạm dừng" : "Tiếp tục phát"}</span>
              </div>
              <div className="mt-[16px] flex gap-[10px]">
                <div className="flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
                  <HeartIcon className="size-[18px]" />
                </div>
                <div className="flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
                  <EllipsisHorizontalIcon className="size-[18px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[330px] pt-[40px]">
          {data?.sortDescription && (
            <p>
              <span className="text-[1.4rem] text-[#696969]">Lời tựa</span>
              <span className="ml-[4px] text-[1.4rem]">
                {data?.sortDescription}
              </span>
            </p>
          )}

          <div className={`${data?.sortDescription && "mt-[10px]"}`}>
            <div className="z-10 flex items-center border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[#e5e3df] p-[10px] text-[1.2rem] font-[500] uppercase text-[#696969]">
              <div className="mr-[10px] w-1/2">
                <div className="flex items-center gap-[10px]">
                  <Filter />
                  <span>bài hát</span>
                </div>
              </div>

              <span className="flex-1">album</span>

              <span>thời gian</span>
            </div>
            {songsFiltered?.map((song) => (
              <SongItem key={song.encodeId} song={song} />
            ))}
            <div className="mt-[16px] flex items-center gap-[8px] text-[1.3rem] text-[#696969]">
              <span>{data?.song.items.length} bài hát</span> <div>•</div>
              <span>7 giờ 39 phút</span>
            </div>
          </div>
        </div>
      </section>

      <h2 className="mb-[20px] mt-[48px] text-[2rem] font-[700]">
        Nghệ Sĩ Tham Gia
      </h2>

      <ArtistList />
    </>
  );
};
