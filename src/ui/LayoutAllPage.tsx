import { Outlet } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "../components/PopOvers";

export const LayoutAllPage = () => {
  return (
    <PopOvers>
      <Outlet />
      <Player />
    </PopOvers>
  );
};
