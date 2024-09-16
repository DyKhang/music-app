import { Header } from "./Header";
import { Main } from "./Main";
import { Player } from "./Player";
import { SideBar } from "./SideBar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <Header />
        <Main />
      </div>
      <Player />
    </div>
  );
};
