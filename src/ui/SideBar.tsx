import { Link } from "react-router-dom";
import { NavLinkEle } from "../components/NavLinkEle";
import {
  BuildingLibraryIcon,
  CloudArrowUpIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ListBulletIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { RadioIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import { UpdateAccount } from "../components/UpdateAccount";
import { ClockIcon } from "@heroicons/react/24/outline";

export const SideBar = () => {
  return (
    <aside className="bg-[#d9d7d4] w-[240px]">
      <Link
        to="/"
        className="transition-opacity duration-[0.5s] flex p-5 items-center justify-center opacity-80 hover:opacity-100"
      >
        <img src="./logo-light.svg" alt="" className="object-cover w-[150px]" />
      </Link>
      <div>
        <NavLinkEle
          Icon={() => <BuildingLibraryIcon className="size-[24px]" />}
          to="mymusic"
          title="Thư Viện"
        />
        <NavLinkEle
          Icon={() => <GlobeAltIcon className="size-[24px]" />}
          to="/"
          title="Khám Phá"
        />
        <NavLinkEle
          Icon={() => <ChartBarIcon className="size-[24px]" />}
          to="zing-chart"
          title="#zingchart"
        />
        <NavLinkEle
          Icon={() => <RadioIcon className="size-[24px]" />}
          to="radio"
          title="Radio"
        />
      </div>
      <div className="w-[80%] h-[1px] bg-[#c3c1be] my-[15px] mx-auto"></div>
      <div className="sub-sidebar">
        <NavLinkEle
          Icon={() => <MusicalNoteIcon className="size-[24px]" />}
          to="moi-phat-hanh"
          title="BXH Nhạc Mới"
        />
        <NavLinkEle
          Icon={() => <SwatchIcon className="size-[24px]" />}
          to="hub"
          title="Chủ Đề & Thể Loại"
        />
        <NavLinkEle
          Icon={() => <StarIcon className="size-[24px]" />}
          to="top100"
          title="Top 100"
        />
        <div className="m-[20px]">
          <UpdateAccount />
        </div>
        <div>
          <NavLinkEle
            Icon={() => (
              <div className="bg-[#7c36ff] rounded-xl p-[2px] flex items-center justify-center">
                <ClockIcon className="size-[20px] text-white" />
              </div>
            )}
            to="a"
            title="Nghe gần đây"
          />
          <NavLinkEle
            Icon={() => (
              <div className="bg-[#4ac4ff] rounded-xl p-[2px] flex items-center justify-center">
                <HeartIcon className="size-[20px] text-white" />
              </div>
            )}
            to="b"
            title="Bài hát yêu thích"
          />
          <NavLinkEle
            Icon={() => (
              <div className="bg-[#ef7735] rounded-xl p-[2px] flex items-center justify-center">
                <ListBulletIcon className="size-[20px] text-white" />
              </div>
            )}
            to="c"
            title="Playlist"
          />
          <NavLinkEle
            Icon={() => (
              <div className="bg-[#f447ad] rounded-xl p-[2px] flex items-center justify-center">
                <SignalIcon className="size-[20px] text-white" />
              </div>
            )}
            to="d"
            title="Album"
          />
          <NavLinkEle
            Icon={() => (
              <div className="bg-[#f4514f] rounded-xl p-[2px] flex items-center justify-center">
                <CloudArrowUpIcon className="size-[20px] text-white" />
              </div>
            )}
            to="e"
            title="Đã tải lên"
          />
          <div className="w-[80%] h-[1px] bg-[#c3c1be] my-[15px] mx-auto"></div>
          <div className="flex px-[21px] justify-between items-center cursor-pointer pb-14 hover:text-[#5f4646]">
            <span className="text-[1.4rem]">Indie</span>
            <EllipsisHorizontalIcon className="size-[24px] rounded-full hover:bg-[#cecdcd]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
