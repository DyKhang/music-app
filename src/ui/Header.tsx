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
import { ToolTip } from "../components/ToolTip";
import { POAvatar } from "../components/POAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Header = () => {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <header className="header-inset fixed z-[40] flex h-[70px] items-center px-[10px] sm:px-[60px]">
      <div className="hidden items-center gap-9 md:flex">
        <button>
          <ArrowLeftIcon className="size-[20px] cursor-default opacity-25" />
        </button>

        <button>
          <ArrowRightIcon className="size-[20px] cursor-default opacity-25" />
        </button>
      </div>
      <Search />
      <div className="ml-auto flex items-center gap-3">
        <Button title="Nâng cấp tài khoản" solid href="#!" />
        <Button
          title="Tải bản window"
          href="#!"
          Icon={() => <ArchiveBoxArrowDownIcon className="size-[24px]" />}
          width="190"
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <ToolTip title="Cài đặt">
              <div className="relative hidden size-[40px] cursor-pointer items-center justify-center rounded-full bg-alpha-bg sm:flex">
                <Cog8ToothIcon className="size-[22px]" />
              </div>
            </ToolTip>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <POContentHeader />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="size-[40px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full hover:brightness-90">
              <img
                src={
                  session
                    ? session.avatar
                    : "https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.13.11/static/media/user-default.3ff115bb.png"
                }
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <POAvatar session={session} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
