import { Song } from "../../../api/playlistApi";
import { NotFound } from "../../../components/NotFound";
import { SongItem } from "../../Artist/components/SongItem";

interface Props {
  songs: Song[] | undefined;
}

export const SongResult: React.FC<Props> = ({ songs }) => {
  console.log(songs);
  if (!songs) return <NotFound title="Không có bài hát được tìm thấy" />;

  return (
    <>
      <h2 className="mb-[20px] mt-[28px] text-[2rem] font-[700]">Bài Hát</h2>
      {songs.map((item) => (
        <SongItem item={item} key={item.encodeId} />
      ))}
    </>
  );
};
