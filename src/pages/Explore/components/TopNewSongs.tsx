import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopNewSongsCarousel } from "./TopNewSongsCarousel";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TopSongsType } from "../../../api/homeApi";
import { capitalizeFirstLetter } from "../../../utils/helper";

interface Props {
  data: TopSongsType | undefined;
}

export const TopNewSongs: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="mb-[10px] flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">
          {capitalizeFirstLetter(data?.title)}
        </h2>
        <div className="hidden cursor-pointer items-center gap-[6px] text-text-secondary hover:text-text-item-hover sm:flex">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <TopNewSongsCarousel items={data?.items} />
    </>
  );
};
