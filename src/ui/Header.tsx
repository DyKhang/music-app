import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Search } from "../components/Search";
import { Button } from "../components/Button";
import { PopOver } from "../components/PopOver";
import { POContentHeader } from "../components/POContentHeader";

export const Header = () => {
  return (
    <header className="px-[60px] flex items-center h-[70px]">
      <div className="flex items-center gap-9">
        <button>
          <ArrowLeftIcon className="size-[20px] opacity-25 cursor-default" />
        </button>
        <button>
          <ArrowRightIcon className="size-[20px] opacity-25 cursor-default" />
        </button>
      </div>
      <div className="ml-9 w-[36%]">
        <Search />
      </div>
      <div className="flex items-center ml-auto gap-3">
        <Button title="Nâng cấp tài khoản" solid href="#!" width="250px" />
        <Button
          title="Tải bản window"
          href="#!"
          Icon={() => <ArchiveBoxArrowDownIcon className="size-[24px]" />}
          width="190"
        />
        <PopOver>
          <PopOver.Button>
            <div className="size-[40px] rounded-full bg-[#d9d7d4] flex items-center justify-center relative">
              <Cog8ToothIcon className="size-[22px] text-[#4c5259]" />
            </div>
            <PopOver.Content>
              <POContentHeader />
            </PopOver.Content>
          </PopOver.Button>
        </PopOver>
        <div className="size-[40px] flex-shrink-0 overflow-hidden rounded-full cursor-pointer">
          <img
            src="./image.png"
            alt=""
            className="w-full object-cover h-full"
          />
        </div>
      </div>
    </header>
  );
};
