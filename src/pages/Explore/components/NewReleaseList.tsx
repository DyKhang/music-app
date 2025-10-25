import { Tag } from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { NewReleaseItem } from "./NewReleaseItem";
import { capitalizeFirstLetter } from "../../../utils/helper";
import { useState } from "react";
import { NewReleasesType } from "../../../api/homeApi";

const tabs = [
  { label: "tất cả", status: "all" },
  { label: "việt nam", status: "vPop" },
  { label: "quốc tế", status: "others" },
];

interface Props {
  data: NewReleasesType | undefined;
}

export const NewReleaseList: React.FC<Props> = ({ data }) => {
  const [status, setStatus] = useState<"all" | "vPop" | "others">("all");

  return (
    <section>
      <h2 className="text-[2rem] font-bold">
        {capitalizeFirstLetter(data?.title)}
      </h2>

      <div className="mt-[20px] flex items-center justify-center sm:justify-between">
        <div className="grid grid-cols-3 gap-[8px] sm:gap-[15px]">
          {tabs.map((tab) => (
            <Tag
              key={tab.status}
              currentStatus={status}
              setStatus={setStatus}
              status={tab.status as "all" | "vPop" | "others"}
            >
              {tab.label}
            </Tag>
          ))}
        </div>

        <div className="hidden cursor-pointer items-center gap-[6px] text-text-secondary hover:text-text-item-hover sm:flex">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className="mt-[16px] grid grid-cols-1 grid-rows-4 gap-x-[28px] sm:grid-cols-2 lg:grid-cols-3">
        {data?.items[status!].map(
          (item, index) =>
            index <= 11 && <NewReleaseItem key={item.encodeId} data={item} />,
        )}
      </div>
    </section>
  );
};
