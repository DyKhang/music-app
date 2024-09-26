import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { RootState } from "../store";
import { useEffect, useRef } from "react";

export const Main = () => {
  const songName = useSelector(
    (state: RootState) => state.player.currentSong.name,
  );
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
    <div
      ref={mainRef}
      className={`flex-1 overflow-y-scroll px-[60px] ${songName ? "pb-[130px]" : "pb-[40px]"}`}
    >
      <Outlet />
    </div>
  );
};
