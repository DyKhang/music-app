import { PlusIcon } from "@heroicons/react/24/outline";

export const Player = () => {
  return (
    <div className="fixed w-full bottom-0 ">
      <div className="w-[240px] group/new-playlist border-[#c3c1be] border-t-[1px] flex px-[24px] py-[16px] gap-3 items-center cursor-pointer bg-[#d9d7d4]">
        <div className="bg-[#b2b0ae] rounded-xl p-[2px] flex items-center justify-center flex-shrink-0">
          <PlusIcon className="size-[20px] text-white group-hover/new-playlist:scale-[80%] transition-transform duration-[300ms]" />
        </div>
        <span className="text-[1.4rem] text-black font-medium group-hover/new-playlist:text-[#5f4646]">
          Tạo playlist mới
        </span>
      </div>
      <div className="bg-[#dddad1] h-[90px] px-[20px] ">Player</div>
    </div>
  );
};
