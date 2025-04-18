import { Outlet, useLocation } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "./PopOvers";
import { createContext } from "react";

const disablePlayerPaths = ["/sign-in", "/sign-up"];

type AuthContextType = {
  session: {
    email: string;
    username: string;
    avatar: string;
  } | null;
  setSession: React.Dispatch<
    React.SetStateAction<{
      email: string;
      username: string;
      avatar: string;
    } | null>
  >;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = () => {
  const location = useLocation();

  const shouldDisablePlayer = disablePlayerPaths.includes(location.pathname);

  return (
    <PopOvers>
      <Outlet />
      <Player disable={shouldDisablePlayer} />
    </PopOvers>
  );
};
