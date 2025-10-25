import { Outlet } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "../components/PopOvers";
import { Modal } from "../components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

export const LayoutAllPage = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.value);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);
  return (
    <Modal>
      <PopOvers>
        <Outlet />
        <Player />
      </PopOvers>
    </Modal>
  );
};
