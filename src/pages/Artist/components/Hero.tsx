import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { CheckIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ArtistApi } from "../../../api/artistApi";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { AwardIcon } from "../../../components/AwardIcon";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { PauseIcon } from "@heroicons/react/24/solid";
import { togglePlaying } from "../../../features/player/playerSlice";

interface Props {
  data: AxiosResponse<ArtistApi, unknown> | undefined;
}

export const Hero: React.FC<Props> = ({ data }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const isPlaying = useSelector((state: RootState) => state.isPlaying);
  const dispatch = useAppDispatch();

  function handleFollow() {
    setIsFollowed(!isFollowed);
  }

  return (
    <section className="relative pb-[24px]">
      <div className="width-hero-detail-artist absolute left-[-60px] h-full overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${data?.data.data.thumbnailM})`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[50px]"
        ></div>
        <div className="absolute inset-0 bg-[rgba(229,227,223,0.6)]"></div>
      </div>
      <div className="relative z-[2] flex gap-[32px] pt-[135px]">
        <img
          src={data?.data.data.thumbnailM}
          alt=""
          className="size-[140px] rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-[20px]">
            <span className="text-[6rem] font-[700]">
              {data?.data.data.name}
            </span>
            <div
              onClick={() => {
                if (isPlaying) {
                  dispatch(togglePlaying(false));
                } else {
                  dispatch(togglePlaying(true));
                }
              }}
              className="flex size-[52px] cursor-pointer items-center justify-center rounded-full bg-[#644646] hover:brightness-[.9]"
            >
              {isPlaying ? (
                <PauseIcon className="size-[30px] text-white" />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  className="translate-x-[2px] text-[2.4rem] text-white"
                />
              )}
            </div>
          </div>
          <div className="mt-[16px] flex items-center gap-[24px]">
            <span className="text-[1.4rem] font-[500]">
              {data?.data.data.totalFollow.toLocaleString("vi-VN")} người quan
              tâm
            </span>
            <div
              onClick={handleFollow}
              className="flex cursor-pointer items-center gap-[5px] rounded-full border-[1px] border-[rgba(0,0,0,0.1)] px-[24px] py-[4px] hover:brightness-[0.9]"
            >
              {isFollowed ? (
                <CheckIcon className="size-[18px]" />
              ) : (
                <UserPlusIcon className="size-[18px]" />
              )}
              <span className="text-[12px] uppercase">
                {isFollowed ? "đã quan tâm" : "quan tâm"}
              </span>
            </div>
          </div>
        </div>
        {data?.data.data.awards && (
          <div className="ml-auto size-[42px] self-end">
            <AwardIcon />
          </div>
        )}
      </div>
    </section>
  );
};
