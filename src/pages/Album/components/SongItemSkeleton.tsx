export const SongItemSkeleton = () => {
  return (
    <div className="flex items-center rounded-[4px] border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.05)] p-[10px]">
      <div className="mr-[10px] flex w-full animate-pulse items-center lg:w-1/2">
        <div
          className={`size-[14px] flex-shrink-0 animate-pulse rounded-[3px] border-[1px] bg-black/30`}
        ></div>

        <div className="relative mx-[10px] flex size-[40px] flex-shrink-0 animate-pulse items-center justify-center overflow-hidden rounded-[4px]">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-[12px] w-[115px] animate-pulse items-center gap-[8px] rounded-sm bg-black/30 text-[1.4rem] font-[500] leading-[1.6]"></div>
          <div className="mt-[8px] h-[10px] w-[80px] bg-black/30"></div>
        </div>
      </div>
      <div className="flex-1"></div>
      <span className="hidden h-[12px] w-[34px] animate-pulse rounded-sm bg-black/30 text-[1.2rem] text-[rgba(50,50,61,0.5)] group-hover/item:hidden lg:block"></span>
    </div>
  );
};
