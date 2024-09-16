import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Tag = ({
  children,
  name,
}: {
  children: string;
  name: "all" | "vPop" | "others";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("new-releases")) {
      searchParams.set("new-releases", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div
      onClick={() => {
        searchParams.set("new-releases", name);
        setSearchParams(searchParams);
      }}
      className={`cursor-pointer rounded-full border-[1px] ${name === searchParams.get("new-releases") ? "border-[#644646] bg-[#644646] text-white" : "border-[rgba(0,0,0,0.1)]"} px-[24px] py-[4px] text-[1.2rem] uppercase`}
    >
      {children}
    </div>
  );
};
