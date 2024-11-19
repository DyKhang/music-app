import { PopOvers } from "../components/PopOvers";
import { Header } from "./Header";
import { Main } from "./Main";
import { Player } from "./Player";
import { SideBar } from "./SideBar";

export const MainLayout = () => {
  return (
    <PopOvers>
      <Header />
      <SideBar />
      <Main />
      <Player />
    </PopOvers>
  );
};
