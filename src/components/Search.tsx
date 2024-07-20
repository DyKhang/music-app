import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    alert(query);
  }

  return (
    <form
      className="group/search w-[440px] gap-3 flex items-center bg-[rgba(0,0,0,0.05)] h-[40px] rounded-[20px] p-6 focus-within:shadow-lg"
      onSubmit={handleSubmit}
    >
      <MagnifyingGlassIcon className="size-[24px] text-[#989796] group-focus-within/search:text-[#614646]" />
      <input
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        className="bg-transparent placeholder:text-[#727272] placeholder:text-[1.4rem] w-full text-[#282828] outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
