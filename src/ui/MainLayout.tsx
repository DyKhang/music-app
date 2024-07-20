import { Header } from "./Header";
import { Main } from "./Main";
import { Player } from "./Player";
import { SideBar } from "./SideBar";

export const MainLayout = () => {
  return (
    <div className="flex h-[100vh]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Main />
      </div>
      <Player />
    </div>
  );
};
