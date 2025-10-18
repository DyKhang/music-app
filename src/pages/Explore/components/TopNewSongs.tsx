import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopNewSongsCarousel } from "./TopNewSongsCarousel";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TopSongsType } from "../../../api/homeApi";
import { upperCaseFirstLetter } from "../../../utils/helper";

interface Props {
  data: TopSongsType | undefined;
}

export const TopNewSongs: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className="mb-[10px] flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">
          {upperCaseFirstLetter(data?.title)}
        </h2>
        <div className="hover:text-text-item-hover text-text-secondary hidden cursor-pointer items-center gap-[6px] sm:flex">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <TopNewSongsCarousel items={data?.items} />
    </>
  );
};
