import { Skeleton } from "./Skeleton";

export const TopNewSongsItemSkeleton = () => {
  return (
    <div className="group/item h-[150px] flex-1 cursor-pointer rounded-[4px] bg-box-item-bg p-[5px] shadow-new-release-box-shadow">
      <div className="flex gap-[10px] p-[10px]">
        <Skeleton className="group/img relative flex size-[120px] items-center justify-center overflow-hidden rounded-[4px]"></Skeleton>
        <div className="flex flex-1 flex-col">
          <Skeleton className="h-8 rounded-lg text-[1.4rem] font-[500]">
            Lorem ipsum dolor sit amet.
          </Skeleton>
          <div className="mt-auto flex justify-between">
            <Skeleton className="h-8">lorem</Skeleton>
            <Skeleton className="h-8 text-[1.4rem]">Lorem ipsum</Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
