import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Search } from "../components/Search";
import { Button } from "../components/Button";
import { useState } from "react";
import { PopOver } from "../components/PopOver";

export const Header = () => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

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
      <div className="ml-9">
        <Search />
      </div>
      <div className="flex items-center ml-auto gap-3">
        <Button title="Nâng cấp tài khoản" solid href="#!" />
        <Button
          title="Tải bản window"
          href="#!"
          Icon={() => <ArchiveBoxArrowDownIcon className="size-[24px]" />}
        />
        <button
          onClick={handleShow}
          className="size-[40px] rounded-full bg-[#d9d7d4] flex items-center justify-center relative"
        >
          <Cog8ToothIcon className="size-[22px] text-[#4c5259]" />

          {show && (
            <div className="bg-red-500 p-[6px] text-white absolute top-[140%] right-0">
              Test
            </div>
          )}
        </button>
        <div className="size-[40px] flex-shrink-0 overflow-hidden rounded-full cursor-pointer">
          <img
            src="./image.png"
            alt=""
            className="w-full object-cover h-full"
          />
        </div>
      </div>

      <PopOver>
        <PopOver.Button />
        <PopOver.Content />
      </PopOver>
    </header>
  );
};
