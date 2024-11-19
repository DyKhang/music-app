import { AxiosResponse } from "axios";
import { SearchResult } from "../../../api/searchApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Artist } from "./Artist";
import { Song } from "./Song";
import { SongItem } from "../../Artist/components/SongItem";
import { PlayListItem } from "../../../components/PlayListItem";
import { ArtistItem } from "../../../components/ArtistItem";
import { ResultNotFound } from "../../../components/ResultNotFound";

interface Props {
  data: AxiosResponse<SearchResult, unknown> | undefined;
}

export const AllResult: React.FC<Props> = ({ data }) => {
  if (
    data?.data.data.counter.song === 0 &&
    data.data.data.counter.artist === 0 &&
    data.data.data.counter.playlist === 0 &&
    data.data.data.counter.video === 0
  )
    return <ResultNotFound title="Không có kết quả được tìm thấy" />;
  return (
    <>
      {data?.data.data.counter.artist === 0 ||
      data?.data.data.counter.song === 0 ? null : (
        <>
          <h2 className="mb-[20px] mt-[28px] text-[2rem] font-[700]">
            Nổi Bật
          </h2>
          <div className="grid grid-cols-3 gap-[28px]">
            <Artist item={data?.data.data.artists[0]} />
            <Song item={data?.data.data.songs[0]} />
            <Song item={data?.data.data.songs[1]} />
          </div>
        </>
      )}
      {data?.data.data.counter.song !== 0 && (
        <>
          <div className="mt-[48px] flex justify-between">
            <h2 className="text-[2rem] font-[700]">Bài Hát</h2>
            <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
              <span className="text-[1.2rem]">TẤT CẢ</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>

          <div className="mt-[20px] grid grid-cols-2 gap-x-[28px]">
            {data?.data.data.songs.map((item) => (
              <SongItem item={item} key={item.encodeId} />
            ))}
          </div>
        </>
      )}
      {data?.data.data.counter.playlist !== 0 && (
        <>
          <div className="mt-[48px] flex justify-between">
            <h2 className="text-[2rem] font-[700]">Playlist/Album</h2>
            <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
              <span className="text-[1.2rem]">TẤT CẢ</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>

          <div className="mt-[20px] grid grid-cols-5 gap-[28px]">
            {data?.data.data.playlists.map(
              (item, index) =>
                index < 5 && (
                  <PlayListItem
                    key={item.encodeId}
                    item={{
                      ...item,
                      releaseDate: parseInt(item.releaseDate),
                    }}
                    type="artist"
                  />
                ),
            )}
          </div>
        </>
      )}
      {data?.data.data.counter.artist !== 0 && (
        <>
          <div className="mt-[48px] flex justify-between">
            <h2 className="text-[2rem] font-[700]">Nghệ sĩ/OA</h2>
            <div className="flex cursor-pointer items-center gap-[6px] text-[#696969] hover:text-[#844d4d]">
              <span className="text-[1.2rem]">TẤT CẢ</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>

          <div className="mt-[20px] grid grid-cols-5 gap-[28px]">
            {data?.data.data.artists.map(
              (item, index) =>
                index < 5 && <ArtistItem key={item.id} alias={item.alias} />,
            )}
          </div>
        </>
      )}
    </>
  );
};
