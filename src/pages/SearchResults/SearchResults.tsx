import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../features/search/useSearch";
import { Loader } from "../../components/Loader";
import { useState } from "react";

import { AllResult } from "./components/AllResult";
import { SongResult } from "./components/SongResult";
import { PlayListResult } from "./components/PlayListResult";
import { ArtistResult } from "./components/ArtistResult";
import { MVResult } from "./components/MVResult";

type Filter = "all" | "song" | "playlist" | "artist" | "mv";

const tags: { title: string; tag: Filter }[] = [
  { title: "tất cả", tag: "all" },
  { title: "bài hát", tag: "song" },
  { title: "playlist/album", tag: "playlist" },
  { title: "nghệ sĩ/oa", tag: "artist" },
  { title: "mv", tag: "mv" },
];

export const SearchResults = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [searchParam] = useSearchParams();
  const { data, isLoading } = useSearch(searchParam.get("q")!);

  if (isLoading) return <Loader />;

  return (
    <section className="mt-[70px]">
      <div className="relative hidden items-center lg:flex">
        <h2 className="border-r border-black/5 pr-[20px] text-[2.4rem] font-[700]">
          Kết Quả Tìm Kiếm
        </h2>
        <div className="flex items-center">
          {tags.map((item) => (
            <div
              onClick={() => setFilter(item.tag)}
              className={`mx-[20px] cursor-pointer border-b-[2px] py-[15px] text-[1.4rem] font-[500] uppercase ${filter === item.tag && "border-[#844d4d] text-[#844d4d]"}`}
              key={item.tag}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 h-[1px] w-full bg-[rgba(0,0,0,0.1)]"></div>
      </div>

      {filter === "all" && <AllResult data={data} />}
      {filter === "song" && <SongResult songs={data?.data.data.songs} />}
      {filter === "playlist" && (
        <PlayListResult playlists={data?.data.data.playlists} />
      )}
      {filter === "artist" && (
        <ArtistResult artists={data?.data.data.artists} />
      )}
      {filter === "mv" && <MVResult />}
    </section>
  );
};
