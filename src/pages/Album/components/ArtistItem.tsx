import { UserPlusIcon } from "@heroicons/react/24/outline";

export const ArtistItem = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="group/item relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full">
        <img
          src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/1/4/b/814bd489b26a00c14c4931d10b302afd.jpg"
          alt=""
          className="w-full object-cover transition-all duration-700 group-hover/item:scale-110"
        />
        <div className="absolute inset-0 hidden bg-black/10 group-hover/item:block"></div>
        <div className="absolute hidden size-[45px] items-center justify-center rounded-full border-[1px] border-white text-white group-hover/item:flex">
          <i className="fa-solid fa-shuffle cursor-pointer text-[1.8rem]"></i>
        </div>
      </div>
      <h3 className="mb-[4px] mt-[15px] cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d] hover:underline">
        Thịnh Suy
      </h3>
      <span className="text-[1.2rem] text-[#696969]">55K quan tâm</span>
      <div className="mt-[15px] flex cursor-pointer items-center gap-[5px] rounded-full bg-[#644646] px-[19px] py-[6px] text-white hover:brightness-[0.9]">
        <UserPlusIcon className="size-[14px]" />
        <span className="text-[12px] uppercase">quan tâm</span>
      </div>
    </div>
  );
};
