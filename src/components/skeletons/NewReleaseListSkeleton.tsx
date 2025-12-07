import { NewReleaseItemSkeleton } from "./NewReleaseItemSkeleton";
import { Skeleton } from "./Skeleton";

export const NewReleaseListSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-fit rounded-lg">
        Lorem ipsum dolor sit amet.
      </Skeleton>
      <div className="mt-[20px] flex gap-[8px] sm:gap-[15px]">
        {Array.from({ length: 3 }).map((_item, index) => (
          <Skeleton
            className="flex items-center justify-center rounded-full px-[24px] py-[4px] text-[1rem] uppercase sm:text-[1.2rem]"
            key={index}
          >
            placeholder
          </Skeleton>
        ))}
      </div>
      <div className="mt-[16px] grid grid-cols-1 grid-rows-4 gap-x-[28px] sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_item, index) => (
          <NewReleaseItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
