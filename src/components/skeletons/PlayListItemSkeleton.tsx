import { Skeleton } from "./Skeleton";

export const PlayListItemSkeleton = () => {
  return (
    <div>
      <Skeleton className="aspect-square rounded-lg"></Skeleton>
      <Skeleton className="mt-[12px] rounded-lg">placeholder</Skeleton>
    </div>
  );
};
