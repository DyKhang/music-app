import { AxiosResponse } from "axios";
import { SongItem } from "./SongItem";
import { ArtistApi } from "../../../api/artistApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: AxiosResponse<ArtistApi, unknown> | undefined;
}

export const HotSongs: React.FC<Props> = ({ data }) => {
  const songs = data?.data.data.sections
    .find((section) => section.sectionType === "song")
    ?.items.slice(0, 6);

  return (
    <>
      <section>
        <h2 className="mb-[20px] text-[2rem] font-[700]">Bài Hát Nổi Bật</h2>
        {songs?.map(
          (item, index) =>
            index <= 2 && <SongItem key={item.encodeId} item={item} />,
        )}
      </section>
      <section>
        <div className="mb-[20px] flex h-[30px] justify-end">
          <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
            <span className="text-[1.2rem]">TẤT CẢ</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        {songs?.map(
          (item, index) =>
            index > 2 && <SongItem key={item.encodeId} item={item} />,
        )}
      </section>
    </>
  );
};
