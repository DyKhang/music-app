import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSuggest } from "../features/search/useSuggest";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../features/search/useSearch";
import { SearchRecommendArtist } from "./SearchRecommendArtist";
import { SearchRecommendSong } from "./SearchRecommendSong";
import { SearchRecommendPlaylist } from "./SearchRecommendPlaylist";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const { data: suggest } = useSuggest();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  const debounce = useDebounce(query, 500);
  const { data, isLoading } = useSearch(debounce);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  const handleNavigate = useCallback(
    function (query: string) {
      navigate("/tim-kiem");
      searchParam.set("q", query);
      setSearchParam(searchParam);
      setIsFocus(false);
    },
    [navigate, searchParam, setSearchParam],
  );

  const handlePressEnter = useCallback(
    function (e: KeyboardEvent) {
      if (e.code === "Enter" && query.trim()) {
        handleNavigate(query.trim());
      }
    },
    [query, handleNavigate],
  );

  useEffect(() => {
    window.addEventListener("keydown", handlePressEnter);

    return () => {
      window.removeEventListener("keydown", handlePressEnter);
    };
  }, [handlePressEnter]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef && !searchRef.current?.contains(e.target as Node)) {
        setIsFocus(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFocus]);

  return (
    <div
      className={`group/search absolute rounded-[20px] ${isFocus && "shadow-lg"} left-[12%] top-[13px] w-[28%]`}
      ref={searchRef}
    >
      <div
        className={`relative flex h-[40px] items-center gap-3 rounded-[20px] bg-[rgba(0,0,0,0.05)] p-6 pr-12 ${isFocus && "rounded-b-[0px] border-b border-black/5 bg-white"}`}
        onSubmit={handleSubmit}
      >
        <MagnifyingGlassIcon
          className={`size-[24px] text-[#989796] ${isFocus && "text-[#614646]"}`}
        />
        <input
          onFocus={() => setIsFocus(true)}
          type="text"
          ref={inputRef}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          className="w-full bg-transparent text-[#282828] outline-none placeholder:text-[1.4rem] placeholder:text-[#727272]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <XMarkIcon
            className="absolute right-4 top-1/2 size-[20px] -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          />
        )}
      </div>
      {isFocus && (
        <div
          className={`rounded-b-[20px] bg-white px-[10px] py-[13px] ${isFocus && "shadow-lg"}`}
        >
          <h3 className="px-[10px] pb-[8px] text-[1.4rem] font-[700]">
            {query.trim() ? "Từ khóa liên quan" : "Đề xuất cho bạn"}
          </h3>
          {query ? (
            <>
              <p
                onMouseDown={() => handleNavigate(query.trim())}
                className="flex cursor-pointer items-center gap-[10px] overflow-x-hidden rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-black/5"
              >
                <MagnifyingGlassIcon className="size-[16px] flex-shrink-0" />
                <span className="flex items-center gap-[2px]">
                  <span className="flex-shrink-0">Tìm kiếm</span>
                  <b className="font-[700] text-[#844d4d]">"{query}"</b>
                </span>
              </p>

              {data?.data.data.counter.artist !== 0 &&
                data?.data.data.counter.playlist !== 0 &&
                data?.data.data.counter.song !== 0 &&
                data?.data.data.counter.video !== 0 &&
                !isLoading && (
                  <>
                    <div className="mt-[10px] h-[1px] bg-black/5"></div>
                    <h3 className="mt-[10px] px-[10px] pb-[8px] text-[1.4rem] font-[700]">
                      Gợi ý kết quả
                    </h3>
                  </>
                )}
              <SearchRecommendArtist
                data={data?.data.data.artists?.[0]}
                setIsFocus={setIsFocus}
              />
              <SearchRecommendArtist
                data={data?.data.data.artists?.[1]}
                setIsFocus={setIsFocus}
              />
              <SearchRecommendSong data={data?.data.data.songs?.[0]} />
              <SearchRecommendSong data={data?.data.data.songs?.[1]} />
              <SearchRecommendPlaylist
                data={data?.data.data.playlists?.[0]}
                setIsFocus={setIsFocus}
              />
              <SearchRecommendPlaylist
                data={data?.data.data.playlists?.[1]}
                setIsFocus={setIsFocus}
              />
            </>
          ) : (
            suggest?.data.data?.map((item) => (
              <p
                onClick={() => handleNavigate(item.keyword)}
                key={item.keyword}
                className="flex cursor-pointer items-center gap-[10px] rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-black/5"
              >
                <ArrowTrendingUpIcon className="size-[16px]" />
                <span>{item.keyword}</span>
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};
