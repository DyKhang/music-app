import { Tag } from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { NewReleaseItem } from "./NewReleaseItem";
import { useNewRelease } from "../../../features/home/useNewReleases";
import { useSearchParams } from "react-router-dom";

export const NewReleases = () => {
  const { data } = useNewRelease();

  const [searchParams] = useSearchParams();
  const status = searchParams.get("new-releases") || "all";

  return (
    <section>
      <h2 className="text-[2rem] font-bold">Mới phát hành</h2>

      <div className="mt-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <Tag name="all">tất cả</Tag>
          <Tag name="vPop">việt nam</Tag>
          <Tag name="others">quốc tế</Tag>
        </div>

        <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className="mt-[16px] grid grid-cols-3 grid-rows-4 gap-x-[28px]">
        {data?.items[status!].map(
          (item, index) =>
            index <= 13 && (
              <NewReleaseItem
                key={item.encodeId}
                img={item.thumbnailM}
                title={item.title}
                artists={item.artists}
                releaseDate={item.releaseDate}
                encodeId={item.encodeId}
              />
            ),
        )}
      </div>
    </section>
  );
};
