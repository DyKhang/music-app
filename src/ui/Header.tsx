import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Search } from "../components/Search";
import { Button } from "../components/Button";
import { POContentHeader } from "../components/POContentHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/DropDown";
import avatar from "../../public/image.png";
import { ToolTip } from "../components/ToolTip";

export const Header = () => {
  return (
    <header className="header-inset fixed z-[40] flex h-[70px] items-center px-[60px]">
      <div className="flex items-center gap-9">
        <button>
          <ArrowLeftIcon className="size-[20px] cursor-default opacity-25" />
        </button>

        <button>
          <ArrowRightIcon className="size-[20px] cursor-default opacity-25" />
        </button>
      </div>
      <Search />
      <div className="ml-auto flex items-center gap-3">
        <Button title="Nâng cấp tài khoản" solid href="#!" width="250px" />
        <Button
          title="Tải bản window"
          href="#!"
          Icon={() => <ArchiveBoxArrowDownIcon className="size-[24px]" />}
          width="190"
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <ToolTip title="Cài đặt">
              <div className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-full bg-[#d9d7d4]">
                <Cog8ToothIcon className="size-[22px] text-[#4c5259]" />
              </div>
            </ToolTip>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <POContentHeader />
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="size-[40px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full">
          <img src={avatar} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
};
