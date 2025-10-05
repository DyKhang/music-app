import { useEffect } from "react";
import { useFavoriteSongs } from "../../features/user/useFavoriteSongs";
import { useInView } from "react-intersection-observer";
import { SongItemSkeleton } from "../Album/components/SongItemSkeleton";
import { SongItem } from "../Artist/components/SongItem";

export const Favorite = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useFavoriteSongs();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="pt-[70px]">
      <div className="z-10 flex items-center border-b-[1px] border-[rgba(0,0,0,0.05)] bg-[#e5e3df] p-[10px] text-[1.2rem] font-[500] uppercase text-[#696969]">
        <div className="mr-[10px] w-1/2">
          <div className="flex items-center gap-[10px]">
            <div className="size-[16px]"></div>
            <span>bài hát</span>
          </div>
        </div>

        <span className="hidden flex-1 lg:block">album</span>

        <span className="hidden lg:block">thời gian</span>
      </div>

      {data?.pages.map((page) =>
        page.data.songs.map((song) => (
          <SongItem key={song.encodeId} item={song} />
        )),
      )}
      <div ref={ref}>{isFetchingNextPage && <SongItemSkeleton />}</div>
    </section>
  );
};
