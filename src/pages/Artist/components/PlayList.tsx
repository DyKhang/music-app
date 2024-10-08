import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { upperCaseFirstLetter } from "../../../utils/helper";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Section } from "../../../api/artistApi";
import { PlayListItem } from "./PlayListItem";

interface Props {
  data: Section | undefined;
  hasLink?: boolean;
}

export const PlayList: React.FC<Props> = ({ data, hasLink }) => {
  const hasArtistName =
    data?.title === "Tuyển tập" || data?.title === "Xuất hiện trong";

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">
          {upperCaseFirstLetter(data?.title)}
        </h2>
        {hasLink && (
          <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
            <span className="text-[1.2rem]">TẤT CẢ</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
      </div>
      <div className="mt-[20px] grid grid-cols-5 gap-[28px]">
        {data?.items.map(
          (item, index) =>
            index <= 4 && (
              <PlayListItem
                hasArtistName={hasArtistName}
                item={item}
                key={item.encodeId}
              />
            ),
        )}
      </div>
    </section>
  );
};
