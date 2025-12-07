import { Skeleton } from "./Skeleton";

export const NewReleaseItemSkeleton = () => {
  return (
    <div className="flex gap-[10px] p-[10px] text-transparent">
      <Skeleton className="size-[60px] rounded">placeholder</Skeleton>
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-[14px] rounded">placeholder</Skeleton>
        <Skeleton className="h-[14px] w-fit rounded">placeholder</Skeleton>
      </div>
    </div>
  );
};
