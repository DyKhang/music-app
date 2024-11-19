import { Tag } from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { NewReleaseItem } from "./NewReleaseItem";
import { upperCaseFirstLetter } from "../../../utils/helper";
import { useState } from "react";
import { NewReleasesType } from "../../../api/homeApi";

interface Props {
  data: NewReleasesType | undefined;
}

export const NewReleaseList: React.FC<Props> = ({ data }) => {
  const [status, setStatus] = useState<"all" | "vPop" | "others">("all");

  return (
    <section>
      <h2 className="text-[2rem] font-bold">
        {upperCaseFirstLetter(data?.title)}
      </h2>

      <div className="mt-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <Tag currentStatus={status} setStatus={setStatus} status="all">
            tất cả
          </Tag>
          <Tag currentStatus={status} setStatus={setStatus} status="vPop">
            việt nam
          </Tag>
          <Tag currentStatus={status} setStatus={setStatus} status="others">
            quốc tế
          </Tag>
        </div>

        <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className="mt-[16px] grid grid-cols-3 grid-rows-4 gap-x-[28px]">
        {data?.items[status!].map(
          (item, index) =>
            index <= 11 && <NewReleaseItem key={item.encodeId} data={item} />,
        )}
      </div>
    </section>
  );
};
