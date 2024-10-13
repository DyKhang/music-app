import { AxiosResponse } from "axios";
import { ArtistApi } from "../../../api/artistApi";
import { PlayIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import {
  getPlayList,
  togglePlaying,
} from "../../../features/player/playerSlice";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { LoaderSmall } from "../../../components/LoaderSmall";

interface Props {
  data: AxiosResponse<ArtistApi, unknown> | undefined;
}

export const NewRelease: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPlaylistId = useSelector(
    (state: RootState) => state.playList.id,
  );
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const isCurrentPlayList =
    data?.data.data.topAlbum.encodeId === currentPlaylistId;

  const isLoading =
    useSelector((state: RootState) => state.status) === "loading";

  if (isCurrentPlayList)
    return (
      <section className="relative flex flex-col justify-between">
        <h2 className="mb-[20px] text-[2rem] font-[700]">Mới Phát Hành</h2>
        <div className="absolute bottom-0 left-0 right-0 h-[183px] overflow-hidden rounded-[12px]">
          <div
            style={{
              backgroundImage: `url(${data?.data.data.topAlbum.thumbnailM})`,
            }}
            className="absolute inset-0 rounded-[16px] bg-cover bg-center bg-no-repeat"
          ></div>
          <div className="bg-new-single-of-artist absolute inset-0"></div>
          <div
            style={{
              backdropFilter: "blur(25px)",
            }}
            className="bg-[rgba(20, 20, 20, 0.05)] absolute inset-0"
          ></div>
        </div>
        <div className="group/release relative">
          <div
            className="relative z-[2] flex cursor-pointer gap-[16px] rounded-[12px] p-[16px]"
            onClick={() =>
              navigate(`/album/${data?.data.data.topAlbum.encodeId}`)
            }
          >
            <div className="relative size-[151px] flex-shrink-0 overflow-hidden rounded-[5px]">
              <img
                src={data?.data.data.topAlbum.thumbnailM}
                alt=""
                className="w-full object-cover transition-all duration-500 group-hover/release:scale-110"
              />
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() =>
                  navigate(`/album/${data?.data.data.topAlbum.encodeId}`)
                }
              ></div>
            </div>
          </div>
          <div className="absolute left-[33px] top-1/2 z-[2] flex -translate-y-1/2 items-center gap-3 text-white">
            <div className="flex size-[28px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30">
              <HeartIcon className="size-[20px]" />
            </div>

            <div
              className="flex size-[48px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-white"
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
                <PlayIcon className="size-[28px] translate-x-[1px]" />
              )}
            </div>

            <div className="flex size-[28px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30">
              <EllipsisHorizontalIcon className="size-[20px]" />
            </div>
          </div>
          <div className="absolute left-[183px] top-[22px] z-[2] flex flex-col py-[6px]">
            <span className="text-[rgba(20, 20, 20, 0.6)] text-[1.2rem]">
              {data?.data.data.topAlbum.textType}
            </span>
            <span className="mt-[12px] pr-[16px] text-[1.4rem] font-[600] text-[#141414]">
              {data?.data.data.topAlbum.title}
            </span>
            <span className="text-[rgba(20, 20, 20, 0.6)] mt-[2px] text-[1.2rem] hover:text-[#844d4d] hover:underline">
              {data?.data.data.topAlbum.artistsNames}
            </span>
            <span className="text-[rgba(20, 20, 20, 0.6)] mt-[12px] text-[1.2rem]">
              {data?.data.data.topAlbum.releaseDate}
            </span>
          </div>
        </div>
      </section>
    );

  return (
    <section className="relative flex flex-col justify-between">
      <h2 className="mb-[20px] text-[2rem] font-[700]">Mới Phát Hành</h2>
      <div className="absolute bottom-0 left-0 right-0 h-[183px] overflow-hidden rounded-[12px]">
        <div
          style={{
            backgroundImage: `url(${data?.data.data.topAlbum.thumbnailM})`,
          }}
          className="absolute inset-0 rounded-[16px] bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="bg-new-single-of-artist absolute inset-0"></div>
        <div
          style={{
            backdropFilter: "blur(25px)",
          }}
          className="bg-[rgba(20, 20, 20, 0.05)] absolute inset-0"
        ></div>
      </div>
      <div className="group/release relative">
        <div
          className="relative z-[2] flex cursor-pointer gap-[16px] rounded-[12px] p-[16px]"
          onClick={() =>
            navigate(`/album/${data?.data.data.topAlbum.encodeId}`)
          }
        >
          <div className="relative size-[151px] flex-shrink-0 overflow-hidden rounded-[5px]">
            <img
              src={data?.data.data.topAlbum.thumbnailM}
              alt=""
              className="w-full object-cover transition-all duration-500 group-hover/release:scale-110"
            />
            <div
              className="absolute inset-0 hidden bg-black/40 group-hover/release:block"
              onClick={() =>
                navigate(`/album/${data?.data.data.topAlbum.encodeId}`)
              }
            ></div>
          </div>
        </div>
        <div className="absolute left-[33px] top-1/2 z-[2] hidden -translate-y-1/2 items-center gap-3 text-white group-hover/release:flex">
          <div className="flex size-[28px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30">
            <HeartIcon className="size-[20px]" />
          </div>

          <div
            className="flex size-[48px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-white"
            onClick={() =>
              dispatch(getPlayList({ id: data!.data.data.topAlbum.encodeId }))
            }
          >
            {isLoading ? (
              <LoaderSmall color="white" />
            ) : (
              <PlayIcon className="size-[28px] translate-x-[1px]" />
            )}
          </div>

          <div className="flex size-[28px] cursor-pointer items-center justify-center rounded-full hover:bg-white/30">
            <EllipsisHorizontalIcon className="size-[20px]" />
          </div>
        </div>
        <div className="absolute left-[183px] top-[22px] z-[2] flex flex-col py-[6px]">
          <span className="text-[rgba(20, 20, 20, 0.6)] text-[1.2rem]">
            {data?.data.data.topAlbum.textType}
          </span>
          <span className="mt-[12px] pr-[16px] text-[1.4rem] font-[600] text-[#141414]">
            {data?.data.data.topAlbum.title}
          </span>
          <span className="text-[rgba(20, 20, 20, 0.6)] mt-[2px] text-[1.2rem] hover:text-[#844d4d] hover:underline">
            {data?.data.data.topAlbum.artistsNames}
          </span>
          <span className="text-[rgba(20, 20, 20, 0.6)] mt-[12px] text-[1.2rem]">
            {data?.data.data.topAlbum.releaseDate}
          </span>
        </div>
      </div>
    </section>
  );
};
