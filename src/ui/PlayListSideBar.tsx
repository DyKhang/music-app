import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SideBarItem } from "../components/SideBarItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router";

interface Props {
  isShow: boolean;
}

export const PlayListSideBar: React.FC<Props> = ({ isShow }) => {
  const [state, setState] = useState<"playlist" | "recent">("playlist");
  const navigate = useNavigate();
  const songs = useSelector((state: RootState) => state.songs);
  const playListInfo = useSelector((state: RootState) => state.playList);
  const playedSongs = songs.filter((song) => song.isPlayed);
  const unPlayedSongs = songs.filter((song) => !song.isPlayed);

  return (
    <section
      className={`fixed right-[-330px] ${isShow && "translate-x-[-330px]"} top-0 z-[55] h-screen w-[330px] bg-[#e5e3df] px-[8px] pb-[150px] pt-[14px] shadow-2xl transition duration-700`}
    >
      <div className="flex items-center justify-between">
        <div className="flex rounded-full bg-[rgba(0,0,0,0.05)] p-[3px]">
          <div
            className={`cursor-pointer rounded-full ${state === "playlist" && "shadow-playListSideBarActiveTag bg-[hsla(0,0%,100%,0.3)] text-[#844d4d]"} px-[16px] py-[5px] text-[1.2rem]`}
            onClick={() => setState("playlist")}
          >
            Danh sách phát
          </div>
          <div
            className={`cursor-pointer rounded-full px-[16px] py-[5px] text-[1.2rem] ${state === "recent" && "shadow-playListSideBarActiveTag bg-[hsla(0,0%,100%,0.3)] text-[#844d4d]"}`}
            onClick={() => setState("recent")}
          >
            Nghe gần đây
          </div>
        </div>
        <div className="flex size-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
          <FontAwesomeIcon icon={faClock} className="text-[1.4rem]" />
        </div>
        <div className="flex size-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
          <EllipsisHorizontalIcon className="size-[20px]" />
        </div>
      </div>

      <div className="mt-[14px] h-full overflow-y-scroll">
        {playedSongs.map((song) => (
          <SideBarItem key={song.encodeId} song={song} />
        ))}
        {unPlayedSongs[0] && (
          <>
            <div className="sticky top-[58px] z-[1] bg-[#e5e3df] px-[8px] pb-[5px] pt-[15px] text-[1.4rem] font-[700]">
              Tiếp theo
              {playListInfo.name && (
                <div className="flex items-center gap-[5px]">
                  <span className="flex-shrink-0 font-[400] text-[rgba(20,20,20,0.4)]">
                    Từ playlist
                  </span>
                  <span
                    className="oneline-letters cursor-pointer font-[500] text-[#844d4d]"
                    onClick={() => navigate(`/album/${playListInfo.id}`)}
                  >
                    {playListInfo.name}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        {unPlayedSongs.map((song) => (
          <SideBarItem key={song.encodeId} song={song} />
        ))}
      </div>
    </section>
  );
};
