import { Outlet, useLocation } from "react-router";
import { Player } from "../ui/Player";
import { PopOvers } from "./PopOvers";
import { createContext, useEffect, useState } from "react";

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
  const [session, setSession] = useState<{
    email: string;
    username: string;
    avatar: string;
  } | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("session")) {
      setSession(JSON.parse(localStorage.getItem("session")!));
    }
  }, []);

  const shouldDisablePlayer = disablePlayerPaths.includes(location.pathname);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <PopOvers>
        <Outlet />
        <Player disable={shouldDisablePlayer} />
      </PopOvers>
    </AuthContext.Provider>
  );
};
