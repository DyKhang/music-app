import { Outlet } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "../components/PopOvers";
import { Modal } from "../components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

export const LayoutAllPage = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.current.value,
  );
  const previewTheme = useSelector(
    (state: RootState) => state.theme.preview?.value,
  );
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      previewTheme ?? currentTheme,
    );
  }, [currentTheme, previewTheme]);
  return (
    <Modal>
      <PopOvers>
        <Outlet />
        <Player />
      </PopOvers>
    </Modal>
  );
};
