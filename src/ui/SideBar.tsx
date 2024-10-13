import { Link } from "react-router-dom";
import { NavLinkEle } from "../components/NavLinkEle";
import {
  CloudArrowUpIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ListBulletIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { RadioIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import { UpdateAccount } from "../components/UpdateAccount";
import { ClockIcon } from "@heroicons/react/24/outline";
import logo from "../../public/logo-light.svg";
import { LibraryIcon } from "../components/LibraryIcon";
import { DvdIcon } from "../components/DvdIcon";
import { ChartIcon } from "../components/ChartIcon";

export const SideBar = () => {
  return (
    <aside className="w-[240px] bg-[#d9d7d4]">
      <Link
        to="/"
        className="flex items-center justify-center p-5 opacity-80 transition-opacity duration-[0.5s] hover:opacity-100"
      >
        <img src={logo} alt="" className="w-[150px] object-cover" />
      </Link>
      <div>
        <NavLinkEle
          Icon={() => <LibraryIcon />}
          to="mymusic"
          title="Thư Viện"
        />
        <NavLinkEle Icon={() => <DvdIcon />} to="/" title="Khám Phá" />
        <NavLinkEle
          Icon={() => <ChartIcon />}
          to="zing-chart"
          title="#zingchart"
        />
        <NavLinkEle
          Icon={() => <RadioIcon className="size-[24px]" />}
          to="radio"
          title="Radio"
        />
      </div>
      <div className="mx-auto my-[15px] h-[1px] w-[80%] bg-[#c3c1be]"></div>
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
              <div className="flex items-center justify-center rounded-xl bg-[#7c36ff] p-[2px]">
                <ClockIcon className="size-[20px] text-white" />
              </div>
            )}
            to="a"
            title="Nghe gần đây"
          />
          <NavLinkEle
            Icon={() => (
              <div className="flex items-center justify-center rounded-xl bg-[#4ac4ff] p-[2px]">
                <HeartIcon className="size-[20px] text-white" />
              </div>
            )}
            to="b"
            title="Bài hát yêu thích"
          />
          <NavLinkEle
            Icon={() => (
              <div className="flex items-center justify-center rounded-xl bg-[#ef7735] p-[2px]">
                <ListBulletIcon className="size-[20px] text-white" />
              </div>
            )}
            to="c"
            title="Playlist"
          />
          <NavLinkEle
            Icon={() => (
              <div className="flex items-center justify-center rounded-xl bg-[#f447ad] p-[2px]">
                <SignalIcon className="size-[20px] text-white" />
              </div>
            )}
            to="d"
            title="Album"
          />
          <NavLinkEle
            Icon={() => (
              <div className="flex items-center justify-center rounded-xl bg-[#f4514f] p-[2px]">
                <CloudArrowUpIcon className="size-[20px] text-white" />
              </div>
            )}
            to="e"
            title="Đã tải lên"
          />
          <div className="mx-auto my-[15px] h-[1px] w-[80%] bg-[#c3c1be]"></div>
          <div className="flex cursor-pointer items-center justify-between px-[21px] pb-14 hover:text-[#5f4646]">
            <span className="text-[1.4rem]">Indie</span>
            <EllipsisHorizontalIcon className="size-[24px] rounded-full hover:bg-[#cecdcd]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
