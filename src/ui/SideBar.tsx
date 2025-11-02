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
import logoLight from "/logo-light.svg";
import logoDark from "/logo-dark.svg";
import dvd from "../../public/dvd.svg";
import { LibraryIcon } from "../components/LibraryIcon";
import { DvdIcon } from "../components/DvdIcon";
import { ChartIcon } from "../components/ChartIcon";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import clsx from "clsx";
import { currentSongSelector } from "../features/player/selectors";
import { useEffect, useRef } from "react";

export const SideBar = () => {
  const isDark = useSelector((state: RootState) => state.theme.type) === "dark";
  const session = useSelector((state: RootState) => state.auth.session);
  const { name } = useSelector(currentSongSelector);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollableRef.current?.addEventListener("scroll", () => {
      if (scrollableRef.current && scrollableRef.current.scrollTop > 0) {
        scrollableRef.current?.classList.add("is-mark");
      } else {
        scrollableRef.current?.classList.remove("is-mark");
      }
    });
  }, []);

  return (
    <aside className="w-[50px] bg-sidebar-bg xl:w-[240px]">
      <Link
        to="/"
        className="hidden items-center justify-center p-5 opacity-90 transition-opacity duration-[0.5s] hover:opacity-100 xl:flex"
      >
        <img
          src={isDark ? logoDark : logoLight}
          alt=""
          className="w-[150px] object-cover"
        />
      </Link>
      <Link
        to="/"
        className="flex items-center justify-center p-5 opacity-80 transition-opacity duration-[0.5s] hover:opacity-100 xl:hidden"
      >
        <img src={dvd} alt="" className="object-cover" />
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
          Icon={() => <RadioIcon className="size-[24px] flex-shrink-0" />}
          to="radio"
          title="Radio"
        />
      </div>
      <div className="mx-auto my-[15px] h-[0.5px] w-[80%] bg-border-primary"></div>
      <div
        ref={scrollableRef}
        style={{
          overflowY: "scroll",
          height: `calc(100vh - ${!name ? "35" : "43.8"}rem)`,
        }}
      >
        <NavLinkEle
          Icon={() => <MusicalNoteIcon className="size-[24px] flex-shrink-0" />}
          to="moi-phat-hanh"
          title="BXH Nhạc Mới"
        />
        <NavLinkEle
          Icon={() => <SwatchIcon className="size-[24px] flex-shrink-0" />}
          to="hub"
          title="Chủ Đề & Thể Loại"
        />
        <NavLinkEle
          Icon={() => <StarIcon className="size-[24px] flex-shrink-0" />}
          to="top100"
          title="Top 100"
        />
        <div
          className={clsx("m-[20px] hidden xl:block", {
            "my-[5px]": !session,
          })}
        >
          <UpdateAccount />
        </div>
        {session && (
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
              to="/favorite"
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
            <div className="mx-auto my-[15px] hidden h-[1px] w-[80%] bg-border-primary xl:block"></div>
            <div
              className={clsx(
                "group hidden cursor-pointer items-center justify-between px-[21px] text-navigation-text hover:text-text-item-hover xl:flex",
                name ? "pb-6" : "pb-8",
              )}
            >
              <span className="h-[24px] text-[1.4rem]">Indie</span>
              <EllipsisHorizontalIcon className="hidden size-[24px] rounded-full hover:bg-alpha-bg group-hover:block" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
