import { useCallback, useEffect, useRef } from "react";
import { Outlet } from "react-router";

export const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    console.log("Đang cuộn");
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current?.addEventListener("scroll", handleScroll);

      return mainRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="flex-1 overflow-y-scroll px-[60px]" ref={mainRef}>
      <Outlet />
    </div>
  );
};
