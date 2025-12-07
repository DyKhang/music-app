import { PlayListItemSkeleton } from "./PlayListItemSkeleton";

export const PlayListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-[20px] text-transparent md:grid-cols-4 md:gap-[28px] lg:grid-cols-5">
      {Array.from({ length: 5 }).map(
        (_item, index) => index <= 4 && <PlayListItemSkeleton key={index} />,
      )}
    </div>
  );
};
