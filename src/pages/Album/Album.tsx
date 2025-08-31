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
import { getPlayList } from "../../features/player/playerSlice";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import toast from "react-hot-toast";
import { convertTotalFollow } from "../../utils/helper";
import { useTogglePlay } from "../../hooks/useTogglePlay";
import { useIsCurrentPlayList } from "../../hooks/useCurrentPlayList";
import { ResultNotFound } from "../../components/ResultNotFound";

export const Album = () => {
  const { id } = useParams();
  const currentPlaylistId = useSelector(
    (state: RootState) => state.player.playList.id,
  );
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useDetailPlayList(id);
  const [searchParams] = useSearchParams();
  const isCurrentPlaylist = id === currentPlaylistId;
  const togglePlay = useTogglePlay();
  const { isCurrentPlayList } = useIsCurrentPlayList(id!);

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

  if (isLoading) return <Loader />;

  function handleTogglePlay() {
    if (!hasSongs) {
      toast("Danh sách này không có bài hát nào", {
        icon: "🤕",
        position: "bottom-left",
        style: {
          padding: "12px",
        },
      });
    } else {
      if (isCurrentPlaylist) {
        togglePlay();
      } else {
        dispatch(getPlayList({ id: id! }));
      }
    }
  }

  const hasSongs = data?.song.items || false;

  return (
    <section className="pt-[110px]">
      <section
        className={`${hasSongs && data!.song.items.length < 10 ? "h-screen" : ""}`}
      >
        <div className="sticky top-[110px] float-left hidden w-[300px] lg:block">
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
              className={`absolute left-1/2 top-1/2 size-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.5px] border-white text-white ${isPlaying && isCurrentPlaylist ? "flex" : "hidden group-hover/list:flex"}`}
            >
              {isPlaying && isCurrentPlayList ? (
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
                <span>
                  {`${data?.like && convertTotalFollow(data.like)} người yêu thích`}
                </span>
              </div>
              <div
                onClick={handleTogglePlay}
                className="mt-[16px] flex h-[36px] cursor-pointer items-center rounded-full bg-[#644646] px-[24px] text-[1.4rem] uppercase text-white hover:brightness-[0.9]"
              >
                {isCurrentPlaylist ? (
                  isPlaying ? (
                    <PauseIcon className="mr-[5px] size-[24px]" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="mr-[5px] text-[1.6rem]"
                    />
                  )
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="mr-[5px] text-[1.6rem]"
                  />
                )}
                <span>
                  {isCurrentPlaylist
                    ? isPlaying
                      ? "Tạm dừng"
                      : "Tiếp tục phát"
                    : "Phát ngẫu nhiên"}
                </span>
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

        <div className="lg:ml-[330px]">
          {data?.sortDescription && (
            <p>
              <span className="text-[1.4rem] text-[#696969]">Lời tựa</span>
              <span className="ml-[4px] text-[1.4rem]">
                {data?.sortDescription}
              </span>
            </p>
          )}

          {hasSongs ? (
            <div className={`${data?.sortDescription && "mt-[10px]"}`}>
              <div className="z-10 flex items-center border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[#e5e3df] p-[10px] text-[1.2rem] font-[500] uppercase text-[#696969]">
                <div className="mr-[10px] w-1/2">
                  <div className="flex items-center gap-[10px]">
                    <div className="size-[16px]"></div>
                    <span>bài hát</span>
                  </div>
                </div>

                <span className="hidden flex-1 lg:block">album</span>

                <span className="hidden lg:block">thời gian</span>
              </div>
              {songsFiltered?.map((song, index) => (
                <SongItem key={song.encodeId} song={song} index={index} />
              ))}
              {hasSongs && (
                <div className="mt-[16px] flex items-center gap-[8px] text-[1.3rem] text-[#696969]">
                  <span>{data?.song.items.length} bài hát</span> <div>•</div>
                  <span>7 giờ 39 phút</span>
                </div>
              )}
            </div>
          ) : (
            <ResultNotFound title="Danh sách bài hát đang được cập nhật" />
          )}
        </div>
      </section>

      {hasSongs && (
        <>
          <h2 className="mb-[20px] mt-[48px] hidden text-[2rem] font-[700] sm:block">
            Nghệ Sĩ Tham Gia
          </h2>

          <ArtistList />
        </>
      )}
    </section>
  );
};
