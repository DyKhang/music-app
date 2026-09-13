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
    const mainElement = mainRef.current;
    if (!headerElement || !mainElement) return;

    const handler = () => {
      if (mainElement && mainElement.scrollTop > 0) {
        headerElement.classList.add("header-bg-scroll");
      } else {
        headerElement.classList.remove("header-bg-scroll");
      }
    };

    mainElement.addEventListener("scroll", handler);

    return () => {
      mainElement.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className={`flex-1 overflow-x-hidden overflow-y-scroll px-[10px] sm:px-[60px] ${songName ? "pb-[130px]" : "pb-[40px]"} h-screen`}
    >
      <Outlet />
    </main>
  );
};
