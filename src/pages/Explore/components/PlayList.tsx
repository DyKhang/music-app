import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayListType } from "../../../api/homeApi";
import { upperCaseFirstLetter } from "../../../utils/helper";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { PlayListItem } from "../../../components/PlayListItem";

interface Props {
  data: PlayListType | undefined;
  hasLink?: boolean;
  type?: "desc" | "date" | "artist";
}

export const PlayList: React.FC<Props> = ({ data, hasLink, type }) => {
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
                item={{
                  artistsNames: item.artistsNames,
                  encodeId: item.encodeId,
                  sortDescription: item.sortDescription,
                  thumbnailM: item.thumbnailM,
                  title: item.title,
                  releaseDate: 0,
                }}
                key={item.encodeId}
                type={type}
              />
            ),
        )}
      </div>
    </section>
  );
};
