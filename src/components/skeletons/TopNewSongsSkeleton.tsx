import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import { TopNewSongsItemSkeleton } from "./TopNewSongsItemSkeleton";

export const TopNewSongsSkeleton = () => {
  const [count, setCount] = useState(() => {
    if (typeof window === "undefined") {
      return 3;
    }
    return getSkeletonCount(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setCount(getSkeletonCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getSkeletonCount(width: number): number {
    if (width >= 1150) return 3;
    if (width >= 850) return 2;
    return 1;
  }
  return (
    <div>
      <div className="mb-[10px] flex items-center justify-between">
        <Skeleton className="h-8 w-fit rounded-lg">
          Lorem ipsum dolor sit amet.
        </Skeleton>
      </div>
      <div className="flex gap-[20px]">
        {Array.from({ length: count }).map((_item, index) => (
          <TopNewSongsItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
