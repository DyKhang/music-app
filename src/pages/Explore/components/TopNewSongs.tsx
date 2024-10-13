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
      <div className="mb-[20px] flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">
          {upperCaseFirstLetter(data?.title)}
        </h2>
        <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
          <span className="text-[1.2rem]">TẤT CẢ</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <TopNewSongsCarousel items={data?.items} />
    </>
  );
};
