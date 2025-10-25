import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeFirstLetter } from "../../../utils/helper";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Section } from "../../../api/artistApi";
import { PlayListItem } from "../../../components/PlayListItem";

interface Props {
  data: Section | undefined;
  hasLink?: boolean;
}

export const PlayListArtist: React.FC<Props> = ({ data, hasLink }) => {
  let hasArtistName: "desc" | "date" | "artist" = "date";
  if (data?.title === "Tuyển tập" || data?.title === "Xuất hiện trong") {
    hasArtistName = "artist";
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">
          {capitalizeFirstLetter(data?.title)}
        </h2>
        {hasLink && (
          <div className="flex cursor-pointer items-center gap-[6px] text-text-secondary hover:text-text-item-hover">
            <span className="text-[1.2rem]">TẤT CẢ</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
      </div>
      <div className="mt-[20px] grid grid-cols-2 gap-[28px] md:grid-cols-4 lg:grid-cols-5">
        {data?.items.map(
          (item, index) =>
            index <= 4 && (
              <PlayListItem
                item={{
                  artistsNames: item.artistsNames,
                  encodeId: item.encodeId,
                  releaseDate: item.releaseDate,
                  thumbnailM: item.thumbnailM,
                  title: item.title,
                  sortDescription: "_",
                }}
                key={item.encodeId}
                type={hasArtistName}
              />
            ),
        )}
      </div>
    </section>
  );
};
