import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Search } from "../components/Search";
import { Button } from "../components/Button";
import { PopOvers } from "../components/PopOvers";
import { POContentHeader } from "../components/POContentHeader";

export const Header = () => {
  return (
    <header className="flex h-[70px] items-center px-[60px]">
      <div className="flex items-center gap-9">
        <button>
          <ArrowLeftIcon className="size-[20px] cursor-default opacity-25" />
        </button>
        <button>
          <ArrowRightIcon className="size-[20px] cursor-default opacity-25" />
        </button>
      </div>
      <div className="ml-9 w-[36%]">
        <Search />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button title="Nâng cấp tài khoản" solid href="#!" width="250px" />
        <Button
          title="Tải bản window"
          href="#!"
          Icon={() => <ArchiveBoxArrowDownIcon className="size-[24px]" />}
          width="190"
        />
        <PopOvers.PopOver>
          <>
            <PopOvers.Button open="header">
              <div className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-full bg-[#d9d7d4]">
                <Cog8ToothIcon className="size-[22px] text-[#4c5259]" />
              </div>
            </PopOvers.Button>
            <PopOvers.Content name="header">
              <POContentHeader />
            </PopOvers.Content>
          </>
        </PopOvers.PopOver>
        <div className="size-[40px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full">
          <img
            src="./image.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
