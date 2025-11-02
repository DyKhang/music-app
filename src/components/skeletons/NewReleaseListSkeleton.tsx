import { NewReleaseItemSkeleton } from "./NewReleaseItemSkeleton";

export const NewReleaseListSkeleton = () => {
  return (
    <div className="mt-[16px] grid grid-cols-1 grid-rows-4 gap-x-[28px] sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((item, index) => (
        <NewReleaseItemSkeleton key={index} />
      ))}
    </div>
  );
};
