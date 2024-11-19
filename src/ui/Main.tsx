import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { useEffect, useRef } from "react";
import { currentSongSelector } from "../features/player/selectors";

export const Main = () => {
  const currentSong = useSelector(currentSongSelector);
  const songName = currentSong.name;
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const headerElement = document.querySelector("header");
    mainRef.current?.addEventListener("scroll", () => {
      if (mainRef.current && mainRef.current.scrollTop > 0) {
        headerElement?.classList.add("header-bg-scroll");
      } else {
        headerElement?.classList.remove("header-bg-scroll");
      }
    });
  }, []);

  return (
    <main
      ref={mainRef}
      className={`flex-1 overflow-x-hidden overflow-y-scroll px-[60px] ${songName ? "pb-[130px]" : "pb-[40px]"} h-screen`}
    >
      <Outlet />
    </main>
  );
};
