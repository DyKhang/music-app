import { PlayListItemSkeleton } from "./PlayListItemSkeleton";
import { Skeleton } from "./Skeleton";

export const PlayListSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-fit rounded-lg">
        Lorem ipsum dolor sit amet.
      </Skeleton>
      <div className="mt-[20px] grid grid-cols-2 gap-[20px] text-transparent md:grid-cols-4 md:gap-[28px] lg:grid-cols-5">
        {Array.from({ length: 5 }).map(
          (_item, index) => index <= 4 && <PlayListItemSkeleton key={index} />,
        )}
      </div>
    </div>
  );
};
