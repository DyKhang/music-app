import { Link } from "react-router-dom";
import { NavLinkEle } from "../components/NavLinkEle";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { RadioIcon } from "@heroicons/react/24/outline";

export const SideBar = () => {
  return (
    <aside className="bg-[#d9d7d4] w-[240px]">
      <Link
        to="/"
        className="transition-opacity duration-[0.5s] flex p-5 items-center justify-center opacity-80 hover:opacity-100"
      >
        <img src="./logo-light.svg" alt="" className="object-cover w-[150px]" />
      </Link>
      <div>
        <NavLinkEle
          Icon={() => <BuildingLibraryIcon className="size-[24px]" />}
          to="mymusic"
          title="Thư Viện"
        />
        <NavLinkEle
          Icon={() => <GlobeAltIcon className="size-[24px]" />}
          to="/"
          title="Khám Phá"
        />
        <NavLinkEle
          Icon={() => <ChartBarIcon className="size-[24px]" />}
          to="zing-chart"
          title="#zingchart"
        />
        <NavLinkEle
          Icon={() => <RadioIcon className="size-[24px]" />}
          to="radio"
          title="Radio"
        />
      </div>
    </aside>
  );
};
