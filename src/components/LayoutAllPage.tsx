import { Outlet, useLocation } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "./PopOvers";

const disablePlayerPaths = ["/sign-in", "/sign-up"];

export const LayoutAllPage = () => {
  const location = useLocation();

  const shouldDisablePlayer = disablePlayerPaths.includes(location.pathname);

  return (
    <PopOvers>
      <Outlet />
      <Player disable={shouldDisablePlayer} />
    </PopOvers>
  );
};
