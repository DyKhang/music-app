import { Outlet } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "../components/PopOvers";
import { Modal } from "../components/Modal";

export const LayoutAllPage = () => {
  return (
    <Modal>
      <PopOvers>
        <Outlet />
        <Player />
      </PopOvers>
    </Modal>
  );
};
