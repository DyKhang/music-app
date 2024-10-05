import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Filter = () => {
  const [isShow, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(type: "all" | "song" | "artist" | "album") {
    return () => {
      searchParams.set("filter", type);
      setSearchParams(searchParams);
      handleShowFilter();
    };
  }

  function handleShowFilter() {
    setShow(!isShow);
  }

  return (
    <div className="relative flex size-[16px] cursor-pointer items-center justify-center rounded-md border-[0.5px] border-[#b4b4b4]">
      <AdjustmentsVerticalIcon
        className="size-[14px] text-[#b4b4b4]"
        onClick={handleShowFilter}
      />
      {isShow && (
        <div className="filter-tag absolute left-[-10px] top-[190%] z-10 w-max rounded-[8px] bg-[#f7f5f3] p-[5px] capitalize before:absolute before:left-4 before:top-[-6px] before:z-[-1] before:block before:size-7 before:rotate-45 before:bg-[#f7f5f3] before:content-['']">
          <div className="flex flex-col">
            <span
              onClick={handleFilter("all")}
              className="rounded-[4px] p-[10px] text-[1.2rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]"
            >
              Mặc định
            </span>
            <span
              onClick={handleFilter("song")}
              className="rounded-[4px] p-[10px] text-[1.2rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]"
            >
              Tên bài hát (A-Z)
            </span>
            <span
              onClick={handleFilter("artist")}
              className="rounded-[4px] p-[10px] text-[1.2rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]"
            >
              Tên ca sĩ (A-Z)
            </span>
            <span
              onClick={handleFilter("album")}
              className="rounded-[4px] p-[10px] text-[1.2rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]"
            >
              Tên Album (A-Z)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
